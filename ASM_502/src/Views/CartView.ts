import { CartService, ICartItem } from '../Services/CartService.js';
import { formatPrice } from '../Utils/helpers.js';

export class CartView {
  static render(cart: ICartItem[]): string {
    if (cart.length === 0) {
      return `
        <div class="container" style="padding-top: 40px;">
          <h1 class="page-title">Giỏ Hàng Của Bạn</h1>
          <div class="empty-state animate-slideUp">
            <span class="empty-icon">🛒</span>
            <h2>Giỏ hàng đang trống</h2>
            <p>Khám phá các sản phẩm hot nhất của GENZ Fashion ngay thôi!</p>
            <a href="#/products" class="btn btn-primary btn-lg">Mua Sắm Ngay</a>
          </div>
        </div>
      `;
    }

    const total = CartService.getTotal();
    const isFreeShip = total >= 500000;
    const shipping = isFreeShip ? 0 : 30000;
    const finalTotal = total + shipping;

    return `
      <div class="container" style="padding-top: 40px;">
        <h1 class="page-title">Giỏ Hàng Của Bạn</h1>
        <div class="cart-container">
          <div class="cart-items animate-slideUp">
            ${cart.map(item => {
              const price = item.product.salePrice || item.product.price;
              const itemTotal = price * item.quantity;
              return `
                <div class="cart-item">
                  <img src="${item.product.images?.[0] || 'https://picsum.photos/seed/genz/400/500'}" alt="${item.product.name}" class="cart-item-img">
                  <div class="cart-item-info">
                    <h3 class="cart-item-name"><a href="#/product/${item.product.id}">${item.product.name}</a></h3>
                    <div class="cart-item-variant">Size: ${item.size} | Màu: ${item.color}</div>
                    <div class="cart-item-price">${formatPrice(price)}</div>
                    
                    <div class="quantity-control mt-2">
                      <button class="qty-btn btn-update-qty" data-id="${item.product.id}" data-size="${item.size}" data-color="${item.color}" data-change="-1">-</button>
                      <input type="number" class="qty-input" value="${item.quantity}" readonly>
                      <button class="qty-btn btn-update-qty" data-id="${item.product.id}" data-size="${item.size}" data-color="${item.color}" data-change="1">+</button>
                    </div>
                  </div>
                  <div class="cart-item-total">${formatPrice(itemTotal)}</div>
                  <button class="cart-item-remove btn-remove-item" data-id="${item.product.id}" data-size="${item.size}" data-color="${item.color}">✕</button>
                </div>
              `;
            }).join('')}
          </div>
          
          <div class="cart-summary animate-slideUp" style="animation-delay: 0.1s">
            <div class="summary-card">
              <h3>Tổng Đơn Hàng</h3>
              <div class="summary-row">
                <span>Tạm tính</span>
                <span>${formatPrice(total)}</span>
              </div>
              <div class="summary-row">
                <span>Phí giao hàng</span>
                ${isFreeShip ? '<span class="free-ship">Miễn phí</span>' : `<span>${formatPrice(shipping)}</span>`}
              </div>
              ${!isFreeShip ? `
                <div class="summary-row" style="font-size:13px; color:var(--primary); margin-top:-8px;">
                  Mua thêm ${formatPrice(500000 - total)} để được Freeship!
                </div>
              ` : ''}
              
              <div class="summary-divider"></div>
              
              <div class="summary-row summary-total">
                <span>Tổng cộng</span>
                <span style="color:var(--primary)">${formatPrice(finalTotal)}</span>
              </div>
              
              <button class="btn btn-primary btn-block btn-lg" id="checkout-btn">Tiến Hành Thanh Toán</button>
              <a href="#/products" class="btn btn-secondary btn-block mt-2" style="text-align:center">Tiếp Tục Mua Sắm</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
