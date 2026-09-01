import { Product } from '../Models/Product.js';
import { CartService } from '../Services/CartService.js';
import { showToast } from '../Utils/helpers.js';

export class ProductDetailView {
  static render(product: Product, relatedProducts: Product[] = [], wmsLocations: any[] = [], reviews: any[] = []): string {
    const isOutOfStock = !product.isInStock;
    const colors = product.colors && product.colors.length > 0 ? product.colors : [{name: 'Mặc định', code: '#ccc', image: product.img}];

    return `
      <div class="container" style="margin-bottom:60px;">
        <nav class="breadcrumb">
          <a href="#/">Trang chủ</a> | <a href="#/products?categoryId=${product.categoryId}">Sản phẩm</a> | ${product.name}
        </nav>
        
        <div class="product-detail-layout">
          <!-- Left: Gallery -->
          <div class="gallery-container">
            <div class="gallery-thumbnails" id="gallery-thumbnails">
              ${product.images.map((img, i) => `
                <img src="${img}" class="thumb-img ${i === 0 ? 'active' : ''}" data-index="${i}">
              `).join('')}
            </div>
            <div class="gallery-main">
              <img src="${product.img}" class="main-img" id="main-img">
            </div>
          </div>
          
          <!-- Right: Info -->
          <div class="pd-info">
            <h1 class="pd-title">${product.name}</h1>
            <div class="pd-sku">
              <span>SKU: ${product.sku}</span>
              <span style="cursor:pointer" title="Copy SKU">📋 Copy</span>
            </div>
            
            <div class="pd-price-row">
              <span class="pd-price">${product.formattedSalePrice || product.formattedPrice}</span>
              ${product.salePrice ? `<span style="text-decoration:line-through; color:var(--text-secondary)">${product.formattedPrice}</span>` : ''}
              <span class="pd-freeship">Freeship</span>
            </div>
            
            <div class="promo-banner">
              <div class="deal-text">Nhập mã DEAL100</div>
              <div style="font-weight:700; color:var(--primary)">Voucher giảm thêm tới 100K</div>
            </div>
            
            <div class="pd-section-label">Màu sắc: <span id="selected-color-name" style="font-weight:600; color:var(--text-primary)">${colors[0].name}</span></div>
            <div class="color-swatches" id="color-swatches">
              ${colors.map((c, i) => `
                <div class="color-swatch ${i === 0 ? 'active' : ''}" data-color="${c.name}">
                  <img src="${c.image}" title="${c.name}">
                </div>
              `).join('')}
            </div>
            
            <div class="pd-section-label d-flex justify-between">
              <span>Kích cỡ: <span id="selected-size-name" style="font-weight:600; color:var(--text-primary)">${product.sizes[0] || ''}</span></span>
              <a href="#" style="color:#0071e3; font-weight:500;">📏 Gợi ý tìm kích cỡ</a>
            </div>
            <div class="size-swatches" id="size-swatches">
              ${product.sizes.map((s, i) => `
                <div class="size-swatch ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</div>
              `).join('')}
            </div>
            
            <div class="pd-actions">
              <button id="add-to-cart-btn" class="btn btn-primary btn-block" ${isOutOfStock ? 'disabled' : ''}>
                ${isOutOfStock ? 'HẾT HÀNG' : 'THÊM VÀO GIỎ HÀNG'}
              </button>
              <button class="btn btn-outline btn-block">TÌM TẠI CỬA HÀNG</button>
            </div>
            
            <!-- Accordion -->
            <div class="accordion" id="pd-accordion">
              <div class="accordion-item active">
                <button class="accordion-header">Vị trí lưu kho (WMS)</button>
                <div class="accordion-content">
                  <div class="accordion-body">
                    ${wmsLocations && wmsLocations.length > 0 ? `
                      <ul style="list-style:none; padding:0; margin:0;">
                        ${wmsLocations.map(loc => `
                          <li style="padding:12px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; margin-bottom:8px;">
                            <div style="font-size:12px; color:#0369a1; margin-bottom:4px; font-weight:600;">${loc.pathStr}</div>
                            <div style="display:flex; justify-content:space-between; font-size:14px;">
                              <span>Tồn: <strong>${loc.quantity}</strong></span>
                              <span>Pallet: <strong>${loc.palletCode}</strong></span>
                            </div>
                          </li>
                        `).join('')}
                      </ul>
                    ` : '<p>Chưa có dữ liệu lưu kho cho sản phẩm này.</p>'}
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-header">Mô tả</button>
                <div class="accordion-content">
                  <div class="accordion-body">
                    <p>${product.description}</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-header">Chất liệu</button>
                <div class="accordion-content">
                  <div class="accordion-body">
                    <p>${product.material || 'Đang cập nhật thông tin chất liệu cho sản phẩm này.'}</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-header">Hướng dẫn sử dụng</button>
                <div class="accordion-content">
                  <div class="accordion-body">
                    <p>${product.instruction || 'Giặt máy ở nhiệt độ thường. Không sử dụng hóa chất tẩy có chứa clo. Phơi trong bóng mát. Sấy khô ở nhiệt độ thấp.'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="policy-list">
              <div class="policy-item">
                <div class="policy-icon">💵</div>
                <div class="policy-text">
                  <strong>Thanh toán khi nhận hàng (COD)</strong>
                  <p>Giao hàng toàn quốc.</p>
                </div>
              </div>
              <div class="policy-item">
                <div class="policy-icon">🚚</div>
                <div class="policy-text">
                  <strong>Miễn phí giao hàng</strong>
                  <p>Với đơn hàng trên 599.000 đ.</p>
                </div>
              </div>
              <div class="policy-item">
                <div class="policy-icon">🔄</div>
                <div class="policy-text">
                  <strong>Đổi hàng miễn phí</strong>
                  <p>Trong 30 ngày kể từ ngày mua.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products Section -->
      ${relatedProducts.length > 0 ? `
        <div class="container" style="margin-bottom:60px;">
          <h2 style="font-size:24px; font-weight:800; text-transform:uppercase; margin-bottom:32px; padding-bottom:16px; border-bottom:2px solid #f0f0f0;">SẢN PHẨM LIÊN QUAN</h2>
          <div class="products-grid">
            ${relatedProducts.map(p => `
              <div class="product-card" style="transition:transform 0.3s; border-radius:8px; overflow:hidden;">
                <a href="#/product/${p.id}">
                  <div class="product-img-box" style="border-radius:8px; overflow:hidden;">
                    ${p.salePrice ? `<div style="position:absolute;top:10px;left:10px;background:#dc2626;color:white;font-size:12px;font-weight:700;padding:4px 10px;z-index:1;border-radius:4px;">-${p.discountPercent}%</div>` : ''}
                    <img src="${p.img}" alt="${p.name}" class="product-img" loading="lazy">
                  </div>
                  <div class="product-info" style="padding-top:12px;">
                    <div style="font-size:11px; color:var(--text-secondary); margin-bottom:6px; text-transform:uppercase;">${p.brand}</div>
                    <h3 class="product-name" style="font-size:15px; font-weight:500;">${p.name}</h3>
                    <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
                      <span class="product-price" style="color:${p.salePrice ? '#dc2626' : 'var(--text-primary)'};">${p.formattedSalePrice || p.formattedPrice}</span>
                      ${p.salePrice ? `<span style="font-size:12px; color:var(--text-secondary); text-decoration:line-through;">${p.formattedPrice}</span>` : ''}
                    </div>
                  </div>
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- User Reviews Section -->
      <div style="background:#f9f9f9; padding:60px 0; margin-bottom:40px;">
        <div class="container">
          <h2 style="font-size:24px; font-weight:800; text-align:center; text-transform:uppercase; margin-bottom:40px;">ĐÁNH GIÁ TỪ KHÁCH HÀNG</h2>
          ${reviews.length === 0 ? `
            <div style="text-align:center; padding:40px; color:#666; font-size:15px; background:white; border-radius:8px;">
              Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên trải nghiệm và đánh giá nhé!
            </div>
          ` : `
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:24px;">
              ${reviews.map(r => `
                <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
                  <div style="color:#fbbf24; font-size:16px; margin-bottom:12px;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                  <p style="font-size:14px; color:#555; margin-bottom:16px; line-height:1.6;">"${r.comment}"</p>
                  <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:36px; height:36px; background:#e0e0e0; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; color:#555;">${r.userName.charAt(0).toUpperCase()}</div>
                      <div>
                        <div style="font-size:13px; font-weight:700;">${r.userName}</div>
                        <div style="font-size:11px; color:#16a34a; font-weight:600;">✔️ Đã mua hàng</div>
                      </div>
                    </div>
                    <div style="font-size:11px; color:#999;">${new Date(r.createdAt).toLocaleDateString('vi-VN')}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  static bindEvents(product: Product): void {
    const colors = product.colors && product.colors.length > 0 ? product.colors : [{name: 'Mặc định', code: '#ccc', image: product.img}];
    let selectedSize = product.sizes[0] || '';
    let selectedColor = colors[0]?.name || '';

    // Gallery
    const mainImg = document.getElementById('main-img') as HTMLImageElement;
    const thumbs = document.querySelectorAll('.thumb-img');
    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        if (mainImg) mainImg.src = product.images[idx];
      });
    });

    // Swatches
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const colorNameLabel = document.getElementById('selected-color-name');
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        colorSwatches.forEach(s => s.classList.remove('active'));
        const target = e.currentTarget as HTMLElement;
        target.classList.add('active');
        selectedColor = target.dataset.color || '';
        if (colorNameLabel) colorNameLabel.textContent = selectedColor;
      });
    });

    const sizeSwatches = document.querySelectorAll('.size-swatch');
    const sizeNameLabel = document.getElementById('selected-size-name');
    sizeSwatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        sizeSwatches.forEach(s => s.classList.remove('active'));
        const target = e.currentTarget as HTMLElement;
        target.classList.add('active');
        selectedSize = target.dataset.size || '';
        if (sizeNameLabel) sizeNameLabel.textContent = selectedSize;
      });
    });

    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', (e) => {
        const item = (e.currentTarget as HTMLElement).parentElement;
        if (item) item.classList.toggle('active');
      });
    });

    // Add to cart
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        CartService.addItem(product, 1, selectedSize, selectedColor);
        showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
        // Open Cart Drawer
        if ((window as any).openCartDrawer) {
          (window as any).openCartDrawer();
        }
      });
    }
  }
}
