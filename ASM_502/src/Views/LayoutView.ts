import { CartService } from '../Services/CartService.js';
import { AuthService } from '../Services/AuthService.js';

export class LayoutView {
  static render(content: string, isAdmin: boolean = false, hideNewsletter: boolean = false): string {
    if (isAdmin) {
      return this.renderAdminLayout(content);
    }
    return this.renderUserLayout(content, hideNewsletter);
  }

  private static renderUserLayout(content: string, hideNewsletter: boolean): string {
    const user = AuthService.getCurrentUser();
    const cartCount = CartService.getItemCount();

    // Build nav from window.__categories if available
    const categories: any[] = (window as any).__categories || [];
    const parentCategories = categories.filter(c => !c.parentId);

    return `
      <!-- ====== TOP ANNOUNCEMENT BAR ====== -->
      <div class="announcement-bar" style="
        background: linear-gradient(135deg, #1a1a2e 0%, #2d3748 100%);
        color: #fff;
        font-size: 11px;
        padding: 6px 0;
        letter-spacing: 0.3px;
      ">
        <div class="container" style="display:flex; align-items:center; justify-content:center; gap:32px; flex-wrap:wrap;">
          <a href="tel:19006360000" style="color:#fff; text-decoration:none; display:flex; align-items:center; gap:5px; opacity:0.92; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.92'">
            📞 Hotline: <strong style="font-weight:600;">1900.636.000</strong>
          </a>
          <span style="width:1px; height:12px; background:rgba(255,255,255,0.25);"></span>
          <a href="mailto:hello@genz-fashion.vn" style="color:#fff; text-decoration:none; display:flex; align-items:center; gap:5px; opacity:0.92; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.92'">
            ✉ hello@genz-fashion.vn
          </a>
          <span style="width:1px; height:12px; background:rgba(255,255,255,0.25);"></span>
          <a href="tel:0987654321" style="color:#fff; text-decoration:none; display:flex; align-items:center; gap:5px; opacity:0.92; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.92'">
            🏢 Đặt hàng sỉ: <strong style="font-weight:600;">0987.654.321</strong>
          </a>
        </div>
      </div>

      <!-- ====== HEADER ====== -->
      <header class="site-header">

        <!-- Top bar: Logo + Search + Actions -->
        <div class="header-top-bar">
          <div class="container" style="display:flex; align-items:center; height:72px; gap:24px;">

            <!-- Logo -->
            <a href="#/" class="site-logo">
              <span class="logo-text">GENZ</span>
              <span class="logo-sub">FASHION</span>
            </a>

            <!-- Search Bar -->
            <div class="header-search">
              <div class="header-search-inner" id="search-wrapper">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2.5" style="flex-shrink:0;">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" id="search-input" placeholder="Tìm kiếm sản phẩm...">
                <button id="search-btn">TÌM</button>
              </div>
            </div>

            <!-- Header Actions -->
            <div class="header-actions">
              ${user ? `
                <div class="user-menu-trigger" id="user-menu-btn">
                  <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                    <div class="user-avatar">
                      ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <span style="font-size:11px; color:#555;">${user.name.split(' ').pop()}</span>
                  </div>
                  <div class="user-dropdown" id="user-dropdown">
                    <a href="#/my-orders">📦 Đơn hàng của tôi</a>
                    <div style="border-top:1px solid #f0f0f0;"></div>
                    ${(user.role === 'admin' || user.role === 'staff') ? `<a href="#/admin" style="font-weight:600;">⚙️ Quản trị</a><div style="border-top:1px solid #f0f0f0;"></div>` : ''}
                    <button id="logout-btn" class="logout-btn">🚪 Đăng xuất</button>
                  </div>
                </div>
              ` : `
                <a href="#/login" class="header-action-link">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Tài khoản</span>
                </a>
              `}

              <!-- Cart Button -->
              <button class="cart-icon-btn" id="cart-icon-btn">
                <div style="position:relative;">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  <span class="cart-badge-count" id="cart-badge" style="display:${cartCount > 0 ? 'flex' : 'none'}">${cartCount}</span>
                </div>
                <span class="label">Giỏ hàng</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Bar -->
        <nav class="main-nav">
          <div class="container">
            <ul class="nav-list">
              <li><a href="#/" class="nav-link-item" data-route="/">Trang Chủ</a></li>
              ${parentCategories.map((c: any) => `
                <li><a href="#/products?categoryId=${c.id}" class="nav-link-item" data-route="/products?categoryId=${c.id}">${c.name}</a></li>
              `).join('')}
              <li><a href="#/products" class="nav-link-item" data-route="/products">Sản Phẩm Mới</a></li>
              <li><a href="#/products?sale=true" class="nav-link-item nav-sale" data-route="/products?sale=true">🔥 Khuyến Mãi</a></li>
              <li><a href="#/about" class="nav-link-item" data-route="/about">Giới Thiệu</a></li>
              <li><a href="#/contact" class="nav-link-item" data-route="/contact">Liên Hệ</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <!-- ====== MAIN ====== -->
      <main style="min-height: calc(100vh - 400px);">${content}</main>

      <!-- ====== FOOTER ====== -->
      <footer class="site-footer">

        ${!hideNewsletter ? `
        <!-- Footer Newsletter Section -->
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 48px 0;
          text-align: center;
        ">
          <div class="container" style="max-width:600px;">
            <h3 style="color:#fff; font-size:22px; font-weight:700; margin:0 0 8px 0; letter-spacing:1px; text-transform:uppercase;">
              ĐĂNG KÝ NHẬN BẢN TIN
            </h3>
            <p style="color:rgba(255,255,255,0.85); font-size:14px; margin:0 0 24px 0; line-height:1.6;">
              Cập nhật ưu đãi độc quyền & xu hướng thời trang mới nhất từ GENZ
            </p>
            <div style="display:flex; gap:0; max-width:480px; margin:0 auto; border-radius:8px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.15);">
              <input type="email" placeholder="Nhập email của bạn..." style="
                flex:1;
                padding:14px 20px;
                border:none;
                outline:none;
                font-size:14px;
                color:#333;
                background:#fff;
                min-width:0;
              ">
              <button style="
                padding:14px 28px;
                background:#1a1a2e;
                color:#fff;
                border:none;
                font-size:13px;
                font-weight:700;
                letter-spacing:1px;
                cursor:pointer;
                white-space:nowrap;
                transition:background 0.2s;
              " onmouseover="this.style.background='#2d3748'" onmouseout="this.style.background='#1a1a2e'">
                ĐĂNG KÝ
              </button>
            </div>
          </div>
        </div>
        ` : ''}

        <!-- Main Footer -->
        <div style="background:#1a1a2e; padding:56px 0 40px 0; color:rgba(255,255,255,0.8);">
          <div class="container">
            <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:36px;">

              <!-- Col 1: Logo & Info -->
              <div>
                <div style="margin-bottom:20px;">
                  <span style="font-weight:900; font-size:24px; color:#fff; letter-spacing:3px;">GENZ</span>
                  <span style="font-size:10px; color:rgba(255,255,255,0.5); letter-spacing:3px; text-transform:uppercase; display:block; margin-top:2px;">FASHION</span>
                </div>
                <p style="font-size:13px; line-height:1.7; margin:0 0 16px 0; color:rgba(255,255,255,0.65);">
                  Thương hiệu thời trang trẻ trung, năng động dành cho thế hệ Gen Z Việt Nam.
                </p>
                <div style="font-size:12px; line-height:2; color:rgba(255,255,255,0.55);">
                  <div style="display:flex; align-items:flex-start; gap:8px;">
                    <span>📍</span>
                    <span>Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>📞</span>
                    <a href="tel:02473030222" style="color:rgba(255,255,255,0.55); text-decoration:none;">024 - 7303.0222</a>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>✉️</span>
                    <a href="mailto:hello@genz-fashion.vn" style="color:rgba(255,255,255,0.55); text-decoration:none;">hello@genz-fashion.vn</a>
                  </div>
                </div>
              </div>

              <!-- Col 2: Về GENZ -->
              <div>
                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 20px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Về GENZ
                </h3>
                <ul style="list-style:none; padding:0; margin:0;">
                  <li style="margin-bottom:10px;"><a href="#/about" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Giới thiệu</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Hệ thống cửa hàng</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Tin tức</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Tuyển dụng</a></li>
                </ul>
              </div>

              <!-- Col 3: Hỗ trợ khách hàng -->
              <div>
                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 20px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Hỗ trợ khách hàng
                </h3>
                <ul style="list-style:none; padding:0; margin:0;">
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Hỏi đáp</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Chính sách vận chuyển</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Chính sách đổi trả</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Chính sách bảo mật</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Bảng kích cỡ</a></li>
                  <li style="margin-bottom:10px;"><a href="#/my-orders" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Tra cứu đơn hàng</a></li>
                </ul>
              </div>

              <!-- Col 4: Đặt hàng sỉ & Liên hệ -->
              <div>
                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 20px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Đặt hàng sỉ & Liên hệ
                </h3>
                <div style="font-size:13px; line-height:2.2; color:rgba(255,255,255,0.6);">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>📞</span>
                    <span>Hotline sỉ: <a href="tel:0987654321" style="color:#fbbf24; text-decoration:none; font-weight:600;">0987.654.321</a></span>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>💬</span>
                    <span>Zalo OA: <strong style="color:rgba(255,255,255,0.85); font-weight:600;">GENZ Fashion</strong></span>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>✉️</span>
                    <a href="mailto:wholesale@genz-fashion.vn" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:12px;">wholesale@genz-fashion.vn</a>
                  </div>
                </div>
                <a href="#/contact" style="
                  display:inline-block;
                  margin-top:16px;
                  padding:10px 24px;
                  background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color:#fff;
                  text-decoration:none;
                  font-size:12px;
                  font-weight:700;
                  letter-spacing:0.5px;
                  border-radius:6px;
                  transition:opacity 0.2s;
                  text-transform:uppercase;
                " onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
                  Liên hệ tư vấn
                </a>
              </div>

              <!-- Col 5: Social & Payments -->
              <div>
                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 20px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Kết nối với chúng tôi
                </h3>
                <div style="display:flex; gap:10px; margin-bottom:24px;">
                  <a href="#" title="Facebook" style="
                    width:36px; height:36px; border-radius:50%;
                    background:rgba(255,255,255,0.08); display:flex;
                    align-items:center; justify-content:center;
                    color:rgba(255,255,255,0.7); text-decoration:none;
                    transition:all 0.2s;
                  " onmouseover="this.style.background='#1877f2'; this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='rgba(255,255,255,0.7)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" title="Instagram" style="
                    width:36px; height:36px; border-radius:50%;
                    background:rgba(255,255,255,0.08); display:flex;
                    align-items:center; justify-content:center;
                    color:rgba(255,255,255,0.7); text-decoration:none;
                    transition:all 0.2s;
                  " onmouseover="this.style.background='#e4405f'; this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='rgba(255,255,255,0.7)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" title="YouTube" style="
                    width:36px; height:36px; border-radius:50%;
                    background:rgba(255,255,255,0.08); display:flex;
                    align-items:center; justify-content:center;
                    color:rgba(255,255,255,0.7); text-decoration:none;
                    transition:all 0.2s;
                  " onmouseover="this.style.background='#ff0000'; this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='rgba(255,255,255,0.7)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.96 3.27-5.96 3.27z"></path></svg>
                  </a>
                  <a href="#" title="TikTok" style="
                    width:36px; height:36px; border-radius:50%;
                    background:rgba(255,255,255,0.08); display:flex;
                    align-items:center; justify-content:center;
                    color:rgba(255,255,255,0.7); text-decoration:none;
                    transition:all 0.2s;
                  " onmouseover="this.style.background='#010101'; this.style.color='#69c9d0'" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='rgba(255,255,255,0.7)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.88a8.28 8.28 0 0 0 4.76 1.5V6.93a4.84 4.84 0 0 1-1-.24z"/></svg>
                  </a>
                </div>

                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 14px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Thanh toán
                </h3>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">VNPAY</span>
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">VISA</span>
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">JCB</span>
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">MoMo</span>
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">COD</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div style="background:#12121f; padding:16px 0; text-align:center; font-size:12px; color:rgba(255,255,255,0.4); border-top:1px solid rgba(255,255,255,0.05);">
          <div class="container" style="display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap;">
            <span>© 2026 GENZ Fashion. All rights reserved.</span>
            <span style="width:1px; height:10px; background:rgba(255,255,255,0.15);"></span>
            <a href="#" style="color:rgba(255,255,255,0.4); text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='rgba(255,255,255,0.7)'" onmouseout="this.style.color='rgba(255,255,255,0.4)'">Chính sách bảo mật</a>
          </div>
        </div>
      </footer>

      <!-- ====== CART DRAWER ====== -->
      <div class="cart-overlay" id="cart-overlay"></div>
      <div class="cart-drawer" id="cart-drawer">
        <div class="cart-header">
          <h3 id="cart-drawer-title">Giỏ hàng (${cartCount})</h3>
          <span class="close-cart" id="close-cart">✕</span>
        </div>
        <div class="free-ship-banner">
          <span style="color:#10b981; font-size:16px;">✓</span>
          Bạn đã được miễn phí vận chuyển
        </div>
        <div style="padding:10px 20px; border-bottom:1px solid var(--border); font-size:13px; display:flex; justify-content:space-between; align-items:center;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:500;">
            <input type="checkbox" id="cart-select-all" checked style="width:15px;height:15px;accent-color:var(--primary);">
            Chọn tất cả
          </label>
          <span style="color:var(--text-secondary);">Đã chọn <strong id="cart-selected-count">${cartCount}</strong> sản phẩm</span>
        </div>
        <div class="cart-items-container" id="cart-drawer-items"></div>
        <div class="cart-footer">
          <div class="promo-code-btn" style="cursor:pointer;">
            <span>🎟 Mã ưu đãi</span>
            <span style="color:var(--text-secondary); font-weight:400;">Chọn hoặc nhập mã &rsaquo;</span>
          </div>
          <div class="cart-subtotal">
            <span>Tạm tính</span>
            <span id="cart-drawer-total" style="color:var(--primary);">0 đ</span>
          </div>
          <button class="btn-checkout" id="btn-open-checkout-modal">THANH TOÁN</button>
        </div>
      </div>
    `;
  }

  private static renderAdminLayout(content: string): string {
    const currentHash = window.location.hash.split('?')[0];
    const links = [
      { href: '#/admin', label: '📊 Dashboard', hash: '#/admin' },
      { href: '#/admin/products', label: '📦 Sản phẩm', hash: '#/admin/products' },
      { href: '#/admin/categories', label: '📂 Danh mục', hash: '#/admin/categories' },
      { href: '#/admin/wms-locations', label: '🏭 Vị trí Kho', hash: '#/admin/wms-locations' },
      { href: '#/admin/wms-inventory', label: '📊 Tồn Kho', hash: '#/admin/wms-inventory' },
      { href: '#/admin/wms-import', label: '📥 Nhập Hàng', hash: '#/admin/wms-import' },
      { href: '#/admin/wms-export', label: '📤 Xuất Kho', hash: '#/admin/wms-export' },
      { href: '#/admin/orders', label: '🛒 Đơn hàng', hash: '#/admin/orders' },
      { href: '#/admin/users', label: '👥 Users', hash: '#/admin/users' },
    ];

    return `
      <div style="display:grid; grid-template-columns:240px 1fr; min-height:100vh;">
        <aside style="background:#1a1a2e; color:white; position:sticky; top:0; height:100vh; overflow-y:auto;">
          <div style="padding:24px 20px; border-bottom:1px solid rgba(255,255,255,0.1);">
            <a href="#/" style="font-weight:900; font-size:20px; color:white; text-decoration:none; letter-spacing:3px;">GENZ</a>
            <div style="font-size:11px; color:rgba(255,255,255,0.5); letter-spacing:2px; text-transform:uppercase; margin-top:2px;">Admin Panel</div>
          </div>
          <nav style="padding:16px 0;">
            ${links.map(l => `
              <a href="${l.href}" style="display:flex; align-items:center; gap:10px; padding:13px 20px; color:${currentHash === l.hash ? 'white' : 'rgba(255,255,255,0.7)'}; background:${currentHash === l.hash ? 'rgba(255,255,255,0.12)' : 'none'}; border-left:3px solid ${currentHash === l.hash ? 'white' : 'transparent'}; text-decoration:none; font-size:14px; transition:all 0.2s;">
                ${l.label}
              </a>
            `).join('')}
            <div style="border-top:1px solid rgba(255,255,255,0.1); margin:16px 0;"></div>
            <a href="#/" style="display:flex; align-items:center; gap:10px; padding:13px 20px; color:rgba(255,255,255,0.6); text-decoration:none; font-size:14px;">
              🏠 Về trang chủ
            </a>
          </nav>
        </aside>
        <div style="background:#f5f5f7; padding:32px; overflow-y:auto;">
          ${content}
        </div>
      </div>
    `;
  }

  static bindEvents(): void {
    // Highlight active nav
    const currentHash = window.location.hash || '#/';
    document.querySelectorAll('.nav-link-item').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      if (href === currentHash || (currentHash === '#/' && href === '#/')) {
        link.classList.add('active');
      }
    });

    // User dropdown
    const menuBtn = document.getElementById('user-menu-btn');
    const dropdown = document.getElementById('user-dropdown');
    if (menuBtn && dropdown) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      });
      document.addEventListener('click', () => {
        if (dropdown) dropdown.style.display = 'none';
      }, { once: true });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        AuthService.logout();
        window.location.href = '#/';
        window.location.reload();
      });
    }

    // Search
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const doSearch = () => {
      const q = searchInput?.value.trim();
      if (q) window.location.hash = `#/products?search=${encodeURIComponent(q)}`;
    };
    if (searchBtn) searchBtn.addEventListener('click', doSearch);
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doSearch();
      });
    }

    // Cart Drawer
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');

    const openDrawer = (e?: Event) => {
      e?.preventDefault();
      cartOverlay?.classList.add('show');
      cartDrawer?.classList.add('open');
      window.dispatchEvent(new CustomEvent('cart-open'));
    };
    const closeDrawer = () => {
      cartOverlay?.classList.remove('show');
      cartDrawer?.classList.remove('open');
    };

    if (cartIconBtn) cartIconBtn.addEventListener('click', openDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeDrawer);
    if (closeCart) closeCart.addEventListener('click', closeDrawer);
    (window as any).openCartDrawer = openDrawer;
  }
}
