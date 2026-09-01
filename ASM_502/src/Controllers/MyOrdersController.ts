/**
 * MyOrdersController.ts - ĐIỀU KHIỂN TRANG "ĐƠN HÀNG CỦA TÔI"
 * 
 * Nhiệm vụ: Hiển thị danh sách lịch sử mua hàng của riêng một khách hàng (user).
 * Quy trình hoạt động:
 * 1. Kiểm tra đăng nhập: Nếu chưa đăng nhập, ép chuyển hướng về trang Login.
 * 2. Lấy dữ liệu: Gọi `OrderService` để lấy toàn bộ đơn hàng thuộc về `userId` đang đăng nhập.
 * 3. Render giao diện: Vẽ ra từng khối đơn hàng (mã đơn, ngày đặt, trạng thái màu sắc, danh sách sản phẩm, tổng tiền).
 * 4. Xử lý "Yêu cầu hủy đơn": 
 *    - Nếu đơn đang ở trạng thái 'pending' -> Khách tự hủy được luôn (Cập nhật thành 'cancelled').
 *    - Nếu đơn đã 'confirmed' hoặc 'shipping' -> Khách bấm "Yêu cầu hủy đơn", nhập lý do, sau đó đơn chuyển sang trạng thái "Chờ duyệt hủy" để chờ Admin xử lý.
 *    Lưu ý: Mọi thao tác hủy/yêu cầu hủy đều tự động gọi lại hàm `render()` để làm mới giao diện tức thì (không cần tải lại trang).
 */
import { LayoutView } from '../Views/LayoutView.js';
import { AuthService } from '../Services/AuthService.js';
import { orderService } from '../Services/OrderService.js';
import { Order } from '../Models/Order.js';
import { formatPrice, showToast } from '../Utils/helpers.js';
import { ReviewService } from '../Services/ReviewService.js';

export class MyOrdersController {
  // Hàm hiển thị trang lịch sử mua hàng của khách
  static async render(appElement: HTMLElement): Promise<void> {
    
    // 1. Kiểm tra an ninh: Nếu chưa đăng nhập thì ép hiển thị màn hình yêu cầu đăng nhập
    if (!AuthService.isLoggedIn()) {
      appElement.innerHTML = LayoutView.render(`
        <div class="container" style="padding:80px 0; text-align:center;">
          <div style="font-size:64px; margin-bottom:16px;">🔐</div>
          <h2 style="font-size:24px; font-weight:800; margin-bottom:12px;">Đăng Nhập Để Xem Đơn Hàng</h2>
          <p style="color:var(--text-secondary); margin-bottom:24px;">Bạn cần đăng nhập để xem đơn hàng của mình.</p>
          <a href="#/login" class="btn btn-primary">Đăng nhập ngay</a>
        </div>
      `, false, true);
      LayoutView.bindEvents(); // Gắn lại các nút trên Header/Footer
      return; // Dừng lại ở đây, không chạy code bên dưới nữa
    }

    // 2. Lấy thông tin khách hàng đang đăng nhập từ bộ nhớ tạm (LocalStorage)
    const user = AuthService.getCurrentUser()!;

    // 3. Vẽ ra bộ khung ban đầu với hiệu ứng "Đang tải đơn hàng..." để UX tốt hơn
    appElement.innerHTML = LayoutView.render(`
      <div class="container" style="padding:40px 0 80px;">
        <div style="text-align:center; margin-bottom:40px;">
          <h1 style="font-size:28px; font-weight:800; color:var(--text-primary);">📦 Đơn Hàng Của Tôi</h1>
          <p style="color:var(--text-secondary); margin-top:8px;">Xin chào, <strong>${user.name}</strong>!</p>
        </div>
        <div id="my-orders-content" style="max-width:800px; margin:0 auto;">
          <div style="text-align:center; padding:40px; color:var(--text-secondary);">
            <div style="font-size:32px; margin-bottom:12px;">⏳</div>Đang tải đơn hàng...
          </div>
        </div>
      </div>
    `, false, true);
    LayoutView.bindEvents();

    // 4. Lấy dữ liệu và vẽ giao diện chi tiết
    try {
      // Gọi API Backend lấy toàn bộ đơn hàng của người dùng hiện tại (truyền lên user.id)
      const ordersData = await orderService.getByUser(String(user.id));
      const userReviews = await ReviewService.getByUserId(String(user.id));
      
      // Biến đổi dữ liệu JSON thô thành đối tượng Order để dễ sử dụng các hàm màu sắc
      const orders = ordersData.map(o => new Order(o));
      
      const content = document.getElementById('my-orders-content');
      if (!content) return;

      // Nếu khách chưa từng mua đơn hàng nào
      if (orders.length === 0) {
        content.innerHTML = `
          <div style="text-align:center; padding:60px 20px;">
            <div style="font-size:80px; margin-bottom:20px;">🛍️</div>
            <h3 style="font-size:20px; font-weight:600; margin-bottom:12px; color:var(--text-primary);">Bạn chưa có đơn hàng nào</h3>
            <p style="color:var(--text-secondary); margin-bottom:24px;">Hãy khám phá các sản phẩm GenZ Fashion ngay!</p>
            <a href="#/products" class="btn btn-primary btn-lg">Mua Sắm Ngay</a>
          </div>
        `;
        return;
      }

      // Nếu có đơn hàng: Dùng vòng lặp map() để duyệt qua từng đơn hàng và nối các đoạn HTML lại với nhau
      content.innerHTML = orders.map(order => `
        <div style="
          background:#fff; border-radius:16px; border:1px solid #e5e7eb;
          margin-bottom:20px; overflow:hidden;
          box-shadow:0 2px 8px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s;
        " onmouseover="this.style.boxShadow='0 4px 20px rgba(0,0,0,0.12)'"
           onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.06)'">
          <!-- Header đơn hàng -->
          <div style="padding:16px 20px; background:${order.statusColor}15; border-bottom:1px solid ${order.statusColor}30; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <span style="font-size:13px; color:#666;">Mã đơn hàng</span>
              <span style="font-weight:700; font-size:15px; color:#1a1a2e; margin-left:8px;">#${order.id}</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:12px; color:#666;">${order.formattedDate}</span>
              <span style="
                background:${order.statusColor}; color:#fff;
                padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600;
              ">${order.statusLabel}</span>
              ${order.status === 'pending' ? `
                <button class="btn-cancel-user-order" data-id="${order.id}" style="background:#ef4444; border:none; color:#fff; padding:4px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:600; transition:opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                  Hủy đơn
                </button>
              ` : order.status === 'confirmed' ? (
                order.cancelRequested ? `
                  <span style="font-size:12px; color:#d97706; font-weight:600;">⏳ Đang chờ admin duyệt hủy</span>
                ` : `
                  <button class="btn-request-cancel-order" data-id="${order.id}" style="background:transparent; border:1px solid #ef4444; color:#ef4444; padding:4px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:600; transition:all 0.2s;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='transparent'">
                    Yêu cầu hủy đơn
                  </button>
                `
              ) : order.status === 'delivered' ? (
                !order.receivedAt ? `
                  <button class="btn-confirm-received" data-id="${order.id}" style="background:#16a34a; border:none; color:#fff; padding:4px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:600; transition:opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Đã nhận được hàng</button>
                ` : ''
              ) : order.status === 'completed' ? (
                (order.receivedAt && Date.now() - new Date(order.receivedAt).getTime() <= 14 * 24 * 60 * 60 * 1000) ? (
                  order.returnRequested ? `
                    <span style="font-size:12px; color:#d97706; font-weight:600;">⏳ Đang chờ xử lý hoàn hàng</span>
                  ` : `
                    <button class="btn-request-return" data-id="${order.id}" style="background:transparent; border:1px solid #f59e0b; color:#f59e0b; padding:4px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:600; transition:all 0.2s;" onmouseover="this.style.background='#fef3c7'" onmouseout="this.style.background='transparent'">Yêu cầu Hoàn Hàng</button>
                  `
                ) : ''
              ) : ''}
            </div>
          </div>

          <!-- Sản phẩm -->
          <div style="padding:16px 20px;">
            ${order.items.map(item => {
              const hasReviewed = userReviews.some(r => r.orderId === String(order.id) && String(r.productId) === String(item.productId));
              return `
              <div style="display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid #f3f4f6;">
                <img src="${item.img || ''}" alt="${item.productName}"
                  style="width:56px; height:70px; object-fit:cover; border-radius:8px; background:#f3f4f6;">
                <div style="flex:1; min-width:0;">
                  <div style="font-size:14px; font-weight:500; color:#1a1a2e; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.productName}</div>
                  <div style="font-size:12px; color:#666; margin-top:3px;">Size: ${item.size} | Màu: ${item.color} | SL: ${item.quantity}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:14px; font-weight:600; color:#e63946; white-space:nowrap;">${formatPrice(item.price * item.quantity)}</div>
                  ${order.status === 'completed' ? (
                    hasReviewed 
                    ? '<span style="font-size:11px; color:#16a34a; font-weight:600; display:block; margin-top:4px;">✔️ Đã đánh giá</span>'
                    : '<a href="#/review/' + order.id + '/' + item.productId + '" class="btn-review-product" style="display:inline-block; margin-top:4px; padding:4px 10px; font-size:11px; text-decoration:none; text-align:center; cursor:pointer; background:#fff; border:1px solid var(--primary); color:var(--primary); border-radius:4px;">⭐ Đánh giá</a>'
                  ) : ''}
                </div>
              </div>
            `;}).join('')}
          </div>

          <!-- Footer tổng tiền -->
          <div style="padding:12px 20px 16px; display:flex; justify-content:space-between; align-items:center; background:#fafafa;">
            <div style="font-size:13px; color:#666; display:flex; flex-direction:column; gap:4px;">
              <div>Phương thức: <strong>${this.getPaymentLabel(order)}</strong></div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span>Thanh toán: <strong style="color:${order.paymentStatus === 'paid' ? '#16a34a' : (order.paymentStatus === 'refunded' ? '#8b5cf6' : '#d97706')}">${order.paymentStatus === 'paid' ? 'Đã thanh toán' : (order.paymentStatus === 'refunded' ? 'Đã hoàn tiền' : 'Chưa thanh toán')}</strong></span>
                ${(order.paymentStatus === 'unpaid' && order.paymentMethod !== 'cod' && order.status !== 'cancelled') ? `
                  <button class="btn-check-payment" data-id="${order.id}" style="background:#f3f4f6; border:1px solid #d1d5db; border-radius:4px; padding:2px 6px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:4px;">
                    <span class="spin-icon" style="display:none;">⏳</span> 🔄 Cập nhật GD
                  </button>
                ` : ''}
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12px; color:#666; margin-bottom:2px;">Tổng tiền:</div>
              <div style="font-size:18px; font-weight:800; color:#e63946;">${order.formattedTotal}</div>
            </div>
          </div>
        </div>
      `).join('');

      // Lắng nghe sự kiện click cho nút "Hủy đơn" (áp dụng với đơn đang Chờ xác nhận)
      document.querySelectorAll('.btn-cancel-user-order').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id;
          // Hiển thị hộp thoại xác nhận (Confirm)
          if (id && confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
            try {
              // Gọi API cập nhật trạng thái đơn thành 'cancelled'
              await orderService.update(id, { status: 'cancelled' } as any);
              showToast('Đã hủy đơn hàng thành công', 'success');
              // TẢI LẠI TRANG TỨC THÌ: Bằng cách gọi lại hàm render() chính nó, danh sách sẽ làm mới ngay!
              this.render(appElement);
            } catch (err: any) {
              showToast(err.message || 'Lỗi khi hủy đơn hàng', 'error');
            }
          }
        });
      });

      // Lắng nghe sự kiện click cho nút "Yêu cầu hủy đơn" (áp dụng với đơn Đã xác nhận / Đang giao)
      document.querySelectorAll('.btn-request-cancel-order').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id;
          if (!id) return;
          
          // Mở hộp thoại (Prompt) yêu cầu khách hàng nhập lý do
          const reason = prompt('Vui lòng nhập lý do bạn muốn hủy đơn hàng này:');
          if (reason === null) return; // Khách bấm nút Cancel (Hủy bỏ hộp thoại) thì dừng lại
          
          // Kiểm tra xem khách có bỏ trống lý do không
          if (!reason.trim()) {
            showToast('Bạn phải nhập lý do hủy đơn', 'error');
            return;
          }
          
          try {
            // Gọi API gửi yêu cầu hủy (Bật cờ cancelRequested = true lên Backend)
            await orderService.update(id, { cancelRequested: true, cancelReason: reason.trim() } as any);
            showToast('Đã gửi yêu cầu hủy đơn thành công', 'success');
            // CẬP NHẬT TỨC THÌ: Trạng thái đổi thành "Đang chờ admin duyệt hủy" ngay lập tức
            this.render(appElement);
          } catch (err: any) {
            showToast(err.message || 'Lỗi gửi yêu cầu', 'error');
          }
        });
      });

      // Lắng nghe sự kiện click cho nút "Xác nhận nhận hàng"
      document.querySelectorAll('.btn-confirm-received').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id;
          if (id && confirm('Bạn xác nhận đã nhận được hàng và hàng hóa trong tình trạng tốt chứ?')) {
            try {
              const order = orders.find(o => String(o.id) === id);
              const updateData: any = { receivedAt: new Date().toISOString(), status: 'completed' };
              if (order && order.paymentStatus === 'unpaid') {
                updateData.paymentStatus = 'paid';
              }
              // Lưu thời điểm nhận hàng để tính 14 ngày hoàn trả, và đổi status
              await orderService.update(id, updateData);
              showToast('Cảm ơn bạn đã mua sắm tại GenZ Fashion!', 'success');
              this.render(appElement);
            } catch (err: any) {
              showToast(err.message || 'Lỗi khi xác nhận', 'error');
            }
          }
        });
      });

      // Lắng nghe sự kiện click cho nút "Yêu cầu hoàn hàng"
      document.querySelectorAll('.btn-request-return').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id;
          if (!id) return;
          
          const reason = prompt('Vui lòng nhập lý do bạn muốn hoàn hàng (vd: Sản phẩm lỗi, sai màu,...):');
          if (reason === null) return;
          
          if (!reason.trim()) {
            showToast('Bạn phải nhập lý do hoàn hàng', 'error');
            return;
          }
          
          try {
            await orderService.update(id, { returnRequested: true, returnReason: reason.trim(), returnStatus: 'pending' } as any);
            showToast('Đã gửi yêu cầu hoàn hàng thành công. Admin sẽ liên hệ lại.', 'success');
            this.render(appElement);
          } catch (err: any) {
            showToast(err.message || 'Lỗi gửi yêu cầu', 'error');
          }
        });
      });

      // Lắng nghe sự kiện click cho nút "Cập nhật GD (Kiểm tra thanh toán)"
      document.querySelectorAll('.btn-check-payment').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const target = e.currentTarget as HTMLButtonElement;
          const id = target.dataset.id;
          if (!id) return;

          // Hiệu ứng loading
          const icon = target.querySelector('.spin-icon') as HTMLElement;
          const originalText = target.innerHTML;
          if (icon) icon.style.display = 'inline-block';
          target.disabled = true;

          // Giả lập độ trễ kết nối API Ngân hàng / VNPay
          setTimeout(async () => {
            try {
              // Mô phỏng: Giả sử cứ bấm là coi như API Ngân hàng trả về thành công cho mục đích Demo ASM
              await orderService.update(id, { paymentStatus: 'paid' } as any);
              showToast('✅ Giao dịch đã được xác nhận thành công từ ngân hàng!', 'success');
              this.render(appElement);
            } catch (err: any) {
              showToast(err.message || 'Lỗi kết nối ngân hàng', 'error');
              target.innerHTML = originalText;
              target.disabled = false;
            }
          }, 1500); // Đợi 1.5s
        });
      });


    } catch (err: any) {
      const content = document.getElementById('my-orders-content');
      if (content) content.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--text-secondary);">
          <div style="font-size:48px; margin-bottom:12px;">⚠️</div>
          <p>Không thể tải đơn hàng: ${err.message}</p>
        </div>
      `;
    }
  }

  private static getPaymentLabel(order: Order): string {
    const map: Record<string, string> = {
      cod:  'Thanh toán khi nhận hàng',
      bank: 'Chuyển khoản ngân hàng',
      momo: 'Ví MoMo',
      vnpay: 'VNPay'
    };
    return map[(order as any).paymentMethod] || 'COD';
  }
}
