const ShopOrder = require('../models/ShopOrder');

const runAutoCancelUnpaidOrders = async () => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    // Tìm các đơn hàng chưa thanh toán (chuyển khoản), chưa hủy, và đã tạo quá 24h
    const ordersToCancel = await ShopOrder.find({
      paymentStatus: 'unpaid',
      status: { $in: ['pending', 'confirmed'] },
      createdAt: { $lte: twentyFourHoursAgo },
      paymentMethod: { $ne: 'cod' }
    });

    if (ordersToCancel.length > 0) {
      console.log(`[CRON] Phát hiện ${ordersToCancel.length} đơn hàng quá hạn thanh toán 24h. Đang hủy...`);
      for (const order of ordersToCancel) {
        order.status = 'cancelled';
        order.cancelReason = 'Hủy tự động: Quá thời hạn thanh toán 24h';
        await order.save();
      }
      console.log(`[CRON] Đã hủy tự động ${ordersToCancel.length} đơn hàng.`);
    }
  } catch (err) {
    console.error('[CRON] Lỗi khi chạy tự động hủy đơn:', err);
  }
};

const startCronJob = () => {
  console.log('[CRON] Kích hoạt tiến trình quét đơn hàng quá hạn (chạy mỗi 1 giờ)...');
  runAutoCancelUnpaidOrders(); // Chạy lần đầu ngay khi khởi động server
  setInterval(runAutoCancelUnpaidOrders, 60 * 60 * 1000); // Chạy lặp lại mỗi 1 tiếng
};

module.exports = startCronJob;
