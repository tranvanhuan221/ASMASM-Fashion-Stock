import { Product } from '../Models/Product.js';
import { Category } from '../Models/Category.js';

const BANNERS = [
  { img: '/banner1.png', alt: 'Bộ sưu tập Hè 2026' },
  { img: '/banner2.png', alt: 'Phong cách GenZ' },
  { img: '/banner3.png', alt: 'Khuyến mãi đặc biệt' }
];

const FALLBACK_CATEGORY_IMAGES: Record<string, string> = {
  'Áo thun nữ': '/ao-thun-nu1.webp',
  'Áo polo nữ': '/ao-polo-nu1.webp',
  'Áo kiểu nữ': '/ao-kieu-nu1.webp',
  'Áo chống nắng nữ': '/ao-chong-nang-nu1.webp',
  'Áo thun dài tay nữ': '/ao-thun-dai-tay-nu1.webp',
  'Áo sát nách nữ': '/ao-sat-nach-nu.webp',
  'Váy nữ': '/vay1.webp',
  'Quần shorts nữ': '/shorts1.webp',
  'Áo thun nam': '/T-shipts1.webp',
  'Quần shorts nam': '/shorts2.webp',
  'Nữ': '/aonu1.webp',
  'Nam': '/aophong.webp'
};

export class HomeView {
  static render(products: Product[], categories: Category[], allProducts: Product[], isFiltering: boolean, params?: Record<string, string>): string {
    return `
      ${this.renderBannerSlider()}
      ${this.renderTrustBar()}

      ${isFiltering ? `
        <!-- FILTER RESULTS -->
        <div class="container" id="filter-results" style="margin-top: 40px; margin-bottom: 60px;">
          <h2 style="font-size:24px; font-weight:800; margin-bottom:24px;">KẾT QUẢ TÌM KIẾM (${products.length} sản phẩm)</h2>
          <div class="products-grid">
            ${products.length > 0 ? products.map(p => this.renderProductCard(p)).join('') : '<div style="grid-column:1/-1; padding:40px; text-align:center; color:#666;">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</div>'}
          </div>
        </div>
      ` : `
        <!-- DEFAULT HOME SECTIONS -->
        ${this.renderCategoriesSection(categories)}
        ${this.renderSaleSection(allProducts.filter(p => p.isOnSale).slice(0, 8))}
        ${this.renderNewArrivals(allProducts.slice().reverse().slice(0, 8))}
        ${this.renderPromoBanner()}
        ${this.renderStyleCategories(categories)}
        ${this.renderWholesaleCTA()}
        ${this.renderAppDownload()}
      `}
    `;
  }

  /* ===== 1. HERO BANNER SLIDER ===== */
  static renderBannerSlider(): string {
    return `
      <div class="hero-slider" id="banner-slider">
        <div class="hero-slider-track" id="slider-track">
          ${BANNERS.map(b => `
            <div class="hero-slide">
              <img src="${b.img}" alt="${b.alt}" loading="eager">
            </div>
          `).join('')}
        </div>
        <button class="slider-nav-btn prev" id="slider-prev">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button class="slider-nav-btn next" id="slider-next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <div class="slider-dots" id="slider-dots">
          ${BANNERS.map((_, i) => `<button class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`).join('')}
        </div>
      </div>
    `;
  }

  /* ===== TRUST / FEATURES BAR ===== */
  static renderTrustBar(): string {
    const badges = [
      { icon: '🚚', title: 'Miễn phí vận chuyển', desc: 'Đơn từ 499K' },
      { icon: '🔄', title: 'Đổi trả miễn phí', desc: 'Trong 30 ngày' },
      { icon: '💎', title: 'Cam kết chính hãng', desc: '100% authentic' },
      { icon: '📞', title: 'Hỗ trợ 24/7', desc: 'Hotline: 1900.636.000' }
    ];

    return `
      <div style="
        background: #fff;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 18px 0;
      ">
        <div class="container" style="
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        ">
          ${badges.map(b => `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 4px;
              min-width: 160px;
            ">
              <span style="font-size: 28px; line-height: 1;">${b.icon}</span>
              <span style="font-size: 12px; font-weight: 700; color: #1a1a2e; text-transform: uppercase; letter-spacing: 0.3px;">${b.title}</span>
              <span style="font-size: 11px; color: #888;">${b.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ===== 2. CATEGORY CARDS ===== */
  static renderCategoriesSection(categories: Category[]): string {
    const parentCats = categories.filter(c => !c.parentId);
    const childCats = categories.filter(c => c.parentId);

    if (categories.length === 0) return '';

    return `
      <section class="home-section" style="padding-bottom:30px;">
        <div class="container">
          <div class="section-heading">
            <h2>DANH MỤC SẢN PHẨM</h2>
            <p>Khám phá các danh mục thời trang đa dạng</p>
          </div>

          ${parentCats.map(parent => {
            const children = childCats.filter(c => String(c.parentId) === String(parent.id));
            const parentImg = FALLBACK_CATEGORY_IMAGES[parent.name] || '/aonu1.webp';
            return `
              <div style="margin-bottom: 48px;">
                <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:24px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">
                  <h3 style="font-size:22px; font-weight:800; color:#111; text-transform:uppercase; letter-spacing:1px; margin:0;">${parent.name}</h3>
                  <a href="#/products?categoryId=${parent.id}" class="view-all-link" style="font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">Xem tất cả</a>
                </div>
                <div class="category-cards-grid">
                  ${children.length > 0 ? children.map(child => {
                    const img = FALLBACK_CATEGORY_IMAGES[child.name] || parentImg;
                    return `
                      <a href="#/products?categoryId=${child.id}" class="category-card-item">
                        <div class="category-card-image">
                          <img src="${img}" alt="${child.name}" loading="lazy">
                        </div>
                        <span class="category-card-name">${child.name}</span>
                      </a>
                    `;
                  }).join('') : `
                    <a href="#/products?categoryId=${parent.id}" class="category-card-item">
                      <div class="category-card-image">
                        <img src="${parentImg}" alt="${parent.name}" loading="lazy">
                      </div>
                      <span class="category-card-name">Tất cả ${parent.name}</span>
                    </a>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  /* ===== 3. SALE SECTION ===== */
  static renderSaleSection(products: Product[]): string {
    if (products.length === 0) return '';
    return `
      <section class="sale-section">
        <div class="container">
          <div class="sale-header">
            <div>
              <h2>🔥 KHUYẾN MÃI HOT</h2>
              <p style="font-size:14px; color:#888; margin-top:4px;">Nhanh tay kẻo hết - Số lượng có hạn!</p>
            </div>
            <div class="sale-countdown" id="sale-countdown">
              <span class="sale-countdown-label">Kết thúc sau:</span>
              <span class="sale-countdown-box" id="cd-hours">08</span>
              <span class="sale-countdown-sep">:</span>
              <span class="sale-countdown-box" id="cd-minutes">45</span>
              <span class="sale-countdown-sep">:</span>
              <span class="sale-countdown-box" id="cd-seconds">30</span>
            </div>
          </div>
          <div class="products-grid">
            ${products.map(p => this.renderProductCard(p)).join('')}
          </div>
          <div style="text-align:center; margin-top:32px;">
            <a href="#/products?sale=true" class="btn btn-primary" style="padding:12px 40px;">XEM TẤT CẢ KHUYẾN MÃI</a>
          </div>
        </div>
      </section>
    `;
  }

  /* ===== 4. NEW ARRIVALS ===== */
  static renderNewArrivals(products: Product[]): string {
    if (products.length === 0) return '';
    return `
      <section class="home-section">
        <div class="container">
          <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:28px; border-bottom:2px solid #f0f0f0; padding-bottom:16px;">
            <div>
              <h2 style="font-size:26px; font-weight:800; color:#1a1a2e; text-transform:uppercase; letter-spacing:0.5px;">SẢN PHẨM MỚI</h2>
              <p style="font-size:13px; color:#888; margin-top:4px;">Cập nhật xu hướng thời trang mới nhất</p>
            </div>
            <a href="#/products" class="view-all-link">
              Xem tất cả
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>
          <div class="products-grid">
            ${products.map(p => this.renderProductCard(p)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /* ===== 5. PROMOTIONAL BANNER ===== */
  static renderPromoBanner(): string {
    return `
      <section class="promo-full-banner" style="margin:20px 0;">
        <a href="#/products">
          <img src="/spmoi_cate_desktop-banner.webp" alt="Sản phẩm mới - GENZ Fashion" loading="lazy">
        </a>
      </section>
    `;
  }

  /* ===== 6. STYLE CATEGORIES (GENDER) ===== */
  static renderStyleCategories(categories: Category[]): string {
    const parentCats = categories.filter(c => !c.parentId);
    const nuCat = parentCats.find(c => c.name.toLowerCase().includes('nữ'));
    const namCat = parentCats.find(c => c.name.toLowerCase().includes('nam'));

    return `
      <section class="home-section" style="padding-top:40px;">
        <div class="container">
          <div class="style-categories">
            <a href="#/products?categoryId=${nuCat ? nuCat.id : ''}" class="style-category-card">
              <img src="/banner-nu.webp" alt="Thời trang Nữ" loading="lazy">
              <div class="style-category-overlay">
                <h3>Thời Trang Nữ</h3>
                <span>Khám phá ngay <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg></span>
              </div>
            </a>
            <a href="#/products?categoryId=${namCat ? namCat.id : ''}" class="style-category-card">
              <img src="/banner-nam.webp" alt="Thời trang Nam" loading="lazy">
              <div class="style-category-overlay">
                <h3>Thời Trang Nam</h3>
                <span>Khám phá ngay <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg></span>
              </div>
            </a>
          </div>
        </div>
      </section>
    `;
  }

  /* ===== WHOLESALE CTA SECTION ===== */
  static renderWholesaleCTA(): string {
    const benefits = [
      { icon: '📦', text: 'MOQ chỉ từ 50 sản phẩm' },
      { icon: '💰', text: 'Giá cạnh tranh nhất thị trường' },
      { icon: '🤝', text: 'Hỗ trợ tư vấn 1-1' }
    ];

    return `
      <section style="
        background: linear-gradient(135deg, #1a1a2e 0%, #333f48 100%);
        padding: 60px 0;
        margin: 20px 0 0;
      ">
        <div class="container" style="
          display: flex;
          align-items: center;
          gap: 48px;
          flex-wrap: wrap;
        ">
          <!-- Left column -->
          <div style="flex: 1; min-width: 300px;">
            <h2 style="
              font-size: 30px;
              font-weight: 900;
              color: #fff;
              text-transform: uppercase;
              letter-spacing: 1px;
              line-height: 1.3;
              margin: 0 0 16px;
            ">ĐẶT HÀNG SỈ - CHIẾT KHẤU LÊN ĐẾN 40%</h2>
            <p style="
              font-size: 15px;
              color: rgba(255,255,255,0.8);
              line-height: 1.7;
              margin: 0 0 28px;
            ">Chương trình đặt sỉ dành cho các chủ shop, đại lý và doanh nghiệp. Nhận ngay mức chiết khấu hấp dẫn cùng chính sách hỗ trợ toàn diện từ GENZ Fashion.</p>
            <a href="#/contact" style="
              display: inline-block;
              background: #fff;
              color: #1a1a2e;
              font-size: 14px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              padding: 14px 36px;
              border-radius: 4px;
              text-decoration: none;
              transition: opacity 0.2s;
            ">LIÊN HỆ ĐẶT SỈ NGAY</a>
          </div>

          <!-- Right column -->
          <div style="flex: 0 0 auto; min-width: 280px;">
            ${benefits.map(b => `
              <div style="
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 24px;
              ">
                <span style="
                  font-size: 32px;
                  line-height: 1;
                  flex-shrink: 0;
                ">${b.icon}</span>
                <span style="
                  font-size: 15px;
                  font-weight: 600;
                  color: #fff;
                  letter-spacing: 0.3px;
                ">${b.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /* ===== 7. APP DOWNLOAD ===== */
  static renderAppDownload(): string {
    return `
      <section class="app-download-section">
        <div class="container">
          <div class="app-download-inner">
            <div class="app-download-image">
              <img src="/khamphatienich.webp" alt="GENZ App" loading="lazy">
            </div>
            <div class="app-download-content">
              <h2>KHÁM PHÁ TIỆN ÍCH TẠI GENZ APP</h2>
              <p>Tải ứng dụng GENZ Fashion để trải nghiệm mua sắm tiện lợi hơn với nhiều ưu đãi độc quyền chỉ có trên app.</p>
              <ul class="app-benefits">
                <li>
                  <span class="benefit-icon">🎁</span>
                  Nhận ngay voucher 50K cho đơn hàng đầu tiên
                </li>
                <li>
                  <span class="benefit-icon">🔔</span>
                  Thông báo khuyến mãi flash sale sớm nhất
                </li>
                <li>
                  <span class="benefit-icon">📦</span>
                  Theo dõi đơn hàng realtime mọi lúc mọi nơi
                </li>
                <li>
                  <span class="benefit-icon">💎</span>
                  Tích điểm thành viên - đổi quà hấp dẫn
                </li>
              </ul>
              <div class="app-qr-code">
                <img src="/QR.webp" alt="QR Code tải app">
                <div class="qr-text">
                  <strong>Quét mã QR để tải app</strong>
                  Có sẵn trên iOS & Android
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /* ===== PRODUCT CARD ===== */
  static renderProductCard(p: Product): string {
    const colors = p.colors || [];
    return `
      <div class="product-card">
        <a href="#/product/${p.id}" style="text-decoration:none; color:inherit; display:block;">
          <div class="product-img-box">
            ${p.isOnSale ? `<div class="product-discount-badge">-${p.discountPercent}%</div>` : ''}
            <img src="${p.img}" alt="${p.name}" class="product-img" loading="lazy">
          </div>
          <div class="product-info" style="padding:10px 4px 4px;">
            <h3 class="product-name">${p.name}</h3>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:15px; font-weight:700; color:${p.isOnSale ? '#da291c' : '#1a1a2e'};">${p.formattedSalePrice || p.formattedPrice}</span>
              ${p.isOnSale ? `<span style="font-size:12px; color:#bbb; text-decoration:line-through;">${p.formattedPrice}</span>` : ''}
            </div>
            ${colors.length > 0 ? `
              <div style="display:flex; gap:5px; margin-top:8px; align-items:center;">
                ${colors.slice(0, 5).map(c => {
                  const code = typeof c === 'object' ? (c as any).code : '#ccc';
                  const name = typeof c === 'object' ? (c as any).name : String(c);
                  const border = (code === '#ffffff' || code === '#FFFFFF' || code === '#fff') ? '1px solid #ddd' : '1px solid transparent';
                  return `<div title="${name}" style="width:14px; height:14px; border-radius:50%; background:${code}; border:${border}; flex-shrink:0;"></div>`;
                }).join('')}
                ${colors.length > 5 ? `<span style="font-size:11px; color:#999;">+${colors.length - 5}</span>` : ''}
              </div>
            ` : ''}
          </div>
        </a>
      </div>
    `;
  }

  /* ===== BIND EVENTS ===== */
  static bindEvents(): void {
    // Banner slider
    const track = document.getElementById('slider-track');
    const dots = document.querySelectorAll('.slider-dot');
    const totalSlides = BANNERS.length;
    let current = 0;
    let timer: ReturnType<typeof setInterval>;

    function goTo(idx: number) {
      current = ((idx % totalSlides) + totalSlides) % totalSlides;
      if (track) track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function next() { goTo(current + 1); }
    function startAuto() { clearInterval(timer); timer = setInterval(next, 5000); }

    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
    dots.forEach(d => d.addEventListener('click', () => {
      goTo(parseInt(d.getAttribute('data-index') || '0'));
      startAuto();
    }));
    startAuto();

    // Sale countdown timer
    const cdHours = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdSeconds = document.getElementById('cd-seconds');
    if (cdHours && cdMinutes && cdSeconds) {
      // Set end of day as countdown target
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      function updateCountdown() {
        const remaining = Math.max(0, endOfDay.getTime() - Date.now());
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        if (cdHours) cdHours.textContent = String(h).padStart(2, '0');
        if (cdMinutes) cdMinutes.textContent = String(m).padStart(2, '0');
        if (cdSeconds) cdSeconds.textContent = String(s).padStart(2, '0');
      }
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }

    // Home filter form (if exists)
    const form = document.getElementById('home-filter-form') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const p = new URLSearchParams();

        const catId = formData.get('categoryId') as string;
        if (catId) p.set('categoryId', catId);

        const price = formData.get('priceRange') as string;
        if (price) {
          const [min, max] = price.split('-');
          if (min) p.set('minPrice', min);
          if (max) p.set('maxPrice', max);
        }

        const color = formData.get('color') as string;
        if (color) p.set('color', color);

        const search = formData.get('search') as string;
        if (search) p.set('search', search);

        window.location.hash = `#/?${p.toString()}`;

        setTimeout(() => {
          const resultsEl = document.getElementById('filter-results');
          if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    }
  }
}
