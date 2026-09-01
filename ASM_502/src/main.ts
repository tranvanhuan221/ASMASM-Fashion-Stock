/**
 * main.ts - ĐIỂM VÀO (ENTRY POINT) CỦA TOÀN BỘ ỨNG DỤNG FRONTEND
 * 
 * Đây là file đầu tiên được chạy khi bạn mở trang web. Nhiệm vụ của nó:
 * 1. Lấy phần tử HTML gốc (thẻ div có id="app") để chuẩn bị "vẽ" giao diện lên đó.
 * 2. Khởi tạo giỏ hàng (CartController.init()) để luôn lắng nghe sự thay đổi giỏ hàng.
 * 3. Khởi tạo Router (bộ định tuyến): Khai báo các đường dẫn (ví dụ: #/login, #/products).
 *    Khi người dùng gõ hoặc bấm vào một đường dẫn, Router sẽ gọi Controller tương ứng để xử lý.
 * 4. Lắng nghe các sự kiện chung (như đăng nhập thành công thì load lại trang, hoặc cập nhật số lượng giỏ hàng trên Header).
 */
import { Router } from './Utils/Router.js';
import { HomeController } from './Controllers/HomeController.js';
import { ProductController } from './Controllers/ProductController.js';
import { CartController } from './Controllers/CartController.js';
import { AuthController } from './Controllers/AuthController.js';
import { AdminController } from './Controllers/AdminController.js';
import { AdminWmsController } from './Controllers/AdminWmsController.js';
import { AboutController } from './Controllers/AboutController.js';
import { MyOrdersController } from './Controllers/MyOrdersController.js';
import { ReviewProductController } from './Controllers/ReviewProductController.js';
import { ContactController } from './Controllers/ContactController.js';
import { LayoutView } from './Views/LayoutView.js';

const app = document.getElementById('app');

if (app) {
  // Initialize Cart logic (listens to events globally)
  CartController.init();

  const router = new Router();

  // ĐỊNH TUYẾN URL -> GỌI CONTROLLER TƯƠNG ỨNG
  // Cách hoạt động: Nếu URL khớp với chuỗi trong ngoặc, nó sẽ gọi logic bên cạnh
  router
    .addRoute('/', (params) => {
      HomeController.render(app, params); // Trang chủ
    })
    .addRoute('/products', (params) => {
      ProductController.renderList(app, params); // Trang danh sách sản phẩm
    })
    .addRoute('/product/:id', (params) => {
      ProductController.renderDetail(app, params); // Trang chi tiết sản phẩm cụ thể
    })
    .addRoute('/login', () => {
      AuthController.renderLogin(app); // Đăng nhập
    })
    .addRoute('/register', () => {
      AuthController.renderRegister(app); // Đăng ký
    })
    
    // --- KHU VỰC DÀNH CHO ADMIN ---
    .addRoute('/admin', () => {
      AdminController.renderDashboard(app); // Thống kê admin
    })
    .addRoute('/admin/products', () => {
      AdminController.renderProducts(app); // Quản lý SP
    })
    .addRoute('/admin/categories', () => {
      AdminController.renderCategories(app); // Quản lý DM
    })
    .addRoute('/admin/orders', () => {
      AdminController.renderOrders(app); // Quản lý Đơn hàng (Duyệt hủy đơn)
    })
    .addRoute('/admin/users', () => {
      AdminController.renderUsers(app); // Quản lý Người dùng
    })
    
    // --- KHU VỰC QUẢN LÝ KHO HÀNG (WMS) ---
    .addRoute('/admin/wms-locations', () => {
      AdminWmsController.renderLocations(app);
    })
    .addRoute('/admin/wms-import', () => {
      AdminWmsController.renderImportBatches(app);
    })
    .addRoute('/admin/wms-inventory', () => {
      AdminWmsController.renderInventory(app);
    })
    .addRoute('/admin/wms-export', () => {
      AdminWmsController.renderExports(app);
    })
    
    // --- KHU VỰC CÁ NHÂN KHÁCH HÀNG ---
    .addRoute('/my-orders', () => {
      MyOrdersController.render(app); // Lịch sử đơn mua của tôi
    })
    .addRoute('/review/:orderId/:productId', (params) => {
      ReviewProductController.render(app, params); // Trang đánh giá sản phẩm
    })
    .addRoute('/about', () => {
      AboutController.render(app); // Trang giới thiệu
    })
    .addRoute('/contact', () => {
      ContactController.render(app); // Trang liên hệ / báo giá sỉ
    })
    
    // NẾU NGƯỜI DÙNG GÕ BẬY (Ví dụ: #/xyz) -> Đưa vào trang 404 Không tìm thấy
    .setNotFound(() => {
      app.innerHTML = LayoutView.render(`
        <div class="container" style="padding: 100px 0; text-align: center;">
          <h1 style="font-size: 64px; color: var(--primary);">404</h1>
          <h2 style="margin-bottom: 24px;">Không tìm thấy trang</h2>
          <a href="#/" class="btn btn-primary">Về Trang Chủ</a>
        </div>
      `);
      LayoutView.bindEvents(); // Dù lỗi 404 thì vẫn phải gắn sự kiện click cho cái Menu và Footer
    });

// KIỂM TRA SỰ KIỆN: Khi người dùng đổi trạng thái (vd từ Khách thành Đăng xuất)
  // Tính năng này tự động kích nếu khách đăng xuất, sẽ đá họ khỏi trang bảo mật
  window.addEventListener('auth-changed', () => {
    const currentHash = window.location.hash || '#/';
    if (currentHash !== '#/login' && currentHash !== '#/register') {
      router.navigate(currentHash); // Cập nhật lại UI dựa trên quyền mới
    }
  });

  // KIỂM TRA GIỎ HÀNG: Khi ai đó gọi hàm cập nhật giỏ hàng, sẽ bắn tín hiệu này
  // main.ts đón tín hiệu để thay đổi con số đỏ trên icon góc phải màn hình
  window.addEventListener('cart-updated', (e: any) => {
    const badge = document.getElementById('cart-badge'); // Tìm nút đỏ số lượng
    if (badge) {
      const count = e.detail.count;
      badge.textContent = count.toString(); // Chèn số lượng vào
      badge.style.display = count > 0 ? 'flex' : 'none'; // Số = 0 thì ẩn đi
    }
  });

  // Bấm nút khởi động cỗ máy định tuyến (Router bắt đầu đọc thanh địa chỉ)
  router.start();
}
