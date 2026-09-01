import { LayoutView } from '../Views/LayoutView.js';
import { showToast } from '../Utils/helpers.js';

export class ContactController {
  static render(appElement: HTMLElement): void {
    const content = `
      <!-- Hero Banner -->
      <div style="width:100%; height:360px; background:linear-gradient(135deg, #1a1a2e 0%, #333f48 100%); display:flex; align-items:center; justify-content:center; text-align:center; color:white;">
        <div>
          <h1 style="font-size:48px; font-weight:900; letter-spacing:4px; margin-bottom:16px; text-transform:uppercase;">LIÊN HỆ VỚI CHÚNG TÔI</h1>
          <p style="font-size:18px; max-width:620px; margin:0 auto; line-height:1.7; color:rgba(255,255,255,0.85);">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ qua bất kỳ kênh nào bên dưới — đội ngũ GENZ Fashion sẽ phản hồi nhanh nhất có thể.</p>
        </div>
      </div>

      <!-- Contact Info Cards -->
      <div class="container" style="padding:60px 15px 0;">
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:30px; margin-bottom:70px;">
          <!-- Card 1: Address -->
          <div style="background:#fff; border-radius:14px; padding:40px 30px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.07); transition:transform 0.3s ease, box-shadow 0.3s ease; cursor:default;" onmouseover="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 12px 36px rgba(0,0,0,0.12)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 24px rgba(0,0,0,0.07)';">
            <div style="width:70px; height:70px; background:linear-gradient(135deg, #1a1a2e, #333f48); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:30px; margin:0 auto 20px; color:white;">📍</div>
            <h3 style="font-size:20px; font-weight:700; color:#111; margin-bottom:12px;">Địa chỉ</h3>
            <p style="color:#555; line-height:1.7; font-size:15px;">Tòa nhà FPT Polytechnic,<br>Trịnh Văn Bô, Nam Từ Liêm,<br>Hà Nội</p>
          </div>
          <!-- Card 2: Hotline -->
          <div style="background:#fff; border-radius:14px; padding:40px 30px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.07); transition:transform 0.3s ease, box-shadow 0.3s ease; cursor:default;" onmouseover="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 12px 36px rgba(0,0,0,0.12)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 24px rgba(0,0,0,0.07)';">
            <div style="width:70px; height:70px; background:linear-gradient(135deg, #1a1a2e, #333f48); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:30px; margin:0 auto 20px; color:white;">📞</div>
            <h3 style="font-size:20px; font-weight:700; color:#111; margin-bottom:12px;">Hotline</h3>
            <p style="color:#555; line-height:1.7; font-size:15px;"><strong style="font-size:18px; color:#1a1a2e;">1900.636.000</strong><br>8h - 21h hàng ngày<br>Zalo: <strong>0987.654.321</strong></p>
          </div>
          <!-- Card 3: Email -->
          <div style="background:#fff; border-radius:14px; padding:40px 30px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.07); transition:transform 0.3s ease, box-shadow 0.3s ease; cursor:default;" onmouseover="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 12px 36px rgba(0,0,0,0.12)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 24px rgba(0,0,0,0.07)';">
            <div style="width:70px; height:70px; background:linear-gradient(135deg, #1a1a2e, #333f48); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:30px; margin:0 auto 20px; color:white;">✉</div>
            <h3 style="font-size:20px; font-weight:700; color:#111; margin-bottom:12px;">Email</h3>
            <p style="color:#555; line-height:1.7; font-size:15px;"><a href="mailto:hello@genz-fashion.vn" style="color:var(--primary); text-decoration:none; font-weight:600;">hello@genz-fashion.vn</a><br><a href="mailto:wholesale@genz-fashion.vn" style="color:var(--primary); text-decoration:none; font-weight:600;">wholesale@genz-fashion.vn</a><br><span style="font-size:13px; color:#888;">(đặt hàng sỉ)</span></p>
          </div>
        </div>

        <!-- Two-column: Form + Wholesale -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:50px; margin-bottom:70px; align-items:start;">
          <!-- Left: Contact Form -->
          <div style="background:#fff; border-radius:14px; padding:40px; box-shadow:0 4px 24px rgba(0,0,0,0.07);">
            <h2 style="font-size:26px; font-weight:800; color:#111; margin-bottom:8px;">GỬI TIN NHẮN CHO CHÚNG TÔI</h2>
            <p style="color:#888; font-size:14px; margin-bottom:28px;">Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại sớm nhất.</p>
            <form id="contactForm" style="display:flex; flex-direction:column; gap:18px;">
              <!-- Họ tên -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Họ tên <span style="color:#e53935;">*</span></label>
                <input type="text" name="fullname" required placeholder="Nguyễn Văn A" style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; transition:border-color 0.2s; box-sizing:border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'" />
              </div>
              <!-- Email -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Email <span style="color:#e53935;">*</span></label>
                <input type="email" name="email" required placeholder="email@example.com" style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; transition:border-color 0.2s; box-sizing:border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'" />
              </div>
              <!-- Số điện thoại -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Số điện thoại <span style="color:#e53935;">*</span></label>
                <input type="tel" name="phone" required placeholder="0912 345 678" style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; transition:border-color 0.2s; box-sizing:border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'" />
              </div>
              <!-- Chủ đề -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Chủ đề</label>
                <select name="subject" style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; background:#fff; color:#333; transition:border-color 0.2s; box-sizing:border-box; cursor:pointer;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'">
                  <option value="">-- Chọn chủ đề --</option>
                  <option value="wholesale">Tư vấn mua sỉ</option>
                  <option value="order-support">Hỗ trợ đơn hàng</option>
                  <option value="feedback">Góp ý sản phẩm</option>
                  <option value="partnership">Hợp tác kinh doanh</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <!-- Nội dung -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Nội dung <span style="color:#e53935;">*</span></label>
                <textarea name="message" required rows="5" placeholder="Nhập nội dung tin nhắn của bạn..." style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; resize:vertical; font-family:inherit; transition:border-color 0.2s; box-sizing:border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'"></textarea>
              </div>
              <!-- Submit -->
              <button type="submit" style="padding:14px 32px; background:var(--primary); color:white; border:none; border-radius:8px; font-size:16px; font-weight:700; cursor:pointer; transition:opacity 0.2s; letter-spacing:0.5px;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Gửi tin nhắn</button>
            </form>
          </div>

          <!-- Right: Wholesale Section -->
          <div style="background:linear-gradient(135deg, #f8f9fa 0%, #eef1f5 100%); border-radius:14px; padding:40px; box-shadow:0 4px 24px rgba(0,0,0,0.07);">
            <h2 style="font-size:26px; font-weight:800; color:#1a1a2e; margin-bottom:12px;">🏢 ĐẶT HÀNG SỈ & ĐẠI LÝ</h2>
            <p style="color:#555; font-size:15px; line-height:1.7; margin-bottom:24px;">GENZ Fashion luôn chào đón các đối tác, đại lý và cửa hàng muốn phân phối sản phẩm của chúng tôi. Chương trình bán sỉ được thiết kế linh hoạt, phù hợp với mọi quy mô kinh doanh.</p>

            <!-- Benefits -->
            <div style="margin-bottom:28px;">
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Chiết khấu cao lên đến <strong>40%</strong></span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Hỗ trợ đổi trả hàng linh hoạt</span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Miễn phí vận chuyển đơn từ <strong>5 triệu</strong></span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Nhân viên chuyên biệt tư vấn <strong>1-1</strong></span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0;">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Catalogue và lookbook <strong>miễn phí</strong></span>
              </div>
            </div>

            <!-- Wholesale Contact Info -->
            <div style="background:#fff; border-radius:10px; padding:20px 24px; margin-bottom:24px; border-left:4px solid #1a1a2e;">
              <p style="margin:0 0 8px; color:#333; font-size:14px;"><strong>Hotline sỉ:</strong> <a href="tel:0987654321" style="color:var(--primary); text-decoration:none; font-weight:600;">0987.654.321</a></p>
              <p style="margin:0 0 8px; color:#333; font-size:14px;"><strong>Zalo OA:</strong> GENZ Fashion Wholesale</p>
              <p style="margin:0; color:#333; font-size:14px;"><strong>Email:</strong> <a href="mailto:wholesale@genz-fashion.vn" style="color:var(--primary); text-decoration:none; font-weight:600;">wholesale@genz-fashion.vn</a></p>
            </div>

            <!-- CTA Button -->
            <a href="tel:0987654321" style="display:block; text-align:center; padding:16px 32px; background:linear-gradient(135deg, #1a1a2e, #333f48); color:white; border-radius:10px; font-size:18px; font-weight:800; text-decoration:none; letter-spacing:1px; transition:opacity 0.2s; box-shadow:0 4px 16px rgba(26,26,46,0.3);" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">📞 GỌI NGAY</a>
          </div>
        </div>
      </div>

      <!-- Google Maps Embed -->
      <div style="width:100%; height:400px; filter:grayscale(0.3);">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863!2d105.7469!3d21.0381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b32b842a37%3A0xe91a56573e7f9a11!2sFPT%20Polytechnic%20Hanoi!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
          width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    `;

    appElement.innerHTML = LayoutView.render(content);
    LayoutView.bindEvents();
    ContactController.bindFormEvents();
  }

  static bindFormEvents(): void {
    const form = document.getElementById('contactForm') as HTMLFormElement | null;
    if (!form) return;

    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      showToast('Cảm ơn bạn! Chúng tôi sẽ phản hồi trong 24h.', 'success');
      form.reset();
    });
  }
}
