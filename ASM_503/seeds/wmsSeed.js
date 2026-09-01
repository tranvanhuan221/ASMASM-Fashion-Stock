const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const {
  Warehouse, Zone, Aisle, Shelf, Tier,
  ImportBatch, Pallet, StockItem, Product, ExportReceipt
} = require('../models');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/genz_warehouse', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected for WMS Seed');

    // Clean old WMS data
    await Warehouse.deleteMany({});
    await Zone.deleteMany({});
    await Aisle.deleteMany({});
    await Shelf.deleteMany({});
    await Tier.deleteMany({});
    await ImportBatch.deleteMany({});
    await Pallet.deleteMany({});
    try {
      await mongoose.connection.collection('stockitems').drop();
    } catch(e) {}
    try {
      await mongoose.connection.collection('exportreceipts').drop();
    } catch(e) {}
    await StockItem.deleteMany({});
    await ExportReceipt.deleteMany({});
    console.log('Cleared old WMS data');

    // Get some products
    const products = await Product.find().limit(5);
    if (products.length < 2) {
      console.log('Not enough products to seed WMS. Run product seed first.');
      process.exit(1);
    }

    // 1. Create Warehouse
    const wh = await Warehouse.create({ name: 'Kho Tổng Hồ Chí Minh', code: 'WH-HCM' });

    // 2. Create Zones (8 zones)
    const zones = await Promise.all([
      Zone.create({ warehouseId: wh._id, name: 'Khu A (Hàng Nam)', code: 'ZA' }),
      Zone.create({ warehouseId: wh._id, name: 'Khu B (Hàng Nữ)', code: 'ZB' }),
      Zone.create({ warehouseId: wh._id, name: 'Khu C (Phụ kiện)', code: 'ZC' }),
      Zone.create({ warehouseId: wh._id, name: 'Khu D (Giày dép)', code: 'ZD' }),
      Zone.create({ warehouseId: wh._id, name: 'Khu Nhập Hàng (Inbound)', code: 'Z-IN' }),
      Zone.create({ warehouseId: wh._id, name: 'Khu Xuất Hàng (Outbound)', code: 'Z-OUT' }),
      Zone.create({ warehouseId: wh._id, name: 'Khu Dự Phòng (Buffer)', code: 'Z-BUF' }),
      Zone.create({ warehouseId: wh._id, name: 'Khu Xử Lý Đổi Trả / Lỗi (QA)', code: 'Z-QA' })
    ]);

    const [zoneA, zoneB, zoneC, zoneD, zoneIn, zoneOut, zoneBuf, zoneQA] = zones;

    // Helper to create Aisle -> Shelf -> Tier
    const createSubLocations = async (zoneId, zoneCode, numAisles, shelvesPerAisle, tiersPerShelf) => {
      const tiersResult = [];
      for (let a=1; a<=numAisles; a++) {
        const aisle = await Aisle.create({ zoneId, name: `Dãy ${a}`, code: `${zoneCode}-A${a}` });
        for (let s=1; s<=shelvesPerAisle; s++) {
          const shelf = await Shelf.create({ aisleId: aisle._id, name: `Kệ ${s}`, code: `${zoneCode}-A${a}-S${s}` });
          for (let t=1; t<=tiersPerShelf; t++) {
            const tier = await Tier.create({ shelfId: shelf._id, name: `Tầng ${t}`, code: `${zoneCode}-A${a}-S${s}-T${t}`, capacity: 10 });
            tiersResult.push(tier);
          }
        }
      }
      return tiersResult;
    };

    // 3,4,5. Create Sub-locations for Zones
    // Storage Zones (A, B) have 2 aisles, 2 shelves, 3 tiers.
    const tiersA = await createSubLocations(zoneA._id, zoneA.code, 2, 2, 3);
    const tiersB = await createSubLocations(zoneB._id, zoneB.code, 2, 2, 3);
    // Storage Zones (C, D) have 1 aisle, 2 shelves, 2 tiers.
    await createSubLocations(zoneC._id, zoneC.code, 1, 2, 2);
    await createSubLocations(zoneD._id, zoneD.code, 1, 2, 2);
    
    // Functional Zones have simple staging locations (1 aisle, 1 shelf, 1 tier (floor))
    await createSubLocations(zoneIn._id, zoneIn.code, 1, 1, 1);
    await createSubLocations(zoneOut._id, zoneOut.code, 1, 1, 1);
    await createSubLocations(zoneBuf._id, zoneBuf.code, 1, 1, 1);
    await createSubLocations(zoneQA._id, zoneQA.code, 1, 1, 1);

    console.log('Created physical locations');
    
    const tierA1_1_1 = tiersA[0]; // Dãy 1, Kệ 1, Tầng 1
    const tierA1_1_2 = tiersA[1]; // Dãy 1, Kệ 1, Tầng 2
    const tierB1_1_1 = tiersB[0]; // Dãy 1, Kệ 1, Tầng 1

    const { Supplier } = require('../models');
    let supplier = await Supplier.findOne();
    if (!supplier) {
      supplier = await Supplier.create({ name: 'Xưởng May A', email: 'xuongmaya@example.com', phone: '0123456789' });
    }

    // 6. Import Batch
    const batch1 = await ImportBatch.create({
      batchCode: 'BATCH-2023-01',
      supplier: supplier._id,
      totalValue: 5000000
    });

    // Pallet 1 -> TierA1_1_1
    const p1 = await Pallet.create({
      palletCode: 'PALLET-001',
      importBatchId: batch1._id,
      tierId: tierA1_1_1._id,
      status: 'Stored'
    });
    
    // StockItem on Pallet 1
    await StockItem.create({
      palletId: p1._id,
      product: products[0]._id,
      quantity: 50,
      importPrice: 100000
    });
    await StockItem.create({
      palletId: p1._id,
      product: products[1]._id,
      quantity: 30,
      importPrice: 120000
    });

    // Pallet 2 -> TierB1_1_1
    const p2 = await Pallet.create({
      palletCode: 'PALLET-002',
      importBatchId: batch1._id,
      tierId: tierB1_1_1._id,
      status: 'Stored'
    });

    // StockItem on Pallet 2
    await StockItem.create({
      palletId: p2._id,
      product: products[2]._id,
      quantity: 100,
      importPrice: 80000
    });

    console.log('Imported Batch 1 with 2 Pallets');

    // 7. Export sample (Export 10 units of products[0])
    // Deduct from StockItem
    const si = await StockItem.findOne({ product: products[0]._id, palletId: p1._id });
    if (si) {
      si.quantity -= 10;
      await si.save();

      await ExportReceipt.create({
        receiptCode: 'XK-20230101-001',
        reason: 'Xuất bán lẻ',
        items: [{
          product: products[0]._id,
          quantity: 10,
          palletDeductions: [{
            palletId: p1._id,
            palletCode: p1.palletCode,
            quantity: 10
          }]
        }]
      });
      console.log('Created sample ExportReceipt');
    }

    console.log('WMS Seed Completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding WMS:', error);
    process.exit(1);
  }
}

seed();
