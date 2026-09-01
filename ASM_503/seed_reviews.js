const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1/genz_warehouse';

const orderSchema = new mongoose.Schema({
  userId: String,
  status: String,
  paymentStatus: String,
}, { strict: false });

const Order = mongoose.model('ShopOrder', orderSchema);

const reviewSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  productId: mongoose.Schema.Types.ObjectId,
  orderId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { strict: false });

const Review = mongoose.model('ShopReview', reviewSchema);

const productSchema = new mongoose.Schema({
  name: String
}, { strict: false });

const Product = mongoose.model('Product', productSchema);

const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Chuyển tất cả đơn hàng "Đã hoàn trả" thành "Hoàn thành" để user có thể đánh giá
    const updateResult = await Order.updateMany(
      { status: 'returned' },
      { $set: { status: 'completed', paymentStatus: 'paid' } }
    );
    console.log(`Đã chuyển ${updateResult.modifiedCount} đơn hàng Đã hoàn trả thành Hoàn thành.`);

    // 2. Tạo một số dữ liệu Đánh giá mẫu cho Sản phẩm đầu tiên
    const firstProduct = await Product.findOne({});
    if (firstProduct) {
      const existingReviews = await Review.countDocuments({ productId: firstProduct._id });
      if (existingReviews === 0) {
        // Tìm 1 user
        const user = await User.findOne({});
        const order = await Order.findOne({ status: 'completed' });
        
        if (user && order) {
          const mockReviews = [
            {
              userId: user._id,
              userName: user.name || 'Nguyễn Văn A',
              productId: firstProduct._id,
              orderId: order._id,
              rating: 5,
              comment: 'Sản phẩm quá tuyệt vời, chất vải mát, mặc rất thoải mái. Giao hàng nhanh!',
              createdAt: new Date(Date.now() - 86400000 * 2) // 2 ngày trước
            },
            {
              userId: user._id,
              userName: 'Trần Thị B',
              productId: firstProduct._id,
              orderId: order._id, // Dùng tạm
              rating: 4,
              comment: 'Form dáng đẹp nhưng màu nhạt hơn so với trong hình một chút. Nhìn chung là đáng tiền.',
              createdAt: new Date(Date.now() - 86400000 * 5) // 5 ngày trước
            }
          ];

          await Review.insertMany(mockReviews);
          console.log(`Đã tạo 2 đánh giá mẫu cho sản phẩm: ${firstProduct.name}`);
        } else {
          console.log('Không tìm thấy user hoặc order để tạo review mẫu.');
        }
      } else {
        console.log('Đã có dữ liệu đánh giá rồi, không cần tạo thêm.');
      }
    }

  } catch (error) {
    console.error('Lỗi seed data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedData();
