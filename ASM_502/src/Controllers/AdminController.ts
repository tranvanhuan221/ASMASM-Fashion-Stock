/**
 * AdminController.ts
 * Phân quyền: admin + superadmin được vào trang quản trị
 * Chỉ superadmin mới xóa được tài khoản admin khác
 */

import { AdminView } from '../Views/AdminView.js';
import { LayoutView } from '../Views/LayoutView.js';
import { AuthService } from '../Services/AuthService.js';
import { productService } from '../Services/ProductService.js';
import { categoryService } from '../Services/CategoryService.js';
import { orderService } from '../Services/OrderService.js';
import { userService } from '../Services/UserService.js';
import { Product } from '../Models/Product.js';
import { Category } from '../Models/Category.js';
import { Order } from '../Models/Order.js';
import { showToast } from '../Utils/helpers.js';
import { fetchApi } from '../Utils/fetchApi.js';

export class AdminController {

  /** Kiểm tra quyền admin/superadmin */
  static async checkAuth(): Promise<boolean> {
    if (!AuthService.isAdmin()) {
      showToast('Bạn không có quyền truy cập trang quản trị', 'error');
      window.location.hash = '#/';
      return false;
    }
    return true;
  }

  // ─── Dashboard ────────────────────────────────────────────────────────────
  static async renderDashboard(appElement: HTMLElement): Promise<void> {
    if (!await this.checkAuth()) return;

    try {
      const [products, orders, usersData] = await Promise.all([
        productService.getAll(),
        orderService.getAll(),
        userService.getAll()
      ]);

      const stats = {
        products: products.length,
        orders:   orders.length,
        revenue:  orders.reduce((sum, o: any) => sum + (o.total || 0), 0),
        users:    usersData.length
      };

      appElement.innerHTML = LayoutView.render(AdminView.renderDashboard(stats), true);
      LayoutView.bindEvents();
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes('403')) {
        showToast('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại', 'error');
        window.location.hash = '#/login';
      }
    }
  }

  // ─── Products ─────────────────────────────────────────────────────────────
  static async renderProducts(appElement: HTMLElement): Promise<void> {
    if (!await this.checkAuth()) return;

    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      const products   = productsData.map(p => new Product(p));
      const categories = categoriesData.map(c => new Category(c));

      appElement.innerHTML = LayoutView.render(AdminView.renderProducts(products, categories), true);
      LayoutView.bindEvents();
      this.bindProductEvents(appElement, products, categories);
    } catch (error) { console.error(error); }
  }

  // ─── Categories ───────────────────────────────────────────────────────────
  static async renderCategories(appElement: HTMLElement): Promise<void> {
    if (!await this.checkAuth()) return;

    try {
      const [categoriesData, productsData] = await Promise.all([
        categoryService.getAll(),
        productService.getAll()
      ]);
      const categories = categoriesData.map(c => new Category(c));
      const products = productsData.map(p => new Product(p));

      appElement.innerHTML = LayoutView.render(AdminView.renderCategories(categories, products), true);
      LayoutView.bindEvents();

      const modal = document.getElementById('category-modal');
      const form = document.getElementById('category-form') as HTMLFormElement;
      const title = document.getElementById('cat-modal-title');

      const openModal = (category?: Category) => {
        if (!modal) return;
        modal.style.display = 'flex';
        if (title) title.textContent = category ? 'Sửa Danh Mục' : 'Thêm Danh Mục';

        if (category) {
          (document.getElementById('c-id') as HTMLInputElement).value = String(category.id);
          (document.getElementById('c-name') as HTMLInputElement).value = category.name;
          (document.getElementById('c-icon') as HTMLInputElement).value = category.icon;
          (document.getElementById('c-parent') as HTMLSelectElement).value = category.parentId ? String(category.parentId) : '';
        } else {
          form?.reset();
          (document.getElementById('c-id') as HTMLInputElement).value = '';
        }
      };

      const closeModal = () => { if (modal) modal.style.display = 'none'; };

      document.getElementById('btn-add-category')?.addEventListener('click', () => openModal());
      document.getElementById('btn-cancel-cat-modal')?.addEventListener('click', closeModal);

      form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = (document.getElementById('c-id') as HTMLInputElement).value;
        const name = (document.getElementById('c-name') as HTMLInputElement).value;
        const icon = (document.getElementById('c-icon') as HTMLInputElement).value || '📌';
        const parentId = (document.getElementById('c-parent') as HTMLSelectElement).value || null;

        const data: any = { name, icon, parentId };

        try {
          if (id) {
            await categoryService.update(id, data);
            showToast('Cập nhật thành công');
          } else {
            await categoryService.create(data);
            showToast('Thêm danh mục thành công');
          }
          closeModal();
          this.renderCategories(appElement);
        } catch (error: any) {
          showToast(error.message || 'Lỗi khi lưu danh mục', 'error');
        }
      });

      document.querySelectorAll('.btn-edit-category').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idStr = (e.currentTarget as HTMLElement).dataset.id || '0';
          const cat = categories.find(c => String(c.id) === idStr);
          if (cat) openModal(cat);
        });
      });

      document.querySelectorAll('.btn-delete-category').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          if (confirm('Xóa danh mục này?')) {
            const id = (e.currentTarget as HTMLElement).dataset.id || '0';
            try {
              await categoryService.delete(id);
              showToast('Xóa thành công');
              this.renderCategories(appElement);
            } catch (error: any) {
              showToast(error.message || 'Lỗi khi xóa', 'error');
            }
          }
        });
      });
    } catch (error) { console.error(error); }
  }

  // ─── Orders ───────────────────────────────────────────────────────────────
  static async renderOrders(appElement: HTMLElement): Promise<void> {
    if (!await this.checkAuth()) return;

    try {
      const ordersData = await orderService.getAll();
      const orders = ordersData.map(o => new Order(o));

      appElement.innerHTML = LayoutView.render(AdminView.renderOrders(orders), true);
      LayoutView.bindEvents();

      document.querySelectorAll('.update-order-status').forEach(select => {
        select.addEventListener('change', async (e) => {
          const target = e.currentTarget as HTMLSelectElement;
          const id = target.dataset.id || '0';
          try {
            const order = orders.find(o => String(o.id) === id);
            const updateData: any = { status: target.value };
            
            // Tự động cập nhật paymentStatus theo status
            if (target.value === 'delivered' || target.value === 'completed') {
              if (order && order.paymentStatus === 'unpaid') {
                updateData.paymentStatus = 'paid';
              }
            } else if (target.value === 'cancelled' || target.value === 'returned') {
              if (order && order.paymentStatus === 'paid') {
                updateData.paymentStatus = 'refunded';
              }
            }

            await orderService.update(id, updateData);
            showToast('Cập nhật trạng thái thành công', 'success');
            this.renderOrders(appElement);
          } catch (err: any) {
            showToast(err.message || 'Lỗi cập nhật', 'error');
          }
        });
      });

      document.querySelectorAll('.btn-approve-cancel').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id || '0';
          if (confirm('Duyệt hủy đơn hàng này? Hệ thống sẽ chuyển trạng thái thành Đã hủy.')) {
            try {
              const order = orders.find(o => String(o.id) === id);
              const updateData: any = { status: 'cancelled', cancelRequested: false };
              if (order && order.paymentStatus === 'paid') {
                updateData.paymentStatus = 'refunded';
              }
              await orderService.update(id, updateData);
              showToast('Đã duyệt yêu cầu hủy', 'success');
              this.renderOrders(appElement);
            } catch (err: any) {
              showToast(err.message || 'Lỗi duyệt', 'error');
            }
          }
        });
      });

      document.querySelectorAll('.btn-deny-cancel').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id || '0';
          if (confirm('Từ chối yêu cầu hủy đơn này? Đơn hàng sẽ tiếp tục giao.')) {
            try {
              await orderService.update(id, { cancelRequested: false, cancelReason: '' } as any);
              showToast('Đã từ chối yêu cầu hủy', 'success');
              this.renderOrders(appElement);
            } catch (err: any) {
              showToast(err.message || 'Lỗi', 'error');
            }
          }
        });
      });



      // Approve return
      document.querySelectorAll('.btn-approve-return').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id || '0';
          if (confirm('Duyệt yêu cầu hoàn hàng? Đơn sẽ chuyển sang Đã hoàn trả.')) {
            try {
              const order = orders.find(o => String(o.id) === id);
              const updateData: any = { 
                returnStatus: 'approved', 
                status: 'returned'
              };
              if (order && order.paymentStatus === 'paid') {
                updateData.paymentStatus = 'refunded';
              }
              await orderService.update(id, updateData);
              showToast('Đã duyệt hoàn hàng', 'success');
              this.renderOrders(appElement);
            } catch (err: any) {
              showToast(err.message || 'Lỗi duyệt', 'error');
            }
          }
        });
      });

      // Deny return
      document.querySelectorAll('.btn-deny-return').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id || '0';
          if (confirm('Từ chối yêu cầu hoàn hàng?')) {
            try {
              await orderService.update(id, { returnStatus: 'rejected', returnRequested: false, returnReason: '' } as any);
              showToast('Đã từ chối hoàn hàng', 'success');
              this.renderOrders(appElement);
            } catch (err: any) {
              showToast(err.message || 'Lỗi từ chối', 'error');
            }
          }
        });
      });

      // Nút xóa đơn hàng (admin)
      document.querySelectorAll('.btn-delete-order').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id || '0';
          if (confirm(`Xóa đơn hàng #${id}?`)) {
            try {
              await orderService.delete(id);
              showToast('Đã xóa đơn hàng', 'success');
              this.renderOrders(appElement);
            } catch (err: any) {
              showToast(err.message || 'Lỗi xóa đơn', 'error');
            }
          }
        });
      });

      // Xem chi tiết đơn hàng
      document.querySelectorAll('.btn-view-order-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id;
          const order = orders.find(o => String(o.id) === id);
          if (!order) return;
          
          const modal = document.getElementById('order-details-modal');
          const content = document.getElementById('order-modal-content');
          if (!modal || !content) return;

          const paymentMap: Record<string, string> = {
            cod:  'Thanh toán khi nhận hàng',
            bank: 'Chuyển khoản ngân hàng',
            momo: 'Ví MoMo',
            vnpay: 'VNPay'
          };
          const pmLabel = paymentMap[order.paymentMethod] || 'COD';
          const receivedDate = order.receivedAt 
            ? new Date(order.receivedAt).toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
            : 'Chưa nhận hàng';

          content.innerHTML = `
            <div style="margin-bottom:16px; padding:12px; background:#f0f9ff; border-radius:6px; border:1px solid #bae6fd;">
              <div style="display:flex; flex-wrap:wrap; gap:16px; font-size:13px; color:#0369a1;">
                <div><strong>Ngày đặt:</strong> ${order.formattedDate}</div>
                <div><strong>Ngày nhận:</strong> ${receivedDate}</div>
                <div><strong>Phương thức TT:</strong> ${pmLabel}</div>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <h4 style="margin:0 0 8px; font-size:14px; color:#333;">Thông tin khách hàng</h4>
              <div style="font-size:13px; color:#555; line-height:1.5;">
                <div><strong>Họ tên:</strong> ${order.customerName}</div>
                <div><strong>Số điện thoại:</strong> ${order.customerPhone}</div>
                <div><strong>Địa chỉ:</strong> ${order.customerAddress}</div>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <h4 style="margin:0 0 8px; font-size:14px; color:#333;">Sản phẩm (${order.items.length})</h4>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${order.items.map((item: any) => `
                  <div style="display:flex; gap:12px; border:1px solid #eee; padding:8px; border-radius:4px;">
                    <img src="${item.img}" alt="${item.productName}" style="width:60px; height:60px; object-fit:cover; border-radius:4px;">
                    <div style="flex:1;">
                      <div style="font-weight:600; font-size:13px;">${item.productName}</div>
                      <div style="font-size:12px; color:#666; margin-top:4px;">Phân loại: ${item.color || ''} - ${item.size || ''}</div>
                      <div style="font-size:12px; color:#666; display:flex; justify-content:space-between; margin-top:4px;">
                        <span>SL: ${item.quantity}</span>
                        <span style="font-weight:600; color:var(--primary);">${(item.price * item.quantity).toLocaleString('vi-VN')} ₫</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div style="border-top:1px dashed #ccc; padding-top:12px; display:flex; justify-content:space-between; font-weight:bold; font-size:15px;">
              <span>Tổng cộng:</span>
              <span style="color:var(--primary);">${order.formattedTotal}</span>
            </div>
          `;
          modal.style.display = 'flex';
        });
      });

      const closeModalBtn = document.getElementById('close-order-modal');
      const orderModal = document.getElementById('order-details-modal');
      if (closeModalBtn && orderModal) {
        closeModalBtn.addEventListener('click', () => { orderModal.style.display = 'none'; });
        orderModal.addEventListener('click', (e) => {
          if (e.target === orderModal) orderModal.style.display = 'none';
        });
      }

    } catch (error) { console.error(error); }
  }

  // ─── Users (chỉ admin+) ────────────────────────────────────────────────────
  static async renderUsers(appElement: HTMLElement): Promise<void> {
    if (!await this.checkAuth()) return;

    try {
      const usersData = await userService.getAll();
      const currentUser = AuthService.getCurrentUser();
      const isManagerAdmin = AuthService.isManagerAdmin();

      appElement.innerHTML = LayoutView.render(`
        <div class="admin-section">
          <div class="admin-section-header">
            <h2 class="admin-section-title">👥 Users</h2>
            <div style="font-size:13px; color:var(--text-secondary);">
              ${isManagerAdmin
                ? '🔑 <strong>Admin quản lý</strong> — có thể xóa tài khoản Nhân viên (Khách hàng không thể bị xóa)'
                : '🔒 Nhân viên — không có quyền xóa tài khoản'}
            </div>
          </div>
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Phân quyền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                ${usersData.map((u: any) => {
                  const isMe = u.id === currentUser?.id;
                  const isUserTarget = u.role === 'user';
                  const isStaffTarget = u.role === 'staff';
                  
                  // Chỉ admin mới có quyền xóa staff. Khách hàng không ai xóa được.
                  const canDelete = isManagerAdmin && isStaffTarget && !isMe;

                  const roleBadgeMap: Record<string, string> = {
                    admin: '<span style="background:#7c3aed; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:700;">Admin quản lý</span>',
                    staff: '<span style="background:#2563eb; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:700;">Nhân viên</span>',
                    user: '<span style="background:#16a34a; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:700;">Khách hàng</span>'
                  };
                  const roleBadge = roleBadgeMap[u.role] || u.role;

                  return `
                    <tr>
                      <td>${u.id}</td>
                      <td>
                        <div style="font-weight:500;">${u.name}</div>
                        ${isMe ? '<div style="font-size:11px; color:#d97706;">(Tài khoản của bạn)</div>' : ''}
                      </td>
                      <td style="color:var(--text-secondary);">${u.email}</td>
                      <td>${roleBadge}</td>
                      <td>
                        ${canDelete
                          ? `<button class="btn-delete-user" data-id="${u.id}" data-name="${u.name}"
                              style="background:#ef4444; color:#fff; border:none; padding:6px 14px; border-radius:8px; font-size:12px; cursor:pointer; font-family:inherit; font-weight:600;">
                              🗑️ Xóa
                            </button>`
                          : `<span style="font-size:12px; color:#9ca3af;">—</span>`
                        }
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `, true);
      LayoutView.bindEvents();

      // Bind nút xóa user
      document.querySelectorAll('.btn-delete-user').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const target = e.currentTarget as HTMLElement;
          const id   = target.dataset.id || '';
          const name = target.dataset.name || '';

          if (!confirm(`Xóa tài khoản "${name}"?\nThao tác này không thể hoàn tác.`)) return;

          try {
            await fetchApi(`/api/users/${id}`, { method: 'DELETE' });
            showToast(`Đã xóa tài khoản ${name}`, 'success');
            this.renderUsers(appElement);
          } catch (err: any) {
            showToast(err.message || 'Lỗi khi xóa người dùng', 'error');
          }
        });
      });
    } catch (error: any) {
      console.error(error);
      showToast(error.message || 'Lỗi tải danh sách người dùng', 'error');
    }
  }

  // ─── Product CRUD events ──────────────────────────────────────────────────
  private static bindProductEvents(appElement: HTMLElement, products: Product[], categories: Category[]): void {
    const modal    = document.getElementById('product-modal');
    const btnAdd   = document.getElementById('btn-add-product');
    const btnClose = document.getElementById('btn-close-modal');
    const btnCancel = document.getElementById('btn-cancel-modal');
    const btnSave  = document.getElementById('btn-save-product');
    const form     = document.getElementById('product-form') as HTMLFormElement;

    const imgInput = document.getElementById('p-img') as HTMLInputElement;
    const imgUpload = document.getElementById('p-img-upload') as HTMLInputElement;
    const imgPreview = document.getElementById('p-img-preview') as HTMLImageElement;

    imgUpload?.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const b64 = ev.target?.result as string;
          imgInput.value = b64;
          imgPreview.src = b64;
          imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });

    imgInput?.addEventListener('input', () => {
      if (imgInput.value) {
        imgPreview.src = imgInput.value;
        imgPreview.style.display = 'block';
      } else {
        imgPreview.style.display = 'none';
      }
    });

    const openModal = (product?: Product) => {
      if (!modal) return;
      modal.style.display = 'flex';
      const title = document.getElementById('modal-title');
      if (title) title.textContent = product ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm';
      if (product) {
        (document.getElementById('p-id')       as HTMLInputElement).value = String(product.id);
        (document.getElementById('p-sku')      as HTMLInputElement).value = product.sku || '';
        (document.getElementById('p-name')     as HTMLInputElement).value = product.name;
        
        const mainImg = product.images?.[0] || product.img || '';
        imgInput.value = mainImg;
        if (mainImg) {
          imgPreview.src = mainImg;
          imgPreview.style.display = 'block';
        } else {
          imgPreview.style.display = 'none';
        }
        if (imgUpload) imgUpload.value = '';

        (document.getElementById('p-price')    as HTMLInputElement).value = String(product.price);
        (document.getElementById('p-saleprice')as HTMLInputElement).value = product.salePrice ? String(product.salePrice) : '';
        (document.getElementById('p-weight')   as HTMLInputElement).value = String(product.weight || 0);
        (document.getElementById('p-sizes')    as HTMLInputElement).value = (product.sizes || []).join(',');
        (document.getElementById('p-colors')   as HTMLInputElement).value = (product.colors || []).map(c => c.name).join(',');
        (document.getElementById('p-category') as HTMLSelectElement).value = String(product.categoryId);
        (document.getElementById('p-desc')     as HTMLTextAreaElement).value = product.description;
        (document.getElementById('p-material') as HTMLInputElement).value = product.material || '';
        (document.getElementById('p-stock')    as HTMLInputElement).value = String(product.stock);
      } else {
        form?.reset();
        (document.getElementById('p-id') as HTMLInputElement).value = '';
        imgPreview.style.display = 'none';
        if (imgUpload) imgUpload.value = '';
      }
    };

    const closeModal = () => { if (modal) modal.style.display = 'none'; };

    btnAdd?.addEventListener('click', () => openModal());
    btnClose?.addEventListener('click', closeModal);
    btnCancel?.addEventListener('click', (e) => { e.preventDefault(); closeModal(); });

    btnSave?.addEventListener('click', async (e) => {
      e.preventDefault();
      if (!form?.checkValidity()) { form?.reportValidity(); return; }

      const id      = (document.getElementById('p-id') as HTMLInputElement).value;
      const mainImg = (document.getElementById('p-img') as HTMLInputElement).value;
      
      const sizeStr = (document.getElementById('p-sizes') as HTMLInputElement).value;
      const colorStr = (document.getElementById('p-colors') as HTMLInputElement).value;
      
      const pData: any = {
        name:        (document.getElementById('p-name')      as HTMLInputElement).value,
        sku:         (document.getElementById('p-sku')       as HTMLInputElement).value || 'SKU-NEW',
        images:      [mainImg],
        price:       Number((document.getElementById('p-price')     as HTMLInputElement).value),
        salePrice:   Number((document.getElementById('p-saleprice') as HTMLInputElement).value) || null,
        weight:      Number((document.getElementById('p-weight')    as HTMLInputElement).value) || 0,
        categoryId:  (document.getElementById('p-category')  as HTMLSelectElement).value, // keep string for ObjectId
        brand:       'GENZ',
        description: (document.getElementById('p-desc')    as HTMLTextAreaElement).value,
        material:    (document.getElementById('p-material') as HTMLInputElement).value,
        stock:       Number((document.getElementById('p-stock')     as HTMLInputElement).value),
        sizes:       sizeStr ? sizeStr.split(',').map(s => s.trim()) : ['S','M','L','XL'],
        colors:      colorStr ? colorStr.split(',').map(c => ({ name: c.trim(), code: '#000', image: mainImg })) : [
          { name: 'Đen',   code: '#000000', image: mainImg },
          { name: 'Trắng', code: '#ffffff', image: mainImg }
        ]
      };

      try {
        if (id) {
          await productService.update(id, pData);
          showToast('Cập nhật sản phẩm thành công');
        } else {
          await productService.create(pData);
          showToast('Thêm sản phẩm thành công');
        }
        closeModal();
        this.renderProducts(appElement);
      } catch (error: any) {
        showToast(error.message || 'Có lỗi xảy ra', 'error');
      }
    });

    document.querySelectorAll('.btn-edit-product').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id || '0';
        const product = products.find(p => String(p.id) === id);
        if (product) openModal(product);
      });
    });

    document.querySelectorAll('.btn-delete-product').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id || '0';
        if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
          try {
            await productService.delete(id);
            showToast('Xóa sản phẩm thành công');
            this.renderProducts(appElement);
          } catch (error: any) {
            showToast(error.message || 'Lỗi khi xóa sản phẩm', 'error');
          }
        }
      });
    });
  }
}
