/**
 * CartController.ts - ĐIỀU KHIỂN GIỎ HÀNG VÀ THANH TOÁN (CHECKOUT)
 * 
 * File này quản lý toàn bộ logic liên quan đến Giỏ hàng (dạng Sidebar trượt ra từ bên phải) và quá trình đặt hàng.
 * Các chức năng chính:
 * 1. Khởi tạo (init): Lắng nghe các sự kiện toàn cục như "Mở giỏ hàng", "Đăng nhập/Đăng xuất" để tự động cập nhật giỏ hàng từ LocalStorage (nếu là khách) hoặc từ DB (nếu đã đăng nhập).
 * 2. Giao diện Giỏ hàng (renderDrawer): Vẽ ra danh sách sản phẩm đang có, cho phép tăng/giảm số lượng (+/-) hoặc xóa sản phẩm.
 * 3. Form Đặt hàng (openCheckoutModal): Hiển thị form nhập thông tin giao hàng (Tên, SĐT, Địa chỉ, Cách thanh toán). Tính toán phí ship (Miễn phí nếu > 500k).
 * 4. Xác nhận mua (handleCheckout): Gom dữ liệu giỏ hàng và thông tin khách hàng -> Gửi xuống Backend tạo đơn hàng -> Xóa trống giỏ hàng -> Chuyển đến trang "Đơn hàng của tôi".
 */
import { CartService } from '../Services/CartService.js';
import { AuthService } from '../Services/AuthService.js';
import { orderService } from '../Services/OrderService.js';
import { formatPrice, showToast } from '../Utils/helpers.js';

export class CartController {
  // Hàm khởi tạo (Chạy 1 lần duy nhất khi web vừa load)
  static init(): void {
    // Khi người dùng bấm vào icon giỏ hàng -> Gọi hàm renderDrawer để mở Sidebar giỏ hàng
    window.addEventListener('cart-open', () => this.renderDrawer());

    // Khi giỏ hàng thay đổi số lượng (do thêm, bớt) -> Nếu giỏ hàng đang mở thì vẽ lại (re-render) để nó nhảy số ngay lập tức
    window.addEventListener('cart-updated', () => {
      if (document.getElementById('cart-drawer')?.classList.contains('open')) {
        this.renderDrawer();
      }
    });

    // Khi đăng nhập hoặc đăng xuất thành công -> Phải load lại giỏ hàng từ cơ sở dữ liệu trên Server
    window.addEventListener('auth-changed', async () => {
      if (AuthService.isLoggedIn()) {
        await CartService.loadFromServer();
      }
      this.renderDrawer();
    });

    // QUẢN LÝ SỰ KIỆN CLICK TOÀN CỤC (Event Delegation) cho các nút thanh toán
    document.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;

      // Click vào nút "Thanh toán" màu đỏ ở giỏ hàng -> Mở hộp thoại Đặt hàng (Modal)
      if (target.id === 'btn-open-checkout-modal' || target.closest('#btn-open-checkout-modal')) {
        this.openCheckoutModal();
        return;
      }

      // Click vào nút "Xác Nhận Đặt Hàng" trong form -> Bắt đầu quá trình thanh toán thực sự
      if (target.id === 'btn-confirm-order' || target.closest('#btn-confirm-order')) {
        await this.handleCheckout();
        return;
      }

      // Nút [X] đóng hộp thoại đặt hàng
      if (target.id === 'btn-cancel-checkout' || target.closest('#btn-cancel-checkout')) {
        document.getElementById('checkout-modal')?.remove();
        return;
      }
    });

    // Tự động kéo dữ liệu giỏ hàng cũ từ Server về ngay khi người dùng vừa vào web (Nếu họ đã lưu đăng nhập từ trước)
    if (AuthService.isLoggedIn()) {
      CartService.loadFromServer().catch(() => {});
    }
  }

  // Bật cửa sổ Popup điền thông tin đặt hàng (Checkout Modal)
  private static openCheckoutModal(): void {
    // BẮT BUỘC ĐĂNG NHẬP: Đây là chức năng chống khách vãng lai đặt hàng ảo
    if (!AuthService.isLoggedIn()) {
      showToast('Vui lòng đăng nhập để đặt hàng', 'warning');
      document.getElementById('close-cart')?.click(); // Đóng giỏ hàng
      window.location.hash = '#/login'; // Ép chuyển sang trang đăng nhập
      return;
    }

    const user = AuthService.getCurrentUser();
    const cart = CartService.getCart();
    
    // Nếu rỗng thì nghỉ
    if (cart.length === 0) { showToast('Giỏ hàng trống', 'warning'); return; }

    // Tính tiền
    const total = CartService.getTotal();
    // LOGIC FREESHIP: Đơn từ 500k trở lên -> Phí ship = 0. Còn không thì phí mặc định 30k
    const shipping = total >= 500000 ? 0 : 30000;
    const finalTotal = total + shipping; // Tổng số tiền khách phải trả cuối cùng

    // Xóa modal cũ (nếu lỡ bấm 2 lần) để tránh trùng lặp HTML
    document.getElementById('checkout-modal')?.remove();

    const modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.style.cssText = `
      position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,0.6);
      display:flex; align-items:center; justify-content:center; padding:20px;
    `;
    modal.innerHTML = `
      <div style="background:#fff; border-radius:16px; width:100%; max-width:520px; max-height:90vh; overflow-y:auto; padding:32px; box-shadow:0 25px 60px rgba(0,0,0,0.3);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h2 style="font-size:20px; font-weight:700; color:#1a1a2e;">🛒 Xác Nhận Đặt Hàng</h2>
          <button id="btn-cancel-checkout" style="background:none; border:none; font-size:24px; cursor:pointer; color:#666;">✕</button>
        </div>

        <div style="margin-bottom:20px;">
          <h3 style="font-size:14px; font-weight:600; color:#666; text-transform:uppercase; margin-bottom:12px; letter-spacing:1px;">Thông tin nhận hàng</h3>
          <div style="display:grid; gap:12px;">
            <input id="co-name"    type="text"  placeholder="Họ và tên *" required
              value="${user?.name || ''}"
              style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit;">
            <input id="co-phone"   type="tel"   placeholder="Số điện thoại *" required
              style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit;">
            <input id="co-email"   type="email" placeholder="Email *" required
              value="${user?.email || ''}"
              style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit;">
            <input id="co-address" type="text"  placeholder="Địa chỉ giao hàng *" required
              style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit;">
            <select id="co-payment" style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit; background:#fff;">
              <option value="cod">💵 Thanh toán khi nhận hàng (COD)</option>
              <option value="bank">🏦 Chuyển khoản ngân hàng</option>
              <option value="momo">📱 Ví MoMo</option>
              <option value="vnpay">💳 VNPay</option>
            </select>
            <!-- QR CODE CONTAINER -->
            <div id="qr-container" style="display:none; text-align:center; padding:16px; background:#f8f9fa; border-radius:12px; border:1px dashed #ccc; margin-top:8px;">
              <h4 style="font-size:14px; color:#e63946; margin-bottom:8px;">Quét mã QR để thanh toán</h4>
              <img id="qr-img" src="" style="width:200px; height:200px; object-fit:contain; border-radius:8px; margin:0 auto;">
              <p style="font-size:12px; color:#666; margin-top:8px;">Vui lòng chuyển đúng số tiền: <strong id="qr-amount-text" style="color:#1a1a2e; font-size:16px;"></strong></p>
              <p style="font-size:11px; color:#888; margin-top:4px;">(Đơn hàng sẽ tự động hủy nếu không thanh toán trong 24h)</p>
            </div>
          </div>
        </div>

        <div style="background:#f8f9fa; border-radius:12px; padding:16px; margin-bottom:20px;">
          <h3 style="font-size:14px; font-weight:600; color:#666; text-transform:uppercase; margin-bottom:12px; letter-spacing:1px;">Sản phẩm đặt hàng</h3>
          ${cart.map(item => {
            const price = item.product.salePrice || item.product.price;
            return `
              <div style="display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid #e9ecef;">
                <img src="${item.product.images?.[0] || ''}" alt="${item.product.name}" style="width:48px; height:60px; object-fit:cover; border-radius:8px;">
                <div style="flex:1; min-width:0;">
                  <div style="font-size:13px; font-weight:500; color:#1a1a2e; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.product.name}</div>
                  <div style="font-size:12px; color:#666; margin-top:2px;">Size: ${item.size} | Màu: ${item.color} | SL: ${item.quantity}</div>
                </div>
                <div style="font-size:13px; font-weight:600; color:#e63946; white-space:nowrap;">${formatPrice(price * item.quantity)}</div>
              </div>
            `;
          }).join('')}
          <div style="display:flex; justify-content:space-between; margin-top:12px; font-size:13px; color:#666;">
            <span>Tạm tính</span><span>${formatPrice(total)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:4px; font-size:13px; color:#666;">
            <span>Phí giao hàng</span><span style="color:${shipping === 0 ? '#16a34a' : '#1a1a2e'}">${shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:12px; padding-top:12px; border-top:2px solid #dee2e6; font-size:16px; font-weight:700; color:#e63946;">
            <span>Tổng cộng</span><span>${formatPrice(finalTotal)}</span>
          </div>
        </div>

        <button id="btn-confirm-order" style="
          width:100%; padding:16px; background:linear-gradient(135deg,#e63946,#c1121f);
          color:#fff; border:none; border-radius:12px; font-size:16px; font-weight:700;
          cursor:pointer; letter-spacing:0.5px; font-family:inherit;
          transition:transform 0.2s, box-shadow 0.2s;
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(230,57,70,0.4)'"
           onmouseout="this.style.transform=''; this.style.boxShadow=''">
          ✅ Xác Nhận Đặt Hàng
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    // Lắng nghe sự kiện đổi phương thức thanh toán để hiện QR Code
    const paymentSelect = document.getElementById('co-payment') as HTMLSelectElement;
    const qrContainer = document.getElementById('qr-container');
    const qrImg = document.getElementById('qr-img') as HTMLImageElement;
    const qrAmountText = document.getElementById('qr-amount-text');

    if (paymentSelect && qrContainer && qrImg && qrAmountText) {
      paymentSelect.addEventListener('change', () => {
        const method = paymentSelect.value;
        if (method !== 'cod') {
          qrContainer.style.display = 'block';
          qrAmountText.textContent = formatPrice(finalTotal);
          // Tạo mã VietQR tự động (Dùng MB Bank BIN 970422 làm ví dụ)
          const bankBin = '970422'; 
          const accountNo = '0000123456789'; // STK Ảo cho sinh viên test
          const accountName = 'GENZ FASHION';
          const phone = (document.getElementById('co-phone') as HTMLInputElement)?.value?.trim() || user?.phone || 'Khach hang';
          const addInfo = `Thanh toan don hang ${phone}`;
          
          qrImg.src = `https://img.vietqr.io/image/${bankBin}-${accountNo}-compact.png?amount=${finalTotal}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
        } else {
          qrContainer.style.display = 'none';
        }
      });
    }

    // Đóng khi click backdrop
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  // Hàm thực thi đặt hàng (Gọi API Backend để tạo đơn)
  private static async handleCheckout(): Promise<void> {
    // Kiểm tra an ninh lần cuối
    if (!AuthService.isLoggedIn()) {
      showToast('Vui lòng đăng nhập để đặt hàng', 'warning');
      document.getElementById('checkout-modal')?.remove();
      document.getElementById('close-cart')?.click();
      window.location.hash = '#/login';
      return;
    }

    const user = AuthService.getCurrentUser()!;
    const cart = CartService.getCart();
    if (cart.length === 0) { showToast('Giỏ hàng trống', 'warning'); return; }

    // Lấy thông tin từ các ô Input khách hàng đã nhập trong Modal
    const name    = (document.getElementById('co-name')    as HTMLInputElement)?.value?.trim();
    const phone   = (document.getElementById('co-phone')   as HTMLInputElement)?.value?.trim();
    const email   = (document.getElementById('co-email')   as HTMLInputElement)?.value?.trim();
    const address = (document.getElementById('co-address') as HTMLInputElement)?.value?.trim();
    const payment = (document.getElementById('co-payment') as HTMLSelectElement)?.value;

    // Validate: Bắt buộc điền đủ trường (Ngăn chặn tạo đơn rác)
    if (!name || !phone || !email || !address) {
      showToast('Vui lòng điền đầy đủ thông tin giao hàng', 'error');
      return;
    }

    const total = CartService.getTotal();
    const shipping = total >= 500000 ? 0 : 30000;

    // NHÀO NẶN DỮ LIỆU ĐÚNG CHUẨN CỦA BACKEND
    // Cấu trúc Data này giống hệt những gì API `POST /api/orders` của Backend đang chờ đợi
    const orderData = {
      userId: String(user.id),
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerAddress: address,
      paymentMethod: payment || 'cod',
      paymentStatus: 'unpaid', // Mặc định là chưa thanh toán
      items: cart.map(item => ({
        productId:   item.product.id,
        productName: item.product.name,
        img:         item.product.images?.[0] || '',
        price:       item.product.salePrice || item.product.price, // Lấy giá sale nếu có, không thì lấy giá gốc
        quantity:    item.quantity,
        size:        item.size,
        color:       item.color
      })),
      total: total + shipping,
      shipping
    };

    // Vô hiệu hóa nút Đặt hàng để chống spam click nhiều lần tạo ra 2-3 đơn hàng trùng nhau
    const confirmBtn = document.getElementById('btn-confirm-order') as HTMLButtonElement;
    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.textContent = '⏳ Đang xử lý...';
    }

    try {
      // Bắn API lên Backend
      const order = await orderService.create(orderData as any);
      
      // XÓA TRẮNG GIỎ HÀNG: Backend cũng sẽ xóa Cart trong cơ sở dữ liệu luôn
      CartService.clearCart(); 

      // Đóng tất cả cửa sổ
      document.getElementById('checkout-modal')?.remove();
      document.getElementById('close-cart')?.click();

      showToast(`🎉 Đặt hàng thành công! Mã đơn: #${order?.id}`, 'success');

      // CHUYỂN HƯỚNG TỰ ĐỘNG: Chờ 1.5s cho khách đọc kịp chữ báo thành công, rồi tự chuyển họ sang trang Đơn hàng của họ
      setTimeout(() => {
        window.location.hash = '#/my-orders';
      }, 1500);
    } catch (err: any) {
      showToast(err.message || 'Đặt hàng thất bại, vui lòng thử lại', 'error');
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = '✅ Xác Nhận Đặt Hàng';
      }
    }
  }

  static renderDrawer(): void {
    const cart = CartService.getCart();
    const container   = document.getElementById('cart-drawer-items');
    const totalEl     = document.getElementById('cart-drawer-total');
    const titleEl     = document.getElementById('cart-drawer-title');
    const selectedEl  = document.getElementById('cart-selected-count');

    if (!container || !totalEl || !titleEl) return;

    const count = CartService.getItemCount();
    titleEl.textContent = `Giỏ hàng (${count})`;
    if (selectedEl) selectedEl.textContent = count.toString();

    if (cart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px 0; color:var(--text-secondary)">
          <div style="font-size:48px; margin-bottom:16px;">🛒</div>
          <p style="margin-bottom:16px;">Giỏ hàng đang trống</p>
          <button class="btn btn-primary" onclick="document.getElementById('close-cart').click(); window.location.hash='#/products'">Tiếp tục mua sắm</button>
        </div>
      `;
      totalEl.textContent = '0 đ';
      // Ẩn nút checkout nếu có
      const checkoutBtn = document.getElementById('btn-open-checkout-modal');
      if (checkoutBtn) checkoutBtn.style.display = 'none';
      return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
      const price = item.product.salePrice || item.product.price;
      total += price * item.quantity;
      const isGuest = CartService.isGuest();
      return `
        <div class="cart-item">
          <img src="${item.product.images?.[0] || 'https://picsum.photos/seed/genz/80/100'}" alt="${item.product.name}" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.product.name}</div>
            <div class="cart-item-variant">Màu: ${item.color} | Size: ${item.size}</div>
            <div class="cart-item-price">${formatPrice(price)}</div>
            <div class="qty-control">
              <button class="qty-btn btn-update-qty" data-id="${item.product.id}" data-size="${item.size}" data-color="${item.color}" data-change="-1">-</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly>
              <button class="qty-btn btn-update-qty" data-id="${item.product.id}" data-size="${item.size}" data-color="${item.color}" data-change="1">+</button>
            </div>
            ${isGuest ? '<div style="font-size:11px; color:#d97706; margin-top:4px;">⚠️ Đăng nhập để lưu giỏ hàng</div>' : ''}
          </div>
          <button class="cart-item-remove btn-remove-item" data-id="${item.product.id}" data-size="${item.size}" data-color="${item.color}">✕</button>
        </div>
      `;
    }).join('');

    totalEl.textContent = formatPrice(total);

    // Hiển thị nút checkout
    const checkoutBtn = document.getElementById('btn-open-checkout-modal');
    if (checkoutBtn) checkoutBtn.style.display = '';

    this.bindDrawerEvents();
  }

  private static bindDrawerEvents(): void {
    document.querySelectorAll('.btn-update-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const id     = target.dataset.id || '';
        const size   = target.dataset.size || '';
        const color  = target.dataset.color || '';
        const change = parseInt(target.dataset.change || '0');

        const cart = CartService.getCart();
        const item = cart.find(i => String(i.product.id) === id && i.size === size && i.color === color);
        if (item) CartService.updateQuantity(id, size, color, item.quantity + change);
      });
    });

    document.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        CartService.removeItem(
          target.dataset.id || '',
          target.dataset.size || '',
          target.dataset.color || ''
        );
      });
    });
  }
}
