const express = require('express');
const router = express.Router();
const { User, Category, Supplier, Customer, Zone, Lot, Shelf, Product, StockItem, ImportReceipt, ExportReceipt } = require('../models');

// Seeder logic
const seedDatabase = async () => {
  try {
    console.log('Clearing old data...');
    // Clear all collections
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Supplier.deleteMany({}),
      Customer.deleteMany({}),
      Zone.deleteMany({}),
      Lot.deleteMany({}),
      Shelf.deleteMany({}),
      Product.deleteMany({}),
      StockItem.deleteMany({}),
      ImportReceipt.deleteMany({}),
      ExportReceipt.deleteMany({})
    ]);

    console.log('Creating Admin User...');
    const admin = new User({
      username: 'admin',
      password: 'password123',
      fullName: 'Quản Trị Viên',
      email: 'admin@genz.com',
      role: 'admin'
    });
    await admin.save();

    console.log('Creating Categories...');
    const catAo = await Category.create({ name: 'Áo Thun', description: 'Các loại áo thun tay ngắn, tay dài' });
    const catQuan = await Category.create({ name: 'Quần Jean', description: 'Các loại quần jean nam nữ' });

    console.log('Creating Suppliers & Customers...');
    const supplier = await Supplier.create({ name: 'Xưởng May A', phone: '0901234567', email: 'xuonga@gmail.com' });
    const customer = await Customer.create({ name: 'Khách Lẻ 1', phone: '0987654321', type: 'retail' });

    console.log('Creating Warehouse Structure (Zone -> Lot -> Shelf)...');
    const zoneA = await Zone.create({ code: 'A', name: 'Khu A', description: 'Khu vực lưu trữ Áo' });
    
    const lotA01 = await Lot.create({ code: '01', name: 'Lô Áo Thun Nam', zone: zoneA._id });
    
    const shelfK1 = await Shelf.create({ code: 'K1', name: 'Kệ Tầng 1', lot: lotA01._id });
    const shelfK2 = await Shelf.create({ code: 'K2', name: 'Kệ Tầng 2', lot: lotA01._id });

    console.log('Creating Products...');
    const product1 = await Product.create({
      sku: 'AT-001',
      name: 'Áo Thun Basic Đen',
      category: catAo._id,
      price: 150000,
      description: 'Áo thun cotton 100%'
    });

    console.log('Creating Initial Stock (Import)...');
    // Import 1: 100 items @ 80k
    const import1 = await ImportReceipt.create({
      receiptCode: 'IMP001',
      supplier: supplier._id,
      user: admin._id,
      type: 'batch',
      items: [{
        product: product1._id,
        shelf: shelfK1._id,
        quantity: 100,
        importPrice: 80000,
        subTotal: 8000000
      }],
      totalAmount: 8000000
    });

    const stockItem1 = await StockItem.create({
      product: product1._id,
      shelf: shelfK1._id,
      totalQuantity: 100,
      batchEntries: [{
        batchCode: 'BATCH-001',
        importReceiptId: import1._id,
        supplier: supplier._id,
        originalQuantity: 100,
        remainingQuantity: 100,
        importPrice: 80000
      }]
    });

    // Import 2 (Later): 50 items @ 90k (Price increased)
    const import2 = await ImportReceipt.create({
      receiptCode: 'IMP002',
      supplier: supplier._id,
      user: admin._id,
      type: 'batch',
      items: [{
        product: product1._id,
        shelf: shelfK1._id, // Same shelf
        quantity: 50,
        importPrice: 90000,
        subTotal: 4500000
      }],
      totalAmount: 4500000
    });

    stockItem1.totalQuantity += 50;
    stockItem1.batchEntries.push({
      batchCode: 'BATCH-002',
      importReceiptId: import2._id,
      supplier: supplier._id,
      originalQuantity: 50,
      remainingQuantity: 50,
      importPrice: 90000
    });
    await stockItem1.save();

    console.log('Creating Export (FIFO Deduction)...');
    // Export 110 items. FIFO should take 100 from import1 (@80k) and 10 from import2 (@90k)
    // Cost = (100 * 80k) + (10 * 90k) = 8,000,000 + 900,000 = 8,900,000
    // Revenue = 110 * 150k = 16,500,000
    // Profit = 16,500,000 - 8,900,000 = 7,600,000
    
    const qtyToExport = 110;
    const exportPrice = 150000;
    const batchDeductions = stockItem1.deductFIFO(qtyToExport);
    await stockItem1.save();

    const subTotal = qtyToExport * exportPrice;
    const itemCost = batchDeductions.reduce((sum, d) => sum + (d.quantity * d.importPrice), 0);
    const profit = subTotal - itemCost;

    await ExportReceipt.create({
      receiptCode: 'EXP001',
      customer: customer._id,
      user: admin._id,
      items: [{
        product: product1._id,
        shelf: shelfK1._id,
        quantity: qtyToExport,
        exportPrice: exportPrice,
        subTotal: subTotal,
        profit: profit,
        batchDeductions: batchDeductions
      }],
      totalAmount: subTotal,
      totalProfit: profit
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

// Connect to DB and run seeder
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected for Seeding');
    seedDatabase();
  })
  .catch(err => console.log(err));
