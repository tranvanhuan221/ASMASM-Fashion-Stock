const { Warehouse, Zone, Aisle, Shelf, Tier, ImportBatch, Pallet, StockItem } = require('../models');

exports.getWarehouses = async (req, res) => {
  try {
    const data = await Warehouse.find().populate({
      path: 'zones',
      populate: {
        path: 'aisles',
        populate: {
          path: 'shelves',
          populate: { path: 'tiers' }
        }
      }
    });
    res.json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json(warehouse);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getZones = async (req, res) => {
  try {
    const zones = await Zone.find({ warehouseId: req.params.warehouseId });
    res.json(zones);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createZone = async (req, res) => {
  try {
    const zone = await Zone.create(req.body);
    res.status(201).json(zone);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getAisles = async (req, res) => {
  try {
    const aisles = await Aisle.find({ zoneId: req.params.zoneId });
    res.json(aisles);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createAisle = async (req, res) => {
  try {
    const aisle = await Aisle.create(req.body);
    res.status(201).json(aisle);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getShelves = async (req, res) => {
  try {
    const shelves = await Shelf.find({ aisleId: req.params.aisleId });
    res.json(shelves);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createShelf = async (req, res) => {
  try {
    const shelf = await Shelf.create(req.body);
    res.status(201).json(shelf);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getTiers = async (req, res) => {
  try {
    const tiers = await Tier.find({ shelfId: req.params.shelfId });
    res.json(tiers);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createTier = async (req, res) => {
  try {
    const tier = await Tier.create(req.body);
    res.status(201).json(tier);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

// ... Delete endpoints
exports.deleteLocation = async (req, res) => {
  const { type, id } = req.params;
  try {
    let Model;
    if (type === 'warehouse') Model = Warehouse;
    else if (type === 'zone') Model = Zone;
    else if (type === 'aisle') Model = Aisle;
    else if (type === 'shelf') Model = Shelf;
    else if (type === 'tier') Model = Tier;
    else return res.status(400).json({ error: 'Invalid location type' });
    
    await Model.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// --- IMPORT PROCESS ---
exports.createImportBatch = async (req, res) => {
  try {
    const { batchCode, supplier, totalValue, pallets } = req.body;
    // Create ImportBatch
    const batch = await ImportBatch.create({ batchCode, supplier, totalValue });

    const createdPallets = [];
    const createdStockItems = [];

    // Create Pallets and StockItems
    for (const p of pallets) {
      const pallet = await Pallet.create({
        palletCode: p.palletCode,
        importBatchId: batch._id,
        tierId: p.tierId, // location
        status: 'Stored'
      });
      createdPallets.push(pallet);

      for (const item of p.items) {
        const stockItem = await StockItem.create({
          palletId: pallet._id,
          product: item.productId,
          quantity: item.quantity,
          importPrice: item.importPrice
        });
        createdStockItems.push(stockItem);
      }
    }

    res.status(201).json({ batch, pallets: createdPallets, items: createdStockItems });
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getBatches = async (req, res) => {
  try {
    const data = await ImportBatch.find().populate({
      path: 'pallets',
      populate: [
        { path: 'stockItems', populate: 'product' },
        { path: 'tierId' }
      ]
    });
    res.json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// --- PRODUCT LOCATIONS ---
exports.getProductLocations = async (req, res) => {
  try {
    const { productId } = req.params;
    const stockItems = await StockItem.find({ product: productId, quantity: { $gt: 0 } })
      .populate({
        path: 'palletId',
        populate: {
          path: 'tierId',
          populate: {
            path: 'shelfId',
            populate: {
              path: 'aisleId',
              populate: {
                path: 'zoneId',
                populate: 'warehouseId'
              }
            }
          }
        }
      });
    
    // Map to a cleaner response
    const locations = stockItems.map(si => {
      const pallet = si.palletId;
      const tier = pallet ? pallet.tierId : null;
      const shelf = tier ? tier.shelfId : null;
      const aisle = shelf ? shelf.aisleId : null;
      const zone = aisle ? aisle.zoneId : null;
      const warehouse = zone ? zone.warehouseId : null;
      
      let pathStr = 'N/A';
      if (warehouse && zone && aisle && shelf && tier && pallet) {
         pathStr = `${warehouse.name} > ${zone.name} > ${aisle.name} > ${shelf.name} > ${tier.name} > ${pallet.palletCode}`;
      }

      return {
        stockItemId: si._id,
        quantity: si.quantity,
        importPrice: si.importPrice,
        palletCode: pallet ? pallet.palletCode : 'N/A',
        tierName: tier ? tier.name : 'N/A',
        shelfName: shelf ? shelf.name : 'N/A',
        aisleName: aisle ? aisle.name : 'N/A',
        zoneName: zone ? zone.name : 'N/A',
        warehouseName: warehouse ? warehouse.name : 'N/A',
        pathStr
      };
    });

    res.json(locations);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// --- INVENTORY ---
exports.getInventory = async (req, res) => {
  try {
    const stockItems = await StockItem.find({ quantity: { $gt: 0 } })
      .populate('product')
      .populate({
        path: 'palletId',
        populate: {
          path: 'tierId',
          populate: {
            path: 'shelfId',
            populate: {
              path: 'aisleId',
              populate: { path: 'zoneId', populate: 'warehouseId' }
            }
          }
        }
      });
    
    // Group by product
    const inventory = {};
    stockItems.forEach(si => {
      if (!si.product) return;
      const pid = si.product._id.toString();
      if (!inventory[pid]) {
        inventory[pid] = {
          product: si.product,
          totalQuantity: 0,
          locations: []
        };
      }
      inventory[pid].totalQuantity += si.quantity;
      
      const pallet = si.palletId;
      const tier = pallet ? pallet.tierId : null;
      const shelf = tier ? tier.shelfId : null;
      const aisle = shelf ? shelf.aisleId : null;
      const zone = aisle ? aisle.zoneId : null;
      const warehouse = zone ? zone.warehouseId : null;

      let pathStr = 'N/A';
      if (warehouse && zone && aisle && shelf && tier && pallet) {
         pathStr = `${warehouse.name} > ${zone.name} > ${aisle.name} > ${shelf.name} > ${tier.name} > ${pallet.palletCode}`;
      }

      inventory[pid].locations.push({
        stockItemId: si._id,
        palletCode: pallet ? pallet.palletCode : 'N/A',
        quantity: si.quantity,
        pathStr
      });
    });

    res.json(Object.values(inventory));
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// --- EXPORT ---
const ExportReceipt = require('../models/ExportReceipt');

exports.getExports = async (req, res) => {
  try {
    const exports = await ExportReceipt.find().populate('items.product').sort({ exportDate: -1 });
    res.json(exports);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createExport = async (req, res) => {
  try {
    const { reason, items } = req.body;
    // items: [{ productId, quantity }]
    
    const exportItems = [];

    for (const item of items) {
      let remainingToExport = Number(item.quantity);
      if (remainingToExport <= 0) continue;

      // Find stock items for this product, ordered by creation date (FIFO)
      const stockItems = await StockItem.find({ product: item.productId, quantity: { $gt: 0 } })
        .populate('palletId')
        .sort({ createdAt: 1 });

      const palletDeductions = [];

      for (const si of stockItems) {
        if (remainingToExport <= 0) break;

        const deductQty = Math.min(si.quantity, remainingToExport);
        si.quantity -= deductQty;
        await si.save();
        remainingToExport -= deductQty;

        palletDeductions.push({
          palletId: si.palletId ? si.palletId._id : null,
          palletCode: si.palletId ? si.palletId.palletCode : 'N/A',
          quantity: deductQty
        });
      }

      if (remainingToExport > 0) {
        return res.status(400).json({ error: `Không đủ tồn kho cho sản phẩm ${item.productId}` });
      }

      exportItems.push({
        product: item.productId,
        quantity: item.quantity,
        palletDeductions
      });
    }

    const receipt = await ExportReceipt.create({ reason, items: exportItems });
    res.status(201).json(receipt);
  } catch (error) { res.status(400).json({ error: error.message }); }
};
