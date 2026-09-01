import { Product } from '../Models/Product.js';
import { Category } from '../Models/Category.js';
import { Order } from '../Models/Order.js';

export class AdminView {
  static renderDashboard(stats: any): string {
    return `
      <div>
        <h2 style="font-size:24px; font-weight:700; margin-bottom:24px; color:var(--text-primary);">Tổng quan</h2>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:20px;">
          <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="color:var(--text-secondary); font-size:14px; margin-bottom:8px;">Doanh thu</div>
            <div style="font-size:28px; font-weight:700; color:var(--primary);">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.revenue)}</div>
          </div>
          <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="color:var(--text-secondary); font-size:14px; margin-bottom:8px;">Đơn hàng</div>
            <div style="font-size:28px; font-weight:700;">${stats.orders}</div>
          </div>
          <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="color:var(--text-secondary); font-size:14px; margin-bottom:8px;">Sản phẩm</div>
            <div style="font-size:28px; font-weight:700;">${stats.products}</div>
          </div>
          <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="color:var(--text-secondary); font-size:14px; margin-bottom:8px;">Khách hàng</div>
            <div style="font-size:28px; font-weight:700;">${stats.users}</div>
          </div>
        </div>
      </div>
    `;
  }

  static renderProducts(products: Product[], categories: Category[]): string {
    return `
      <div>
        <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
          <h2 style="font-size:24px; font-weight:700;">Quản lý Sản phẩm</h2>
          <button id="btn-add-product" class="btn btn-primary">+ Thêm Sản phẩm</button>
        </div>
        
        <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
              <tr>
                <th style="padding:16px;">STT</th>
                <th style="padding:16px;">Ảnh</th>
                <th style="padding:16px;">Tên SP</th>
                <th style="padding:16px;">Giá</th>
                <th style="padding:16px;">Khối lượng</th>
                <th style="padding:16px;">Kích cỡ</th>
                <th style="padding:16px;">Màu sắc</th>
                <th style="padding:16px;">Tồn kho</th>
                <th style="padding:16px;">Danh mục</th>
                <th style="padding:16px;">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${products.map((p, index) => `
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:16px;">${index + 1}</td>
                  <td style="padding:16px;"><img src="${p.img}" style="width:40px; height:50px; object-fit:cover; border-radius:4px;"></td>
                  <td style="padding:16px; font-weight:500;">${p.name}</td>
                  <td style="padding:16px; color:var(--primary); font-weight:600;">${p.formattedPrice}</td>
                  <td style="padding:16px;">${p.weight}g</td>
                  <td style="padding:16px;">${p.sizes.join(', ')}</td>
                  <td style="padding:16px;">${p.colors.map(c => c.name).join(', ')}</td>
                  <td style="padding:16px;">${p.stock}</td>
                  <td style="padding:16px;">
                    ${(() => {
                      const cat = categories.find(c => c.id === p.categoryId);
                      if (!cat) return 'Unknown';
                      if (cat.parentId) {
                        const parent = categories.find(c => c.id === cat.parentId);
                        return parent ? parent.name + ' -> ' + cat.name : cat.name;
                      }
                      return cat.name;
                    })()}
                  </td>
                  <td style="padding:16px;">
                    <button class="btn-edit-product" data-id="${p.id}" style="color:#0071e3; margin-right:12px; font-weight:bold;">Sửa</button>
                    <button class="btn-delete-product" data-id="${p.id}" style="color:var(--primary);">Xóa</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Modal -->
        <div id="product-modal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center;">
          <div style="background:white; width:600px; max-height:90vh; overflow-y:auto; border-radius:8px; padding:24px;">
            <h3 id="modal-title" style="font-size:20px; font-weight:700; margin-bottom:20px;">Thêm Sản phẩm</h3>
            <form id="product-form">
              <input type="hidden" id="p-id">
              <div class="mt-2"><label>Tên SP (*)</label><input type="text" id="p-name" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" required></div>
              <div class="mt-2"><label>SKU</label><input type="text" id="p-sku" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              <div class="mt-2"><label>Link Ảnh Chính hoặc Tải lên (*)</label>
                <div style="display:flex; gap:10px; align-items:flex-start;">
                  <div style="flex:1;">
                    <input type="url" id="p-img" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" placeholder="Nhập URL ảnh..." required>
                    <input type="file" id="p-img-upload" class="form-control mt-2" accept="image/*" style="width:100%; padding:10px; border:1px solid #ccc;">
                  </div>
                  <img id="p-img-preview" src="" style="width:80px; height:80px; object-fit:cover; border-radius:4px; border:1px solid #eee; display:none;">
                </div>
              </div>
              <div class="d-flex" style="gap:16px;">
                <div class="mt-2" style="flex:1"><label>Giá (*)</label><input type="number" id="p-price" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" required></div>
                <div class="mt-2" style="flex:1"><label>Giá Sale</label><input type="number" id="p-saleprice" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              </div>
              <div class="d-flex" style="gap:16px;">
                <div class="mt-2" style="flex:1"><label>Khối lượng (g)</label><input type="number" id="p-weight" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" value="0"></div>
                <div class="mt-2" style="flex:1"><label>Kích cỡ (Cùng phẩy, vd: S,M,L)</label><input type="text" id="p-sizes" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              </div>
              <div class="d-flex" style="gap:16px;">
                <div class="mt-2" style="flex:1"><label>Màu sắc (Cách phẩy, vd: Đỏ,Xanh)</label><input type="text" id="p-colors" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
                <div class="mt-2" style="flex:1"><label>Tồn kho (*)</label><input type="number" id="p-stock" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" value="10" required></div>
              </div>
              <div class="mt-2"><label>Danh mục (*)</label>
                <select id="p-category" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" required>
                  ${categories.map(c => {
                    const parent = c.parentId ? categories.find(p => p.id === c.parentId) : null;
                    const label = parent ? `${parent.name} -> ${c.name}` : c.name;
                    return `<option value="${c.id}">${label}</option>`;
                  }).join('')}
                </select>
              </div>
              <div class="mt-2"><label>Mô tả</label><textarea id="p-desc" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" rows="3"></textarea></div>
              <div class="mt-2"><label>Chất liệu</label><input type="text" id="p-material" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              
              <div class="d-flex justify-between mt-4">
                <button type="button" id="btn-cancel-modal" class="btn btn-outline">Hủy</button>
                <button type="submit" id="btn-save-product" class="btn btn-primary">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  static renderCategories(categories: Category[], products: Product[]): string {
    return `
      <div>
        <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
          <h2 style="font-size:24px; font-weight:700;">Quản lý Danh mục</h2>
          <button id="btn-add-category" class="btn btn-primary">+ Thêm Danh mục</button>
        </div>
        
        <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
              <tr>
                <th style="padding:16px;">STT</th>
                <th style="padding:16px;">Icon</th>
                <th style="padding:16px;">Tên Danh Mục</th>
                <th style="padding:16px;">Số lượng sản phẩm</th>
                <th style="padding:16px;">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${categories.map((c, index) => {
                const productCount = products.filter(p => p.categoryId === c.id || (categories.find(child => child.id === p.categoryId)?.parentId === c.id)).length;
                return `
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:16px;">${index + 1}</td>
                  <td style="padding:16px;">${c.icon}</td>
                  <td style="padding:16px;">
                    ${(() => {
                      if (c.parentId) {
                        const parent = categories.find(p => p.id === c.parentId);
                        return parent ? `<span style="color:#666;">${parent.name}</span> <span style="margin:0 8px;">&rarr;</span> <b>${c.name}</b>` : c.name;
                      }
                      return `<b>${c.name}</b>`;
                    })()}
                  </td>
                  <td style="padding:16px;">${productCount} sản phẩm</td>
                  <td style="padding:16px;">
                    <button class="btn-edit-category" data-id="${c.id}" style="color:#0071e3; margin-right:12px; font-weight:bold;">Sửa</button>
                    <button class="btn-delete-category" data-id="${c.id}" style="color:var(--primary);">Xóa</button>
                  </td>
                </tr>
              `;}).join('')}
            </tbody>
          </table>
        </div>

        <!-- Modal cho Danh mục -->
        <div id="category-modal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center;">
          <div style="background:white; width:500px; border-radius:8px; padding:24px;">
            <h3 id="cat-modal-title" style="font-size:20px; font-weight:700; margin-bottom:20px;">Thêm Danh Mục</h3>
            <form id="category-form">
              <input type="hidden" id="c-id">
              <div class="mt-2"><label>Tên Danh mục (*)</label><input type="text" id="c-name" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" required></div>
              <div class="mt-2"><label>Icon (Mặc định 📌)</label><input type="text" id="c-icon" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              <div class="mt-2"><label>Danh mục cha (Tùy chọn)</label>
                <select id="c-parent" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;">
                  <option value="">-- Không có (Danh mục gốc) --</option>
                  ${categories.filter(cat => !cat.parentId).map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
                </select>
              </div>
              <div class="d-flex justify-between mt-4">
                <button type="button" id="btn-cancel-cat-modal" class="btn btn-outline">Hủy</button>
                <button type="submit" id="btn-save-category" class="btn btn-primary">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  static renderOrders(orders: Order[]): string {
    return `
      <div>
        <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
          <h2 style="font-size:24px; font-weight:700;">Quản lý Đơn hàng</h2>
        </div>
        
        <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
              <tr>
                <th style="padding:16px;">Mã ĐH</th>
                <th style="padding:16px;">Khách hàng</th>
                <th style="padding:16px;">Ngày đặt</th>
                <th style="padding:16px;">Tổng tiền</th>
                <th style="padding:16px;">Trạng thái</th>
                <th style="padding:16px;">Thanh toán</th>
                <th style="padding:16px;">Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr style="border-bottom:1px solid var(--border); ${o.cancelRequested ? 'background:#fefce8;' : ''}">
                  <td style="padding:16px;">
                    <div style="font-weight:600; color:var(--text);">${String(o.id).substring(0, 8)}...</div>
                    ${o.cancelRequested ? '<div style="margin-top:4px;"><span style="background:#fef08a; color:#854d0e; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold;">⚠️ Yêu cầu hủy</span></div>' : ''}
                    <button class="btn-view-order-details" data-id="${o.id}" style="margin-top:8px; background:transparent; border:1px solid var(--primary); color:var(--primary); padding:2px 6px; border-radius:4px; font-size:11px; cursor:pointer;">Xem chi tiết</button>
                  </td>
                  <td style="padding:16px;">
                    <div style="font-weight:500;">${o.customerName}</div>
                    <div style="font-size:12px; color:var(--text-secondary);">${o.customerPhone}</div>
                  </td>
                  <td style="padding:16px;">${o.formattedDate}</td>
                  <td style="padding:16px; font-weight:600; color:var(--primary);">${o.formattedTotal}</td>
                  <td style="padding:16px;">
                    <span style="background:${o.statusColor}; color:white; padding:4px 8px; border-radius:4px; font-size:12px;">${o.statusLabel}</span>
                    ${o.cancelRequested && o.cancelReason ? `<div style="font-size:11px; color:#b45309; margin-top:4px;">Lý do hủy: ${o.cancelReason}</div>` : ''}
                    ${o.returnRequested ? `<div style="font-size:11px; color:#d97706; margin-top:4px; font-weight:600;">Lý do hoàn: ${o.returnReason}</div>` : ''}
                  </td>
                  <td style="padding:16px;">
                    <div style="font-size:12px; font-weight:600; padding:4px 8px; border-radius:4px; display:inline-block; border:1px solid ${o.paymentStatus === 'paid' || o.paymentStatus === 'refunded' ? '#16a34a' : '#d97706'}; color:${o.paymentStatus === 'paid' || o.paymentStatus === 'refunded' ? '#16a34a' : '#d97706'}; background:${o.paymentStatus === 'paid' || o.paymentStatus === 'refunded' ? '#f0fdf4' : '#fffbeb'};">
                      ${o.paymentStatus === 'paid' ? 'Đã TT' : o.paymentStatus === 'refunded' ? 'Đã hoàn tiền' : o.paymentStatus === 'refund_requested' ? 'Yêu cầu hoàn' : 'Chưa TT'}
                    </div>
                  </td>
                  <td style="padding:16px;">
                    ${o.cancelRequested ? `
                      <div style="display:flex; gap:8px;">
                        <button class="btn-approve-cancel" data-id="${o.id}" style="background:#ef4444; color:#fff; border:none; padding:4px 8px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold;">Duyệt hủy</button>
                        <button class="btn-deny-cancel" data-id="${o.id}" style="background:#e5e7eb; color:#374151; border:none; padding:4px 8px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold;">Từ chối</button>
                      </div>
                    ` : o.returnRequested && o.returnStatus === 'pending' ? `
                      <div style="display:flex; gap:8px;">
                        <button class="btn-approve-return" data-id="${o.id}" style="background:#f59e0b; color:#fff; border:none; padding:4px 8px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold;">Duyệt Hoàn</button>
                        <button class="btn-deny-return" data-id="${o.id}" style="background:#e5e7eb; color:#374151; border:none; padding:4px 8px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold;">Từ chối</button>
                      </div>
                    ` : `
                    <select class="form-control update-order-status" data-id="${o.id}" style="padding:4px; border:1px solid var(--border);">
                      <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Chờ xác nhận</option>
                      <option value="confirmed" ${o.status === 'confirmed' ? 'selected' : ''}>Đã xác nhận</option>
                      <option value="shipping" ${o.status === 'shipping' ? 'selected' : ''}>Đang giao hàng</option>
                      <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Đã giao</option>
                      <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>Hoàn thành</option>
                      <option value="returned" ${o.status === 'returned' ? 'selected' : ''}>Đã hoàn trả</option>
                      <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
                    </select>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Order Details Modal -->
      <div id="order-details-modal" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:9999; align-items:center; justify-content:center;">
        <div style="background:#fff; width:90%; max-width:600px; border-radius:8px; overflow:hidden; display:flex; flex-direction:column; max-height:90vh;">
          <div style="padding:16px 20px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; background:#f8fafc;">
            <h3 style="margin:0; font-size:16px; color:#1e293b;">Chi tiết đơn hàng</h3>
            <button id="close-order-modal" style="background:none; border:none; font-size:20px; cursor:pointer; color:#64748b;">&times;</button>
          </div>
          <div id="order-modal-content" style="padding:20px; overflow-y:auto; flex:1;">
            <!-- Render dynamic content here -->
          </div>
        </div>
      </div>
    `;
  }
}
