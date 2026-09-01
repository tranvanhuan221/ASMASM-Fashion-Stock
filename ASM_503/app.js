/**
 * app.js - TRÁI TIM CỦA BACKEND SERVER
 * 
 * Đây là file gốc khởi chạy toàn bộ máy chủ Node.js/Express.js của dự án.
 * Nhiệm vụ chính:
 * 1. Khởi tạo server Express.
 * 2. Kết nối tới cơ sở dữ liệu MongoDB.
 * 3. Thiết lập bảo mật (CORS) cho phép Frontend truy cập.
 * 4. Khai báo tất cả các "đường dẫn API" (Routes) để Frontend gọi tới.
 */

// Import các thư viện đọc biến môi trường (như tài khoản DB, secret key) trong file .env
require('dotenv').config();

// Khởi tạo ứng dụng Express (framework làm web server phổ biến nhất của Node.js)
var express = require('express');
var app = express();

// Các công cụ hỗ trợ
var createError = require('http-errors'); // Dùng để văng lỗi 404
var path = require('path');               // Dùng để xử lý đường dẫn thư mục
var cookieParser = require('cookie-parser');
var logger = require('morgan');           // Dùng để in log (Ghi lại lịch sử người dùng gọi API)
var session = require('express-session'); // Lưu phiên đăng nhập
var flash = require('connect-flash');     // Lưu thông báo tạm thời
var { engine } = require('express-handlebars'); // Thư viện làm giao diện phụ cho web cũ (không dùng cho SPA)

// Kết nối cơ sở dữ liệu (Import từ thư mục config)
var connectDB = require('./config/database');

// Import các hàm hỗ trợ (helpers) cho giao diện
const hbsHelpers = require('./helpers/hbs-helpers');

// BẬT TÍNH NĂNG CORS (Cực kỳ quan trọng)
// Nhờ có CORS, Frontend (chạy ở cổng 5173) mới có quyền gọi dữ liệu từ Backend (chạy ở cổng 3005) mà không bị trình duyệt chặn
const cors = require('cors');
app.use(cors());

// Kết nối với MongoDB
connectDB();

// View engine setup
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: hbsHelpers
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Dùng middleware để cấu hình server:

// Ghi log mọi request gửi đến
app.use(logger('dev'));

// Cực kỳ quan trọng: Cho phép server đọc hiểu định dạng JSON mà Frontend gửi lên
app.use(express.json());
// Cho phép server đọc hiểu định dạng Form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Mở cửa thư mục public, để FE có thể lấy ảnh từ http://localhost:3005/images/...
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình Session (phiên làm việc)
app.use(session({
  secret: process.env.SESSION_SECRET || 'genz_warehouse_secret', // Chìa khóa mã hóa session
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // Hạn sử dụng: 7 ngày
  }
}));

app.use(flash());

// Tạo biến toàn cục dùng cho các file giao diện HBS (Không liên quan đến API của FE)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')[0];
  res.locals.error_msg = req.flash('error_msg')[0];
  next();
});

// ==================== KHAI BÁO CÁC ĐƯỜNG DẪN API DÀNH CHO FRONTEND ====================
// Mỗi file Route sẽ đảm nhận một mảng riêng biệt
const authApiRoutes = require('./routes/api/authRoutes');
const categoryApiRoutes = require('./routes/api/categoryRoutes');
const productApiRoutes = require('./routes/api/productRoutes');
const supplierApiRoutes = require('./routes/api/supplierRoutes');
const customerApiRoutes = require('./routes/api/customerRoutes');
const warehouseApiRoutes = require('./routes/api/warehouseRoutes');
const inventoryApiRoutes = require('./routes/api/inventoryRoutes');
const exportApiRoutes = require('./routes/api/exportRoutes');
const reportApiRoutes = require('./routes/api/reportRoutes');
// ĐÂY LÀ FILE ĐƯỢC FRONTEND ASM_502 DÙNG NHIỀU NHẤT
const shopApiRoutes = require('./routes/api/shopRoutes'); 

// Gắn tiền tố "/api/v1/..." vào trước tất cả các đường dẫn trong file route
app.use('/api/v1/auth', authApiRoutes);
app.use('/api/v1/categories', categoryApiRoutes);
app.use('/api/v1/products', productApiRoutes);
app.use('/api/v1/suppliers', supplierApiRoutes);
app.use('/api/v1/customers', customerApiRoutes);
app.use('/api/v1/warehouse', warehouseApiRoutes);
app.use('/api/v1/inventory', inventoryApiRoutes);
app.use('/api/v1/export', exportApiRoutes);
app.use('/api/v1/reports', reportApiRoutes);
// Tất cả các request bắt đầu bằng /api/v1/shop sẽ được chuyển qua file shopRoutes.js để xử lý
app.use('/api/v1/shop', shopApiRoutes);

// ==================== WEB ROUTES ====================
const webIndexRoutes = require('./routes/web/index');
const webAuthRoutes = require('./routes/web/auth');
const webDashboardRoutes = require('./routes/web/dashboard');
const webProductRoutes = require('./routes/web/products');
const webCategoryRoutes = require('./routes/web/categories');
const webSupplierRoutes = require('./routes/web/suppliers');
const webCustomerRoutes = require('./routes/web/customers');
const webWarehouseRoutes = require('./routes/web/warehouse');
const webInventoryRoutes = require('./routes/web/inventory');
const webExportRoutes = require('./routes/web/export');
const webReportRoutes = require('./routes/web/reports');

app.use('/', webIndexRoutes);
app.use('/', webAuthRoutes);
app.use('/', webDashboardRoutes);
app.use('/', webProductRoutes);
app.use('/', webCategoryRoutes);
app.use('/', webSupplierRoutes);
app.use('/', webCustomerRoutes);
app.use('/', webWarehouseRoutes);
app.use('/', webInventoryRoutes);
app.use('/', webExportRoutes);
app.use('/', webReportRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // API error response
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }

  res.status(err.status || 500);
  res.render('error', { title: 'Lỗi', status: err.status || 500 });
});

// Khởi chạy các tiến trình chạy ngầm (Cron Jobs)
const startOrderTimeoutCron = require('./cron/orderTimeout');
startOrderTimeoutCron();

module.exports = app;
