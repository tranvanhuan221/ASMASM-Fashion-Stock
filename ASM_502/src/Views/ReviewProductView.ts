import { IProduct } from '../Models/Product.js';

export class ReviewProductView {
  static render(product: IProduct, orderId: string): string {
    return `
      <div class="container" style="padding: 60px 0; max-width: 600px; margin: 0 auto;">
        <h2 style="font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 24px;">ĐÁNH GIÁ SẢN PHẨM</h2>
        
        <div style="background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 24px;">
          <!-- Product Info -->
          <div style="display: flex; gap: 16px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f0f0f0;">
            <img src="${product.images && product.images.length > 0 ? product.images[0] : ''}" alt="${product.name}" style="width: 80px; height: 100px; object-fit: cover; border-radius: 4px; background: #f9f9f9;">
            <div>
              <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${product.name}</div>
              <div style="font-size: 13px; color: #666;">Cảm ơn bạn đã mua sắm tại GenZ Fashion. Hãy chia sẻ cảm nhận của bạn về sản phẩm này nhé!</div>
            </div>
          </div>

          <!-- Rating -->
          <div style="margin-bottom: 24px; text-align: center;">
            <div style="font-size: 15px; font-weight: 600; margin-bottom: 12px;">Chất lượng sản phẩm</div>
            <div class="star-rating" style="display: flex; gap: 8px; justify-content: center; font-size: 32px; color: #e0e0e0; cursor: pointer; user-select: none;">
              <span data-value="1" class="star">★</span>
              <span data-value="2" class="star">★</span>
              <span data-value="3" class="star">★</span>
              <span data-value="4" class="star">★</span>
              <span data-value="5" class="star">★</span>
            </div>
            <div id="rating-text" style="font-size: 13px; color: #e63946; font-weight: 600; margin-top: 8px; min-height: 20px;"></div>
          </div>

          <!-- Comment -->
          <div style="margin-bottom: 24px;">
            <textarea id="review-comment" placeholder="Hãy chia sẻ nhận xét của bạn về chất liệu, form dáng, màu sắc..." rows="4" style="width: 100%; padding: 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-family: inherit; font-size: 14px; resize: vertical; outline: none; transition: border-color 0.3s;"></textarea>
          </div>

          <!-- Submit -->
          <button id="btn-submit-review" style="width: 100%; padding: 14px; background: var(--primary); color: white; border: none; border-radius: 4px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.3s;">
            Hoàn thành đánh giá
          </button>
        </div>
      </div>
    `;
  }
}
