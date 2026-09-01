/**
 * HomeController.ts - ĐIỀU KHIỂN TRANG CHỦ
 * 
 * Nhiệm vụ của file này là xử lý dữ liệu và logic cho trang chủ (đường dẫn `#/`).
 * Các bước hoạt động:
 * 1. Gọi `ProductService` và `CategoryService` để lấy danh sách sản phẩm và danh mục từ Backend.
 * 2. Lọc sản phẩm (nếu người dùng dùng bộ lọc như khoảng giá, màu sắc).
 * 3. Đưa toàn bộ dữ liệu vừa lấy được sang `HomeView` để vẽ ra giao diện HTML (hiển thị banner, danh mục, sản phẩm nổi bật).
 * 4. Gọi `HomeView.bindEvents()` để kích hoạt các sự kiện trên trang chủ (như hiệu ứng chuyển slide banner, bộ đếm ngược flash sale).
 */

import { HomeView } from '../Views/HomeView.js';
import { LayoutView } from '../Views/LayoutView.js';
import { productService } from '../Services/ProductService.js';
import { categoryService } from '../Services/CategoryService.js';
import { Product, IProduct } from '../Models/Product.js';
import { Category, ICategory } from '../Models/Category.js';
import { createSkeleton } from '../Utils/helpers.js';

export class HomeController {
  // Hàm render là hàm chính được tự động gọi khi người dùng vào trang chủ
  static async render(appElement: HTMLElement, params?: Record<string, string>): Promise<void> {
    
    // 1. Hiển thị khung tải trang (Skeleton) ngay lập tức để người dùng không phải nhìn màn hình trắng
    appElement.innerHTML = LayoutView.render(`
      <section class="container"><div class="products-grid mt-4">${createSkeleton(8)}</div></section>
    `);
    // Gắn lại các sự kiện (Click giỏ hàng, menu) cho phần Layout (Header, Footer)
    LayoutView.bindEvents();

    try {
      // 2. Trích xuất các tham số (params) từ URL (nếu người dùng đang dùng bộ lọc hoặc tìm kiếm)
      const apiParams: Record<string, string> = {};
      if (params?.categoryId) apiParams.categoryId = params.categoryId; // Lọc theo Danh mục
      if (params?.search)     apiParams.search     = params.search;     // Lọc theo Từ khóa tìm kiếm
      if (params?.sort)       apiParams.sort       = params.sort;       // Sắp xếp (giá tăng/giảm)
      if (params?.sale)       apiParams.sale       = params.sale;       // Lọc sản phẩm đang giảm giá

      // Biến kiểm tra xem người dùng có đang áp dụng bất kỳ bộ lọc nào không
      const isFiltering = Object.keys(params || {}).some(k =>
        ['categoryId', 'search', 'sort', 'sale', 'minPrice', 'maxPrice', 'color'].includes(k)
      );

      // 3. Gọi API lấy dữ liệu từ Backend. 
      // Dùng Promise.all để gọi 3 API cùng một lúc, giúp tải trang nhanh hơn gấp 3 lần.
      const [productsData, categoriesData, allProductsData] = await Promise.all([
        productService.getAll(isFiltering ? apiParams : undefined), // Lấy danh sách SP theo bộ lọc (nếu có)
        categoryService.getAll(),                                   // Lấy danh sách toàn bộ Danh mục
        productService.getAll()                                     // Lấy danh sách toàn bộ SP (để hiển thị đồ mới nhất)
      ]);

      // 4. Biến đổi dữ liệu thô (JSON) vừa lấy được thành các Đối tượng (Object) có cấu trúc an toàn
      let products      = productsData.map((p: IProduct)  => new Product(p));
      const categories  = categoriesData.map((c: ICategory) => new Category(c));
      const allProducts = allProductsData.map((p: IProduct) => new Product(p));

      // 5. Xử lý bộ lọc nâng cao ngay trên Frontend (vì Backend chưa làm chức năng lọc giá và màu)
      if (params?.minPrice) {
        // Lọc giữ lại những sản phẩm có giá thực tế (giá sale hoặc giá gốc) >= mức giá tối thiểu
        products = products.filter((p: Product) => (p.salePrice || p.price) >= Number(params.minPrice));
      }
      if (params?.maxPrice) {
        // Lọc giữ lại những sản phẩm có giá thực tế <= mức giá tối đa
        products = products.filter((p: Product) => (p.salePrice || p.price) <= Number(params.maxPrice));
      }
      if (params?.color) {
        // Lọc giữ lại những sản phẩm mà trong danh sách màu sắc của nó có chứa màu được tìm kiếm
        products = products.filter((p: Product) =>
          p.colors.some(c => c.name.toLowerCase().includes(params.color!.toLowerCase()))
        );
      }

      // 6. Vẽ giao diện chính thức
      // Nhồi dữ liệu vào HomeView.render() để tạo ra chuỗi mã HTML, sau đó nhét vào thẻ gốc <div id="app">
      appElement.innerHTML = LayoutView.render(
        HomeView.render(products, categories, allProducts, isFiltering, params)
      );
      
      // 7. Gắn các sự kiện (Javascript thuần) cho giao diện vừa được vẽ ra
      LayoutView.bindEvents(); // Sự kiện chung (Menu, Header)
      HomeView.bindEvents();   // Sự kiện riêng của trang chủ (Chuyển slide Banner)

    } catch (error) {
      // XỬ LÝ LỖI: Nếu sập server hoặc rớt mạng, chạy vào đây thay vì báo lỗi đỏ chót trên console
      console.error('HomeController error:', error);
      appElement.innerHTML = LayoutView.render(`
        <div class="container" style="padding:80px 0; text-align:center;">
          <div style="font-size:48px; margin-bottom:16px;">⚠️</div>
          <h2 style="margin-bottom:12px;">Không thể kết nối server</h2>
          <p style="color:var(--text-secondary);">Vui lòng chạy lệnh <code>npm run server</code> trước.</p>
        </div>
      `);
      LayoutView.bindEvents();
    }
  }
}

