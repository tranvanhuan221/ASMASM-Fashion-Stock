/**
 * ProductController.ts - ĐIỀU KHIỂN TRANG SẢN PHẨM & CHI TIẾT SẢN PHẨM
 * 
 * Đây là một trong những Controller quan trọng nhất, xử lý 2 luồng chính:
 * 
 * 1. renderList(): Hiển thị danh sách sản phẩm (Trang cửa hàng)
 *    - Gọi API lấy danh sách toàn bộ sản phẩm và danh mục.
 *    - Xử lý bộ lọc: Kích cỡ, Khoảng giá, Màu sắc, Sắp xếp (Theo giá, theo tên).
 *    - Hiển thị Sidebar với các tùy chọn lọc và khung hiển thị sản phẩm bên phải.
 *    - Tự động thay đổi URL (ví dụ: `#/products?categoryId=123&sort=price_asc`) để người dùng có thể copy link.
 * 
 * 2. renderDetail(): Hiển thị trang chi tiết của một sản phẩm
 *    - Gọi API lấy thông tin chi tiết của 1 sản phẩm dựa trên ID.
 *    - Tìm các "Sản phẩm liên quan" (cùng danh mục).
 *    - Đưa dữ liệu sang `ProductDetailView` để vẽ giao diện (hình ảnh lớn, chọn màu, chọn size, nút Thêm vào giỏ).
 */
import { ProductDetailView } from '../Views/ProductDetailView.js';
import { LayoutView } from '../Views/LayoutView.js';
import { productService } from '../Services/ProductService.js';
import { categoryService } from '../Services/CategoryService.js';
import { Product } from '../Models/Product.js';
import { Category } from '../Models/Category.js';
import { ReviewService } from '../Services/ReviewService.js';
import { createSkeleton } from '../Utils/helpers.js';

export class ProductController {
  // Hàm hiển thị trang CHI TIẾT SẢN PHẨM
  static async renderDetail(appElement: HTMLElement, params?: Record<string, string>): Promise<void> {
    // 1. Lấy ID sản phẩm từ URL (vd: #/product/123 -> id = 123)
    const productId = params?.id;
    if (!productId) return; // Nếu không có ID thì dừng luôn

    // 2. Hiển thị chữ "Đang tải" để khách biết web không bị đơ
    appElement.innerHTML = LayoutView.render(`
      <div class="container" style="padding:60px 0; text-align:center; color:var(--text-secondary)">
        <div style="font-size:32px; margin-bottom:16px;">⏳</div>Đang tải sản phẩm...
      </div>
    `);
    LayoutView.bindEvents();

    try {
      // 3. Tải các thư viện liên quan đến Kho hàng (WmsService)
      const { WmsService } = await import('../Services/WmsService.js');
      
      // 4. Gọi 3 API CÙNG LÚC (Promise.all) để tiết kiệm thời gian chờ:
      // - Lấy thông tin 1 sản phẩm
      // - Lấy toàn bộ sản phẩm (để lát nữa tìm đồ liên quan)
      // - Lấy vị trí kho hàng của sản phẩm đó
      // - Lấy danh sách đánh giá của sản phẩm đó
      const [productData, allProductsData, allCategoriesData, wmsLocations, reviews] = await Promise.all([
        productService.getById(params.id),
        productService.getAll(),
        categoryService.getAll(),
        WmsService.getProductLocations(params.id).catch(() => []), // Bắt lỗi để nếu API kho lỗi thì trang vẫn chạy bình thường
        ReviewService.getByProductId(params.id).catch(() => [])
      ]);

      // 5. Xử lý trường hợp không tìm thấy (ID sai hoặc bị xóa)
      if (!productData) {
        appElement.innerHTML = LayoutView.render(`
          <div class="container" style="padding:80px 0; text-align:center;">
            <div style="font-size:64px; margin-bottom:16px;">🔍</div>
            <h2>Không tìm thấy sản phẩm</h2>
            <a href="#/products" class="btn btn-primary" style="margin-top:24px;">Xem tất cả sản phẩm</a>
          </div>
        `);
        LayoutView.bindEvents();
        return;
      }

      // 6. Biến đổi cục JSON thành đối tượng Product xịn xò
      const product = new Product(productData);
      
      // 7. LỌC TÌM SẢN PHẨM LIÊN QUAN:
      // Tìm các sản phẩm cùng danh mục, danh mục cha, hoặc anh em cùng danh mục cha
      const currentCategory = allCategoriesData.find((c: any) => String(c.id || c._id) === String(product.categoryId));
      let validCategoryIds = [String(product.categoryId)];
      
      if (currentCategory) {
        if (currentCategory.parentId) {
          // Nếu là danh mục con -> Lấy luôn danh mục cha và các danh mục anh em
          validCategoryIds.push(String(currentCategory.parentId));
          const siblings = allCategoriesData.filter((c: any) => String(c.parentId) === String(currentCategory.parentId));
          validCategoryIds = validCategoryIds.concat(siblings.map((c: any) => String(c.id || c._id)));
        } else {
          // Nếu là danh mục cha -> Lấy luôn các danh mục con của nó
          const children = allCategoriesData.filter((c: any) => String(c.parentId) === String(currentCategory.id));
          validCategoryIds = validCategoryIds.concat(children.map((c: any) => String(c.id || c._id)));
        }
      }

      const relatedProducts = allProductsData
        .map((p: any) => new Product(p))
        .filter((p: Product) => validCategoryIds.includes(String(p.categoryId)) && String(p.id) !== String(product.id))
        .slice(0, 4);

      // 8. Đẩy dữ liệu vào View để nhả ra HTML, rồi nhét vào #app
      // Gọi view để sinh HTML (truyền thêm relatedProducts, kho và đánh giá)
      appElement.innerHTML = LayoutView.render(ProductDetailView.render(product, relatedProducts, wmsLocations, reviews));
      LayoutView.bindEvents();
      // Gắn các sự kiện đặc biệt của trang chi tiết (chọn size, màu, nút Thêm Giỏ Hàng)
      ProductDetailView.bindEvents(product);
    } catch (error) {
      // Xử lý lỗi sập server
      console.error('ProductController.renderDetail error:', error);
      appElement.innerHTML = LayoutView.render(`
        <div class="container" style="padding:80px 0; text-align:center;">
          <h2>Lỗi kết nối API. Vui lòng kiểm tra server.</h2>
        </div>
      `);
      LayoutView.bindEvents();
    }
  }

  // Hàm hiển thị TRANG DANH SÁCH (CỬA HÀNG)
  static async renderList(appElement: HTMLElement, params?: Record<string, string>): Promise<void> {
    // 1. Hiển thị khung tải trang (Skeleton) để tạo cảm giác trang mượt mà
    appElement.innerHTML = LayoutView.render(`
      <div class="container" style="padding:40px 0;">
        <div class="products-grid">${createSkeleton(8)}</div>
      </div>
    `);
    LayoutView.bindEvents();

    try {
      // 2. Chắt lọc các tham số từ URL gửi cho Backend xử lý (lọc danh mục, tìm kiếm)
      const apiParams: Record<string, string> = {};
      if (params?.categoryId) apiParams.categoryId = params.categoryId;
      if (params?.search) apiParams.search = params.search;
      if (params?.sale) apiParams.sale = params.sale;

      // 3. Gọi 2 API cùng lúc (lấy sản phẩm và lấy danh mục)
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(apiParams),
        categoryService.getAll()
      ]);

      // 4. Khởi tạo đối tượng xịn
      let products = productsData.map(p => new Product(p));
      const categories = categoriesData.map(c => new Category(c));

      // Lấy danh mục hiện tại (nếu khách đang bấm vào một danh mục cụ thể)
      const categoryId = params?.categoryId ? String(params.categoryId) : null;
      const currentCategory = categoryId ? categories.find(c => String(c.id) === categoryId) : null;
      
      // 5. LỌC NÂNG CAO TRÊN TRÌNH DUYỆT (Client-side filtering)
      // Chạy các bộ lọc mà Backend chưa được lập trình để hiểu:
      
      if (params?.size) {
        // Lọc size: Tìm những SP mà mảng sizes của nó có chứa size người dùng chọn
        products = products.filter(p => p.sizes && p.sizes.includes(params.size as string));
      }
      if (params?.color) {
        // Lọc màu: So sánh không phân biệt hoa thường
        products = products.filter(p => p.colors && p.colors.some(c => c.name.toLowerCase() === params.color?.toLowerCase()));
      }
      if (params?.minPrice) {
        // Lọc giá: Tìm SP có giá (đã sale hoặc gốc) >= minPrice
        products = products.filter(p => (p.salePrice || p.price) >= Number(params.minPrice));
      }
      if (params?.maxPrice) {
        // Lọc giá: <= maxPrice
        products = products.filter(p => (p.salePrice || p.price) <= Number(params.maxPrice));
      }
      if (params?.sort) {
        // Sắp xếp động trên FE bằng hàm Array.prototype.sort()
        if (params.sort === 'price_asc') products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        if (params.sort === 'price_desc') products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        if (params.sort === 'name_asc') products.sort((a, b) => a.name.localeCompare(b.name));
        if (params.sort === 'name_desc') products.sort((a, b) => b.name.localeCompare(a.name));
      }

      // 6. Chia danh mục làm 2 loại: Cha (không có parentId) và Con (có parentId) để vẽ menu dọc
      const parentCategories = categories.filter(c => !c.parentId);
      const childCategories = categories.filter(c => c.parentId);

      let heroBanner = '';
      let pageTitle = currentCategory?.name || 'TẤT CẢ SẢN PHẨM';
      if (params?.search) pageTitle = `KẾT QUẢ TÌM KIẾM: "${params.search}"`;
      if (params?.sale === 'true') pageTitle = '🔥 KHUYẾN MÃI HOT';

      // Category specific heroes
      if (currentCategory && currentCategory.name.toLowerCase().includes('nữ')) {
        heroBanner = `
          <div style="background:#fff0f5; padding:40px 20px; text-align:center; margin-bottom: 20px;">
            <h1 style="font-size:36px; font-weight:700; color:#d87093; margin-bottom:10px; text-transform:uppercase;">${pageTitle}</h1>
            <p style="font-size:15px; color:#555; max-width:600px; margin:0 auto;">Tự tin tỏa sáng mỗi ngày với những thiết kế tôn dáng, mềm mại và đầy quyến rũ dành riêng cho phái đẹp.</p>
          </div>
        `;
      } else if (currentCategory && currentCategory.name.toLowerCase().includes('nam')) {
        heroBanner = `
          <div style="background:#2c3e50; padding:40px 20px; text-align:center; color:white; margin-bottom: 20px;">
            <h1 style="font-size:36px; font-weight:800; margin-bottom:10px; text-transform:uppercase;">${pageTitle}</h1>
            <p style="font-size:15px; opacity:0.8; max-width:600px; margin:0 auto;">Phong cách mạnh mẽ, lịch lãm và tối giản. Khẳng định bản lĩnh đàn ông đích thực.</p>
          </div>
        `;
      } else {
        heroBanner = `
          <div style="width:100%; height:200px; background:linear-gradient(to right, #ece9e6, #ffffff); position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; margin-bottom:20px;">
            <img src="/banner2.png" style="position:absolute; width:100%; height:100%; object-fit:cover; opacity:0.3; filter:grayscale(50%);">
            <div style="position:relative; z-index:2; text-align:center;">
              <h1 style="font-size:36px; font-weight:900; color:#111; text-transform:uppercase;">${pageTitle}</h1>
            </div>
          </div>
        `;
      }

      // Sub-category strip (Canifa style)
      let subCategoryStrip = '';
      if (currentCategory) {
        let subCats: Category[] = [];
        if (!currentCategory.parentId) {
          subCats = childCategories.filter(c => String(c.parentId) === String(currentCategory.id));
        } else {
          subCats = childCategories.filter(c => String(c.parentId) === String(currentCategory.parentId));
        }

        if (subCats.length > 0) {
          subCategoryStrip = `
            <div class="sub-category-strip">
              <a href="#/products?categoryId=${currentCategory.parentId || currentCategory.id}" class="sub-category-chip ${(!currentCategory.parentId) ? 'active' : ''}">
                <div class="sub-category-chip-img">
                  <img src="${currentCategory.image || '/aonu1.webp'}" alt="Tất cả">
                </div>
                <div class="sub-category-chip-name">Tất cả</div>
              </a>
              ${subCats.map(c => `
                <a href="#/products?categoryId=${c.id}" class="sub-category-chip ${(String(c.id) === String(currentCategory.id)) ? 'active' : ''}">
                  <div class="sub-category-chip-img">
                    <img src="${c.image || '/aonu1.webp'}" alt="${c.name}">
                  </div>
                  <div class="sub-category-chip-name">${c.name}</div>
                </a>
              `).join('')}
            </div>
          `;
        }
      }

      const content = `
        ${heroBanner}
        <div class="container" style="padding-bottom: 60px;">
          
          ${subCategoryStrip}

          <!-- SHOP LAYOUT (SIDEBAR + CONTENT) -->
          <div class="shop-layout">
            <!-- SIDEBAR -->
            <aside class="shop-sidebar">
              <!-- Danh mục -->
              <div class="filter-section">
                <div class="filter-section-header" onclick="this.parentElement.classList.toggle('collapsed')">
                  <span class="filter-section-title">Danh mục sản phẩm</span>
                  <span class="filter-section-toggle">▼</span>
                </div>
                <div class="filter-section-body">
                  <ul class="filter-category-list">
                    <li><a href="#/products" class="${!categoryId ? 'active-filter' : ''}">Tất cả sản phẩm</a></li>
                    ${parentCategories.map(parent => `
                      <li class="filter-category-item">
                        <a href="#/products?categoryId=${parent.id}" class="${categoryId === String(parent.id) ? 'active-filter' : ''}" style="font-weight:700;">${parent.name}</a>
                        <ul class="filter-category-children">
                          ${childCategories.filter(c => String(c.parentId) === String(parent.id)).map(child => `
                            <li class="filter-category-item">
                              <a href="#/products?categoryId=${child.id}" class="${categoryId === String(child.id) ? 'active-filter' : ''}">- ${child.name}</a>
                            </li>
                          `).join('')}
                        </ul>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>

              <!-- Giá -->
              <div class="filter-section">
                <div class="filter-section-header" onclick="this.parentElement.classList.toggle('collapsed')">
                  <span class="filter-section-title">Khoảng Giá</span>
                  <span class="filter-section-toggle">▼</span>
                </div>
                <div class="filter-section-body">
                  <ul class="price-filter-list">
                    <li class="price-filter-option ${params?.maxPrice === '200000' ? 'active' : ''}" data-max="200000">Dưới 200,000đ</li>
                    <li class="price-filter-option ${params?.minPrice === '200000' && params?.maxPrice === '400000' ? 'active' : ''}" data-min="200000" data-max="400000">200,000đ - 400,000đ</li>
                    <li class="price-filter-option ${params?.minPrice === '400000' && params?.maxPrice === '600000' ? 'active' : ''}" data-min="400000" data-max="600000">400,000đ - 600,000đ</li>
                    <li class="price-filter-option ${params?.minPrice === '600000' ? 'active' : ''}" data-min="600000">Trên 600,000đ</li>
                  </ul>
                </div>
              </div>

              <!-- Kích cỡ -->
              <div class="filter-section">
                <div class="filter-section-header" onclick="this.parentElement.classList.toggle('collapsed')">
                  <span class="filter-section-title">Kích cỡ</span>
                  <span class="filter-section-toggle">▼</span>
                </div>
                <div class="filter-section-body">
                  <div class="size-filter-grid">
                    ${['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => `
                      <div class="size-filter-box ${params?.size === size ? 'active' : ''}" data-size="${size}">${size}</div>
                    `).join('')}
                  </div>
                </div>
              </div>

              <!-- Màu sắc -->
              <div class="filter-section">
                <div class="filter-section-header" onclick="this.parentElement.classList.toggle('collapsed')">
                  <span class="filter-section-title">Màu sắc</span>
                  <span class="filter-section-toggle">▼</span>
                </div>
                <div class="filter-section-body">
                  <div class="color-filter-grid">
                    ${[
                      {name: 'Đen', code: '#000000'}, {name: 'Trắng', code: '#ffffff'}, 
                      {name: 'Be', code: '#d2b48c'}, {name: 'Xám', code: '#6b7280'}, 
                      {name: 'Xanh navy', code: '#1e3a5f'}, {name: 'Xanh lá', code: '#22c55e'}, 
                      {name: 'Hồng', code: '#f472b6'}, {name: 'Nâu', code: '#92400e'}
                    ].map(color => `
                      <div class="color-filter-dot ${params?.color === color.name ? 'active' : ''}" data-color="${color.name}" title="${color.name}" style="background-color: ${color.code};"></div>
                    `).join('')}
                  </div>
                </div>
              </div>
              
              <button id="clear-filters-btn" class="btn btn-outline btn-block" style="margin-top:10px;">XÓA BỘ LỌC</button>
            </aside>

            <!-- MAIN CONTENT -->
            <div class="shop-content">
              <div class="sort-bar">
                <div class="result-count">Hiển thị <strong>${products.length}</strong> sản phẩm</div>
                <select id="sort-select">
                  <option value="">Sắp xếp: Mặc định</option>
                  <option value="price_asc" ${params?.sort === 'price_asc' ? 'selected' : ''}>Giá: Thấp đến Cao</option>
                  <option value="price_desc" ${params?.sort === 'price_desc' ? 'selected' : ''}>Giá: Cao đến Thấp</option>
                  <option value="name_asc" ${params?.sort === 'name_asc' ? 'selected' : ''}>Tên: A - Z</option>
                  <option value="name_desc" ${params?.sort === 'name_desc' ? 'selected' : ''}>Tên: Z - A</option>
                </select>
              </div>

              <div class="products-grid">
                ${products.map(p => this.renderProductCard(p)).join('') || `
                  <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>Không tìm thấy sản phẩm nào phù hợp</h3>
                    <p>Vui lòng thử điều chỉnh lại bộ lọc của bạn.</p>
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      `;

      appElement.innerHTML = LayoutView.render(content);
      LayoutView.bindEvents();
      this.bindListEvents(params || {});

    } catch (error) {
      console.error('ProductController.renderList error:', error);
      appElement.innerHTML = LayoutView.render(`
        <div class="container" style="padding:80px 0; text-align:center;">
          <h2>Lỗi kết nối API. Vui lòng kiểm tra server.</h2>
        </div>
      `);
      LayoutView.bindEvents();
    }
  }

  // Hàm Lắng nghe sự kiện BỘ LỌC
  private static bindListEvents(currentParams: Record<string, string>) {
    
    // Thuật toán Update URL: Hàm này lấy URL hiện tại, nhét thêm hoặc xóa bớt thông số lọc vào, 
    // sau đó đẩy lên thanh địa chỉ (window.location.hash) để tải lại trang với bộ lọc mới.
    const updateUrl = (newParams: Record<string, string>) => {
      const p = new URLSearchParams(window.location.hash.split('?')[1] || ''); // Lấy các đuôi ?size=.. hiện tại
      Object.entries(newParams).forEach(([k, v]) => {
        if (v === null || v === '') p.delete(k); // Nếu trống thì xóa khỏi URL
        else p.set(k, v);                        // Nếu có thì thay thế bằng giá trị mới
      });
      window.location.hash = `#/products?${p.toString()}`; // Gắn lại lên thanh địa chỉ
    };

    // Sự kiện thay đổi chọn Sắp xếp (Thấp -> Cao...)
    document.getElementById('sort-select')?.addEventListener('change', (e) => {
      updateUrl({ sort: (e.target as HTMLSelectElement).value });
    });

    // Sự kiện Bấm vào Lọc Giá
    document.querySelectorAll('.price-filter-option').forEach(el => {
      el.addEventListener('click', () => {
        const min = el.getAttribute('data-min') || '';
        const max = el.getAttribute('data-max') || '';
        // Nếu người ta đang bật rồi mà bấm lần nữa -> Tắt đi (Xóa min/max khỏi URL)
        if (el.classList.contains('active')) {
          updateUrl({ minPrice: '', maxPrice: '' }); 
        } else {
          updateUrl({ minPrice: min, maxPrice: max });
        }
      });
    });

    // Lọc Kích cỡ
    document.querySelectorAll('.size-filter-box').forEach(el => {
      el.addEventListener('click', () => {
        const size = el.getAttribute('data-size') || '';
        updateUrl({ size: el.classList.contains('active') ? '' : size });
      });
    });

    // Lọc Màu
    document.querySelectorAll('.color-filter-dot').forEach(el => {
      el.addEventListener('click', () => {
        const color = el.getAttribute('data-color') || '';
        updateUrl({ color: el.classList.contains('active') ? '' : color });
      });
    });

    // Nút Xóa toàn bộ bộ lọc: Xóa sạch query parameters
    document.getElementById('clear-filters-btn')?.addEventListener('click', () => {
      const p = new URLSearchParams(window.location.hash.split('?')[1] || '');
      p.delete('minPrice');
      p.delete('maxPrice');
      p.delete('size');
      p.delete('color');
      p.delete('sort');
      window.location.hash = `#/products?${p.toString()}`;
    });
  }

  private static renderProductCard(p: Product): string {
    const colors = p.colors || [];
    return `
      <div class="product-card" style="transition:transform 0.3s; border-radius:8px; overflow:hidden;">
        <a href="#/product/${p.id}" style="text-decoration:none; color:inherit;">
          <div class="product-img-box" style="border-radius:8px; overflow:hidden; position:relative;">
            ${p.isOnSale ? `<div class="product-discount-badge">-${p.discountPercent}%</div>` : ''}
            <img src="${p.img}" alt="${p.name}" class="product-img" loading="lazy">
          </div>
          <div class="product-info" style="padding-top:12px;">
            <h3 class="product-name" style="font-size:14px; font-weight:600;">${p.name}</h3>
            <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
              <span class="product-price" style="color:${p.isOnSale ? '#da291c' : 'var(--text-primary)'}; font-weight:700;">${p.formattedSalePrice || p.formattedPrice}</span>
              ${p.isOnSale ? `<span style="font-size:12px; color:var(--text-secondary); text-decoration:line-through;">${p.formattedPrice}</span>` : ''}
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
}
