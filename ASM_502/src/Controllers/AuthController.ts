/**
 * AuthController.ts - ĐIỀU KHIỂN ĐĂNG NHẬP / ĐĂNG KÝ
 * 
 * Nhiệm vụ: Xử lý các thao tác liên quan đến tài khoản người dùng.
 * 1. Nhận thông tin người dùng nhập vào (Email, Mật khẩu, Tên).
 * 2. Kiểm tra tính hợp lệ (Validate) như: Không để trống, đúng định dạng Email, mật khẩu phải từ 6 ký tự.
 * 3. Gửi thông tin sang `AuthService` để gọi API Backend.
 * 4. Xử lý kết quả:
 *    - Thành công: Hiện thông báo, chuyển hướng về Trang chủ (nếu là user) hoặc Trang Admin (nếu là admin/staff).
 *    - Thất bại: Hiện lỗi màu đỏ ngay dưới form.
 */
import { AuthView } from '../Views/AuthView.js';
import { LayoutView } from '../Views/LayoutView.js';
import { AuthService } from '../Services/AuthService.js';
import { showToast } from '../Utils/helpers.js';

export class AuthController {
  
  // Hàm hiển thị trang Đăng Nhập
  static renderLogin(appElement: HTMLElement): void {
    // Nếu kiểm tra thấy người dùng ĐÃ đăng nhập rồi thì đá họ về Trang chủ, không cho xem form đăng nhập nữa
    if (AuthService.isLoggedIn()) {
      window.location.hash = '#/';
      return;
    }
    // Gắn mã HTML của giao diện Login vào màn hình
    appElement.innerHTML = AuthView.renderLogin();
    // Gắn sự kiện (lắng nghe nút Bấm Đăng Nhập)
    this.bindLoginEvents();
  }

  // Hàm hiển thị trang Đăng Ký
  static renderRegister(appElement: HTMLElement): void {
    // Nếu đã đăng nhập thì đá về Trang chủ
    if (AuthService.isLoggedIn()) {
      window.location.hash = '#/';
      return;
    }
    // Gắn mã HTML của giao diện Register vào màn hình
    appElement.innerHTML = AuthView.renderRegister();
    // Gắn sự kiện (lắng nghe nút Bấm Đăng Ký)
    this.bindRegisterEvents();
  }

  // Hàm xử lý logic khi bấm nút Đăng Nhập
  private static bindLoginEvents(): void {
    // Lấy ra cái Form đăng nhập và thẻ Div dùng để hiển thị lỗi
    const form = document.getElementById('login-form') as HTMLFormElement;
    const errorDiv = document.getElementById('auth-error');

    if (form) {
      // Lắng nghe sự kiện 'submit' (Khi người dùng bấm nút Submit hoặc ấn Enter)
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định là tải lại (F5) trang của trình duyệt
        
        // Lấy giá trị trong ô input email và password, dùng trim() để xóa dấu cách thừa ở 2 đầu
        const email = (document.getElementById('email') as HTMLInputElement).value.trim();
        const password = (document.getElementById('password') as HTMLInputElement).value.trim();
        
        // Ẩn thông báo lỗi cũ (nếu có)
        if (errorDiv) errorDiv.style.display = 'none';

        // BƯỚC 1: KIỂM TRA DỮ LIỆU ĐẦU VÀO (VALIDATION)
        
        // Nếu bỏ trống email hoặc mật khẩu
        if (!email || !password) {
          if (errorDiv) {
            errorDiv.textContent = 'Vui lòng nhập email và mật khẩu'; // Ghi chữ lỗi
            errorDiv.style.display = 'block'; // Hiển thị khung lỗi lên
          }
          return; // Dừng chạy tiếp
        }

        // Kiểm tra xem email có đúng định dạng không (VD: phải có chữ @ và dấu chấm) bằng Biểu thức chính quy (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          if (errorDiv) {
            errorDiv.textContent = 'Email không hợp lệ';
            errorDiv.style.display = 'block';
          }
          return; // Dừng
        }

        // BƯỚC 2: GỌI API ĐĂNG NHẬP
        try {
          // Gọi hàm login của AuthService. Lệnh 'await' bắt chương trình chờ Backend trả lời xong mới chạy tiếp.
          await AuthService.login(email, password);
          
          // NẾU THÀNH CÔNG: Hiển thị thanh thông báo xanh lá (Toast)
          showToast('Đăng nhập thành công!', 'success');
          
          // Kiểm tra xem đây là Khách thường hay là Admin. 
          // Nếu là Admin thì chuyển hướng (đổi URL) sang trang Dashboard, khách thì về trang chủ.
          window.location.hash = AuthService.isAdmin() ? '#/admin' : '#/';
        } catch (error: any) {
          // NẾU THẤT BẠI: (Sai mật khẩu, không tồn tại email...)
          if (errorDiv) {
            // Hiển thị nội dung lỗi mà Backend gửi về
            errorDiv.textContent = error.message || 'Đăng nhập thất bại';
            errorDiv.style.display = 'block';
          }
        }
      });
    }
  }

  // Hàm xử lý logic khi bấm nút Đăng Ký
  private static bindRegisterEvents(): void {
    const form = document.getElementById('register-form') as HTMLFormElement;
    const errorDiv = document.getElementById('auth-error');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Ngăn F5 trang
        
        // Lấy toàn bộ dữ liệu người dùng nhập
        const name = (document.getElementById('name') as HTMLInputElement).value.trim();
        const email = (document.getElementById('email') as HTMLInputElement).value.trim();
        const password = (document.getElementById('password') as HTMLInputElement).value.trim();
        const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value.trim();
        
        if (errorDiv) errorDiv.style.display = 'none';

        // KIỂM TRA LỖI NHẬP LIỆU:
        
        // Lỗi 1: Để trống
        if (!name || !email || !password || !confirmPassword) {
          if (errorDiv) {
            errorDiv.textContent = 'Vui lòng nhập đầy đủ thông tin';
            errorDiv.style.display = 'block';
          }
          return;
        }

        // Lỗi 2: Sai định dạng Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          if (errorDiv) {
            errorDiv.textContent = 'Email không hợp lệ';
            errorDiv.style.display = 'block';
          }
          return;
        }

        // Lỗi 3: Mật khẩu quá ngắn (Yêu cầu bảo mật cơ bản)
        if (password.length < 6) {
          if (errorDiv) {
            errorDiv.textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
            errorDiv.style.display = 'block';
          }
          return;
        }

        // Lỗi 4: Mật khẩu xác nhận không giống với mật khẩu gốc
        if (password !== confirmPassword) {
          if (errorDiv) {
            errorDiv.textContent = 'Mật khẩu xác nhận không khớp';
            errorDiv.style.display = 'block';
          }
          return;
        }

        // TIẾN HÀNH ĐĂNG KÝ
        try {
          // Gửi dữ liệu đăng ký sang Backend
          await AuthService.register(name, email, password);
          
          showToast('Đăng ký thành công!', 'success');
          // Đăng ký xong thì chuyển hướng họ về trang Đăng Nhập để đăng nhập
          window.location.hash = '#/login';
        } catch (error: any) {
          if (errorDiv) {
            // Hiện lỗi nếu trùng email (Backend báo lỗi)
            errorDiv.textContent = error.message || 'Đăng ký thất bại';
            errorDiv.style.display = 'block';
          }
        }
      });
    }
  }
}
