import { productService } from '../Services/ProductService.js';
import { ReviewService } from '../Services/ReviewService.js';
import { AuthService } from '../Services/AuthService.js';
import { ReviewProductView } from '../Views/ReviewProductView.js';
import { LayoutView } from '../Views/LayoutView.js';
import { showToast } from '../Utils/helpers.js';

export class ReviewProductController {
  static async render(appElement: HTMLElement, params?: Record<string, string>): Promise<void> {
    const orderId = params?.orderId;
    const productId = params?.productId;

    if (!orderId || !productId) {
      window.location.hash = '#/my-orders';
      return;
    }

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      window.location.hash = '#/login';
      return;
    }

    // Hiển thị loading
    appElement.innerHTML = LayoutView.render(`
      <div class="container" style="padding: 100px 0; text-align: center;">
        <h2>Đang tải thông tin sản phẩm...</h2>
      </div>
    `, false, true);
    LayoutView.bindEvents();

    try {
      const product = await productService.getById(productId);
      if (!product) throw new Error('Không tìm thấy sản phẩm');

      appElement.innerHTML = LayoutView.render(ReviewProductView.render(product, orderId), false, true);
      LayoutView.bindEvents();

      // Bind events cho sao và nút submit
      this.bindEvents(orderId, productId);
    } catch (error) {
      console.error('Lỗi tải trang đánh giá:', error);
      appElement.innerHTML = LayoutView.render(`
        <div class="container" style="padding: 100px 0; text-align: center;">
          <h2>Đã có lỗi xảy ra. Không thể tải trang đánh giá.</h2>
          <a href="#/my-orders" class="btn btn-primary" style="margin-top: 16px;">Về Đơn hàng của tôi</a>
        </div>
      `, false, true);
      LayoutView.bindEvents();
    }
  }

  static bindEvents(orderId: string, productId: string) {
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('rating-text');
    const btnSubmit = document.getElementById('btn-submit-review') as HTMLButtonElement;
    const commentInput = document.getElementById('review-comment') as HTMLTextAreaElement;

    let selectedRating = 0;
    const ratingLabels = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];

    // Hiệu ứng hover và click cho các ngôi sao
    stars.forEach(star => {
      star.addEventListener('mouseover', (e) => {
        const val = parseInt((e.target as HTMLElement).dataset.value || '0');
        updateStars(val, true);
      });

      star.addEventListener('mouseout', () => {
        updateStars(selectedRating, false);
      });

      star.addEventListener('click', (e) => {
        selectedRating = parseInt((e.target as HTMLElement).dataset.value || '0');
        updateStars(selectedRating, false);
        if (ratingText) ratingText.textContent = ratingLabels[selectedRating - 1];
      });
    });

    function updateStars(val: number, isHover: boolean) {
      stars.forEach(star => {
        const starVal = parseInt((star as HTMLElement).dataset.value || '0');
        if (starVal <= val) {
          (star as HTMLElement).style.color = '#fbbf24'; // Màu vàng
        } else {
          (star as HTMLElement).style.color = '#e0e0e0'; // Màu xám
        }
      });
    }

    // Sự kiện Gửi đánh giá
    if (btnSubmit) {
      btnSubmit.addEventListener('click', async () => {
        if (selectedRating === 0) {
          showToast('Vui lòng chọn số sao đánh giá', 'error');
          return;
        }

        const comment = commentInput?.value || '';

        try {
          btnSubmit.disabled = true;
          btnSubmit.textContent = 'Đang gửi...';

          const currentUser = AuthService.getCurrentUser();
          await ReviewService.createReview({
            userId: String(currentUser?.id),
            userName: currentUser?.name || 'Khách hàng',
            orderId,
            productId,
            rating: selectedRating,
            comment: comment.trim()
          });

          showToast('Cảm ơn bạn đã gửi đánh giá!', 'success');
          window.location.hash = '#/my-orders'; // Chuyển về trang đơn hàng
        } catch (error: any) {
          showToast(error.message || 'Lỗi khi gửi đánh giá', 'error');
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'Hoàn thành đánh giá';
        }
      });
    }
  }
}
