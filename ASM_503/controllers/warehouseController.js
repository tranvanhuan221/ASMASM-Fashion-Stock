const { Zone, Lot, Shelf } = require('../models');

const warehouseController = {
  // === WEB CONTROLLERS ===
  
  // Dashboard for warehouse map
  index: async (req, res) => {
    try {
      // Get full hierarchy: Zones -> Lots -> Shelves
      const zones = await Zone.find().sort({ code: 1 }).lean();
      
      // We could use populate if we had refs both ways, but since children reference parents:
      for (let zone of zones) {
        zone.lots = await Lot.find({ zone: zone._id }).sort({ code: 1 }).lean();
        for (let lot of zone.lots) {
          lot.shelves = await Shelf.find({ lot: lot._id }).sort({ code: 1 }).lean();
        }
      }
      
      res.render('warehouse/index', { 
        title: 'Sơ đồ kho hàng',
        zones
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải sơ đồ kho');
      res.redirect('/dashboard');
    }
  },

  // === API CONTROLLERS ===
  
  // Get all zones
  getZones: async (req, res) => {
    try {
      const zones = await Zone.find().sort({ code: 1 });
      res.json({ success: true, data: zones });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  // Create zone
  createZone: async (req, res) => {
    try {
      const zone = new Zone(req.body);
      await zone.save();
      res.status(201).json({ success: true, data: zone, message: 'Thêm khu vực thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  
  // Get lots by zone
  getLots: async (req, res) => {
    try {
      const { zoneId } = req.query;
      const query = zoneId ? { zone: zoneId } : {};
      const lots = await Lot.find(query).populate('zone', 'code name').sort({ code: 1 });
      res.json({ success: true, data: lots });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  // Create lot
  createLot: async (req, res) => {
    try {
      const lot = new Lot(req.body);
      await lot.save();
      await lot.populate('zone', 'code name');
      res.status(201).json({ success: true, data: lot, message: 'Thêm lô thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  
  // Get shelves by lot
  getShelves: async (req, res) => {
    try {
      const { lotId } = req.query;
      const query = lotId ? { lot: lotId } : {};
      const shelves = await Shelf.find(query)
        .populate({
          path: 'lot',
          select: 'code name',
          populate: { path: 'zone', select: 'code' }
        })
        .sort({ code: 1 });
      res.json({ success: true, data: shelves });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  // Create shelf
  createShelf: async (req, res) => {
    try {
      const shelf = new Shelf(req.body);
      await shelf.save();
      await shelf.populate({
        path: 'lot',
        select: 'code name',
        populate: { path: 'zone', select: 'code' }
      });
      res.status(201).json({ success: true, data: shelf, message: 'Thêm kệ hàng thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

module.exports = warehouseController;
