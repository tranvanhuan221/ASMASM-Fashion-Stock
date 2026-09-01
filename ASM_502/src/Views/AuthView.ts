export class AuthView {
  static renderLogin(): string {
    return `
      <div style="min-height:100vh; display:flex; background:white;">
        <!-- Left Banner -->
        <div style="flex:1; background:url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop') center/cover; position:relative; display:none; @media(min-width:768px){display:block;}">
          <div style="position:absolute; inset:0; background:linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1));"></div>
          <div style="position:absolute; bottom:40px; left:40px; color:white; max-width:400px;">
            <h2 style="font-size:32px; font-weight:800; margin-bottom:12px; letter-spacing:1px; text-transform:uppercase;">Bộ Sưu Tập Mới</h2>
            <p style="font-size:16px; opacity:0.9; line-height:1.6;">Khám phá những xu hướng thời trang hàng đầu dành cho bạn. Đăng nhập để nhận ngay ưu đãi độc quyền.</p>
          </div>
        </div>
        
        <!-- Right Form -->
        <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:40px 24px; background:#f9f9f9;">
          <div style="width:100%; max-width:400px; background:white; padding:48px 40px; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.05);">
            <div style="text-align:center; margin-bottom:32px;">
              <a href="#/" style="display:inline-block; font-size:28px; font-weight:900; letter-spacing:4px; color:#111; text-decoration:none; margin-bottom:8px;">GENZ</a>
              <h1 style="font-size:22px; font-weight:700; margin-bottom:8px; color:#333;">Đăng nhập tài khoản</h1>
              <p style="color:var(--text-secondary); font-size:14px;">Chào mừng bạn trở lại!</p>
            </div>
            
            <form id="login-form">
              <div id="auth-error" style="display:none; background:#fee2e2; color:#b91c1c; padding:12px 16px; border-radius:4px; font-size:14px; margin-bottom:16px;"></div>
              
              <div style="margin-bottom:20px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Email</label>
                <input type="email" id="email" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập email của bạn" required onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <div style="margin-bottom:24px;">
                <label style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">
                  Mật khẩu
                  <a href="#" style="color:var(--primary); text-decoration:none; font-weight:500;">Quên mật khẩu?</a>
                </label>
                <input type="password" id="password" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập mật khẩu" required onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <button type="submit" style="width:100%; padding:16px; background:#111; color:white; border:none; border-radius:6px; font-size:15px; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:1px; transition:background 0.2s;" onmouseover="this.style.background='var(--primary)'" onmouseout="this.style.background='#111'">ĐĂNG NHẬP</button>
            </form>
            
            <div style="text-align:center; margin-top:24px; font-size:14px; color:var(--text-secondary);">
              Chưa có tài khoản? <a href="#/register" style="color:var(--primary); font-weight:700; text-decoration:none;">Đăng ký ngay</a>
            </div>
            
          </div>
        </div>
      </div>
    `;
  }

  static renderRegister(): string {
    return `
      <div style="min-height:100vh; display:flex; background:white;">
        <!-- Left Banner -->
        <div style="flex:1; background:url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop') center/cover; position:relative; display:none; @media(min-width:768px){display:block;}">
          <div style="position:absolute; inset:0; background:linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1));"></div>
          <div style="position:absolute; bottom:40px; left:40px; color:white; max-width:400px;">
            <h2 style="font-size:32px; font-weight:800; margin-bottom:12px; letter-spacing:1px; text-transform:uppercase;">Thành Viên Mới</h2>
            <p style="font-size:16px; opacity:0.9; line-height:1.6;">Đăng ký tài khoản ngay hôm nay để trở thành một phần của cộng đồng GenZ và nhận nhiều ưu đãi hấp dẫn.</p>
          </div>
        </div>
        
        <!-- Right Form -->
        <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:40px 24px; background:#f9f9f9;">
          <div style="width:100%; max-width:400px; background:white; padding:48px 40px; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.05);">
            <div style="text-align:center; margin-bottom:32px;">
              <a href="#/" style="display:inline-block; font-size:28px; font-weight:900; letter-spacing:4px; color:#111; text-decoration:none; margin-bottom:8px;">GENZ</a>
              <h1 style="font-size:22px; font-weight:700; margin-bottom:8px; color:#333;">Tạo tài khoản mới</h1>
              <p style="color:var(--text-secondary); font-size:14px;">Tham gia để mua sắm tiện lợi hơn</p>
            </div>
            
            <form id="register-form">
              <div id="auth-error" style="display:none; background:#fee2e2; color:#b91c1c; padding:12px 16px; border-radius:4px; font-size:14px; margin-bottom:16px;"></div>
              
              <div style="margin-bottom:16px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Họ và tên</label>
                <input type="text" id="name" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập họ và tên" required onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <div style="margin-bottom:16px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Email</label>
                <input type="email" id="email" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập email" required onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <div style="margin-bottom:16px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Mật khẩu</label>
                <input type="password" id="password" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Tối thiểu 6 ký tự" required minlength="6" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <div style="margin-bottom:24px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Xác nhận mật khẩu</label>
                <input type="password" id="confirm-password" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập lại mật khẩu" required minlength="6" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <button type="submit" style="width:100%; padding:16px; background:#111; color:white; border:none; border-radius:6px; font-size:15px; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:1px; transition:background 0.2s;" onmouseover="this.style.background='var(--primary)'" onmouseout="this.style.background='#111'">ĐĂNG KÝ</button>
            </form>
            
            <div style="text-align:center; margin-top:24px; font-size:14px; color:var(--text-secondary);">
              Đã có tài khoản? <a href="#/login" style="color:var(--primary); font-weight:700; text-decoration:none;">Đăng nhập</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
