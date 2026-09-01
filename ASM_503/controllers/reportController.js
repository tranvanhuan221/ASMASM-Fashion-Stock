const { ImportReceipt, ExportReceipt, StockItem } = require('../models');

const reportController = {
  // === WEB CONTROLLERS ===
  
  index: async (req, res) => {
    try {
      res.render('reports/index', { 
        title: 'Báo cáo thống kê'
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải trang báo cáo');
      res.redirect('/dashboard');
    }
  },

  // === API CONTROLLERS ===
  
  // Get revenue and profit summary
  getRevenueProfit: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      let matchQuery = { status: 'completed' };
      if (startDate && endDate) {
        matchQuery.exportDate = {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setHours(23, 59, 59))
        };
      }
      
      const summary = await ExportReceipt.aggregate([
        { $match: matchQuery },
        { 
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalAmount' },
            totalProfit: { $sum: '$totalProfit' },
            count: { $sum: 1 }
          }
        }
      ]);
      
      const data = summary.length > 0 ? summary[0] : { totalRevenue: 0, totalProfit: 0, count: 0 };
      
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  // Get revenue and profit chart data (grouped by date)
  getChartData: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      // Default to last 30 days if no date provided
      const start = startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
      const end = endDate ? new Date(new Date(endDate).setHours(23, 59, 59)) : new Date();
      
      const chartData = await ExportReceipt.aggregate([
        { 
          $match: { 
            status: 'completed',
            exportDate: { $gte: start, $lte: end }
          } 
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$exportDate" } },
            revenue: { $sum: '$totalAmount' },
            profit: { $sum: '$totalProfit' }
          }
        },
        { $sort: { _id: 1 } }
      ]);
      
      res.json({ success: true, data: chartData });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  // Get stock value report
  getStockValue: async (req, res) => {
    try {
      const stockValue = await StockItem.aggregate([
        { $match: { totalQuantity: { $gt: 0 } } },
        // Unwind batch entries to calculate exact current value based on remaining items in each batch
        { $unwind: "$batchEntries" },
        { $match: { "batchEntries.remainingQuantity": { $gt: 0 } } },
        {
          $group: {
            _id: null,
            totalItems: { $sum: "$batchEntries.remainingQuantity" },
            totalValue: { 
              $sum: { $multiply: ["$batchEntries.remainingQuantity", "$batchEntries.importPrice"] } 
            }
          }
        }
      ]);
      
      const data = stockValue.length > 0 ? stockValue[0] : { totalItems: 0, totalValue: 0 };
      
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  // Get top selling products
  getTopProducts: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      
      const topProducts = await ExportReceipt.aggregate([
        { $match: { status: 'completed' } },
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.product",
            totalQuantity: { $sum: "$items.quantity" },
            totalRevenue: { $sum: "$items.subTotal" },
            totalProfit: { $sum: "$items.profit" }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product"
          }
        },
        { $unwind: "$product" },
        {
          $project: {
            name: "$product.name",
            sku: "$product.sku",
            totalQuantity: 1,
            totalRevenue: 1,
            totalProfit: 1
          }
        }
      ]);
      
      res.json({ success: true, data: topProducts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = reportController;
