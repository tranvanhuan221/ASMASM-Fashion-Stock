const { Product, StockItem, ImportReceipt, ExportReceipt, Customer } = require('../models');

const dashboardController = {
  index: async (req, res) => {
    try {
      // 1. Get total products
      const totalProducts = await Product.countDocuments();
      
      // 2. Get total stock items and value
      const stockAgg = await StockItem.aggregate([
        { $match: { totalQuantity: { $gt: 0 } } },
        { $unwind: "$batchEntries" },
        { $match: { "batchEntries.remainingQuantity": { $gt: 0 } } },
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: "$batchEntries.remainingQuantity" },
            totalValue: { 
              $sum: { $multiply: ["$batchEntries.remainingQuantity", "$batchEntries.importPrice"] } 
            }
          }
        }
      ]);
      const totalStock = stockAgg.length > 0 ? stockAgg[0].totalQuantity : 0;
      const totalStockValue = stockAgg.length > 0 ? stockAgg[0].totalValue : 0;
      
      // 3. Get this month's revenue and profit
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      const salesAgg = await ExportReceipt.aggregate([
        { 
          $match: { 
            status: 'completed',
            exportDate: { $gte: startOfMonth }
          } 
        },
        {
          $group: {
            _id: null,
            revenue: { $sum: '$totalAmount' },
            profit: { $sum: '$totalProfit' }
          }
        }
      ]);
      const currentMonthRevenue = salesAgg.length > 0 ? salesAgg[0].revenue : 0;
      const currentMonthProfit = salesAgg.length > 0 ? salesAgg[0].profit : 0;
      
      // 4. Get recent activities (last 5 imports and 5 exports)
      const recentImports = await ImportReceipt.find()
        .populate('supplier', 'name')
        .sort({ importDate: -1 })
        .limit(5)
        .lean();
        
      const recentExports = await ExportReceipt.find()
        .populate('customer', 'name')
        .sort({ exportDate: -1 })
        .limit(5)
        .lean();
        
      // Combine and sort activities
      const activities = [
        ...recentImports.map(i => ({ ...i, type: 'import', date: i.importDate })),
        ...recentExports.map(e => ({ ...e, type: 'export', date: e.exportDate }))
      ].sort((a, b) => b.date - a.date).slice(0, 8);
      
      res.render('dashboard/index', { 
        title: 'Bảng điều khiển',
        stats: {
          totalProducts,
          totalStock,
          totalStockValue,
          currentMonthRevenue,
          currentMonthProfit
        },
        activities
      });
    } catch (error) {
      console.error('Dashboard Error:', error);
      req.flash('error_msg', 'Lỗi tải dữ liệu bảng điều khiển');
      res.redirect('/login'); // If dashboard fails, something is very wrong
    }
  }
};

module.exports = dashboardController;
