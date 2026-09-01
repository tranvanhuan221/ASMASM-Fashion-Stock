import { LayoutView } from '../Views/LayoutView.js';

export class AboutController {
  static render(appElement: HTMLElement): void {
    const content = `
      <!-- Hero Section -->
      <div style="width:100%; height:400px; background:linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&auto=format&fit=crop') center/cover; display:flex; align-items:center; justify-content:center; text-align:center; color:white;">
        <div>
          <h1 style="font-size:56px; font-weight:900; letter-spacing:4px; margin-bottom:16px;">VỀ CHÚNG TÔI</h1>
          <p style="font-size:18px; max-width:600px; margin:0 auto; line-height:1.6; color:rgba(255,255,255,0.9);">Hành trình mang thời trang chuẩn mực và phong cách năng động đến với hàng triệu khách hàng Việt Nam.</p>
        </div>
      </div>

      <div class="container" style="padding:80px 15px;">
        <!-- Story Section -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; margin-bottom:100px;">
          <div>
            <img src="https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1000&auto=format&fit=crop" style="width:100%; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.1);">
          </div>
          <div>
            <h2 style="font-size:14px; font-weight:700; color:var(--primary); text-transform:uppercase; letter-spacing:2px; margin-bottom:12px;">CÂU CHUYỆN THƯƠNG HIỆU</h2>
            <h3 style="font-size:36px; font-weight:800; color:#111; margin-bottom:24px; line-height:1.2;">Bắt nguồn từ đam mê và sự tử tế</h3>
            <p style="font-size:16px; color:#555; line-height:1.8; margin-bottom:16px;">Ra đời với sứ mệnh mang đến những sản phẩm thời trang chất lượng, dễ tiếp cận cho mọi gia đình Việt. Chúng tôi tin rằng trang phục không chỉ để mặc, mà còn là cách để bạn thể hiện cá tính và sự tự tin mỗi ngày.</p>
            <p style="font-size:16px; color:#555; line-height:1.8;">Từ những chất liệu được tuyển chọn khắt khe đến quy trình sản xuất tối ưu, mỗi sản phẩm đến tay khách hàng đều là tâm huyết của đội ngũ thiết kế và kỹ thuật viên.</p>
          </div>
        </div>

        <!-- Vision Section -->
        <div style="background:#f9fafb; border-radius:16px; padding:80px; text-align:center; margin-bottom:100px;">
          <h2 style="font-size:32px; font-weight:800; margin-bottom:48px;">TẦM NHÌN & SỨ MỆNH</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:40px;">
            <div>
              <div style="width:80px; height:80px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; margin:0 auto 24px; box-shadow:0 10px 20px rgba(0,0,0,0.05);">🎯</div>
              <h4 style="font-size:20px; font-weight:700; margin-bottom:12px;">Mục tiêu</h4>
              <p style="color:#666; line-height:1.6;">Trở thành thương hiệu thời trang số 1 Việt Nam về sự tiện dụng và chất lượng bền bỉ.</p>
            </div>
            <div>
              <div style="width:80px; height:80px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; margin:0 auto 24px; box-shadow:0 10px 20px rgba(0,0,0,0.05);">🌱</div>
              <h4 style="font-size:20px; font-weight:700; margin-bottom:12px;">Giá trị cốt lõi</h4>
              <p style="color:#666; line-height:1.6;">Khách hàng là trung tâm, sáng tạo không ngừng và phát triển bền vững cùng cộng đồng.</p>
            </div>
            <div>
              <div style="width:80px; height:80px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; margin:0 auto 24px; box-shadow:0 10px 20px rgba(0,0,0,0.05);">💚</div>
              <h4 style="font-size:20px; font-weight:700; margin-bottom:12px;">Trách nhiệm</h4>
              <p style="color:#666; line-height:1.6;">Ưu tiên sử dụng chất liệu thân thiện môi trường và xây dựng môi trường làm việc công bằng.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    appElement.innerHTML = LayoutView.render(content);
    LayoutView.bindEvents();
  }
}
