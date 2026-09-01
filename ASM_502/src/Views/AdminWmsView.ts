export class AdminWmsView {
  static renderLocations(warehouses: any[]): string {
    let html = `
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Sơ đồ Kho (Vị trí vật lý)</h2>
      </div>
      <div style="background:white; border-radius:8px; padding:24px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <p style="color:var(--text-secondary); margin-bottom:16px;">Sơ đồ phân cấp: Kho Tổng > Khu Vực > Dãy/Lô > Kệ Hàng > Tầng</p>
        <ul style="list-style:none; padding-left:0;">
    `;

    if (warehouses.length === 0) {
      html += `<li>Chưa có kho nào. Hãy tạo kho đầu tiên.</li>`;
    }

    warehouses.forEach(w => {
      html += `
        <li style="margin-bottom:12px; border:1px solid var(--border); padding:16px; border-radius:8px; background:#f9fafb;">
          <div class="d-flex justify-between">
            <strong style="font-size:16px; color:var(--primary);">🏢 Kho: ${w.name} (${w.code})</strong>
          </div>
          <ul style="list-style:none; padding-left:24px; margin-top:12px;">
            ${(w.zones || []).map((z:any) => `
              <li style="margin-bottom:8px;">
                <div class="d-flex justify-between" style="background:#fff; padding:8px 12px; border:1px solid #ddd; border-radius:4px;">
                  <span>📍 Khu: ${z.name} (${z.code})</span>
                </div>
                <ul style="list-style:none; padding-left:24px; margin-top:8px;">
                  ${(z.aisles || []).map((a:any) => `
                    <li style="margin-bottom:8px;">
                      <div class="d-flex justify-between" style="background:#f0f9ff; padding:8px 12px; border:1px solid #bae6fd; border-radius:4px;">
                        <span>📏 Dãy/Lô: ${a.name} (${a.code})</span>
                      </div>
                      <ul style="list-style:none; padding-left:24px; margin-top:8px;">
                        ${(a.shelves || []).map((s:any) => `
                          <li style="margin-bottom:8px;">
                            <div class="d-flex justify-between" style="background:#fdf4ff; padding:8px 12px; border:1px solid #fbcfe8; border-radius:4px;">
                              <span>📚 Kệ: ${s.name} (${s.code})</span>
                            </div>
                            <ul style="list-style:none; padding-left:24px; margin-top:8px;">
                              ${(s.tiers || []).map((t:any) => `
                                <li style="margin-bottom:4px; padding:4px 8px; background:#fefce8; border:1px solid #fef08a; border-radius:4px; font-size:13px;">
                                  ➖ Tầng: ${t.name} (${t.code}) - Sức chứa: ${t.capacity} Pallet
                                </li>
                              `).join('')}
                            </ul>
                          </li>
                        `).join('')}
                      </ul>
                    </li>
                  `).join('')}
                </ul>
              </li>
            `).join('')}
          </ul>
        </li>
      `;
    });

    html += `</ul></div>`;
    return html;
  }

  static renderImportBatches(batches: any[]): string {
    let html = `
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Nhập Hàng (Lô & Pallet)</h2>
        <button id="btn-add-batch" class="btn btn-primary">+ Tạo Lô Nhập Mới</button>
      </div>
      <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
            <tr>
              <th style="padding:16px;">Mã Lô Nhập</th>
              <th style="padding:16px;">Ngày nhập</th>
              <th style="padding:16px;">Trạng thái</th>
              <th style="padding:16px;">Pallets</th>
            </tr>
          </thead>
          <tbody>
    `;

    batches.forEach(b => {
      const d = new Date(b.importDate).toLocaleDateString('vi-VN');
      html += `
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:16px; font-weight:bold;">${b.batchCode}</td>
          <td style="padding:16px;">${d}</td>
          <td style="padding:16px;">${b.status}</td>
          <td style="padding:16px;">
            <ul style="margin:0; padding-left:16px;">
              ${(b.pallets || []).map((p:any) => `
                <li style="font-size:13px; margin-bottom:4px;">
                  <strong>${p.palletCode}</strong> - Vị trí: ${p.tierId ? p.tierId.name : 'Chưa xếp'}<br/>
                  <span style="color:#666;">Gồm: ${(p.stockItems || []).map((i:any)=> i.product?.name + ' x' + i.quantity).join(', ')}</span>
                </li>
              `).join('')}
            </ul>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    return html;
  }

  static renderInventory(inventory: any[]): string {
    let html = `
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Bảng Tồn Kho</h2>
      </div>
      <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
            <tr>
              <th style="padding:16px; width:60px;">Ảnh</th>
              <th style="padding:16px;">Sản phẩm</th>
              <th style="padding:16px;">Tổng tồn</th>
              <th style="padding:16px;">Chi tiết vị trí lưu trữ (WMS)</th>
            </tr>
          </thead>
          <tbody>
    `;

    if (inventory.length === 0) {
      html += `<tr><td colspan="4" style="padding:32px; text-align:center; color:#888;">Kho hiện đang trống.</td></tr>`;
    }

    inventory.forEach(inv => {
      const p = inv.product;
      html += `
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:16px;"><img src="${p.img}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"></td>
          <td style="padding:16px; font-weight:500;">${p.name}<br/><span style="font-size:12px; color:#888;">SKU: ${p.sku}</span></td>
          <td style="padding:16px; font-size:18px; font-weight:700; color:var(--primary);">${inv.totalQuantity}</td>
          <td style="padding:16px;">
            <ul style="margin:0; padding-left:0; list-style:none;">
              ${inv.locations.map((loc:any) => `
                <li style="font-size:13px; margin-bottom:4px; padding:6px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:4px;">
                  <span style="color:#0369a1; font-weight:600;">${loc.pathStr}</span> <br/>
                  Pallet: <strong>${loc.palletCode}</strong> | Tồn trên Pallet: <strong style="color:red;">${loc.quantity}</strong>
                </li>
              `).join('')}
            </ul>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    return html;
  }

  static renderExports(exports: any[]): string {
    let html = `
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Lịch Sử Xuất Kho</h2>
        <button id="btn-add-export" class="btn btn-primary">+ Tạo Phiếu Xuất Kho</button>
      </div>
      <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
            <tr>
              <th style="padding:16px;">Mã Phiếu</th>
              <th style="padding:16px;">Ngày Xuất</th>
              <th style="padding:16px;">Lý do</th>
              <th style="padding:16px;">Chi tiết hàng xuất</th>
            </tr>
          </thead>
          <tbody>
    `;

    if (exports.length === 0) {
      html += `<tr><td colspan="4" style="padding:32px; text-align:center; color:#888;">Chưa có phiếu xuất nào.</td></tr>`;
    }

    exports.forEach(exp => {
      const d = new Date(exp.exportDate).toLocaleString('vi-VN');
      html += `
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:16px; font-weight:bold;">${exp.receiptCode}</td>
          <td style="padding:16px;">${d}</td>
          <td style="padding:16px;"><span style="background:#e0f2fe; color:#0369a1; padding:4px 8px; border-radius:4px; font-size:12px;">${exp.reason}</span></td>
          <td style="padding:16px;">
            <ul style="margin:0; padding-left:16px;">
              ${(exp.items || []).map((item:any) => `
                <li style="font-size:13px; margin-bottom:4px;">
                  <strong>${item.product?.name || 'Sản phẩm'}</strong> - SL: <strong>${item.quantity}</strong>
                  <ul style="list-style:circle; padding-left:20px; color:#666; font-size:12px;">
                    ${(item.palletDeductions || []).map((d:any) => `
                      <li>Lấy từ Pallet: ${d.palletCode} (SL: ${d.quantity})</li>
                    `).join('')}
                  </ul>
                </li>
              `).join('')}
            </ul>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    return html;
  }

  static renderActionButtons(): string {
    return `
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Quản lý Cấu trúc Kho</h2>
        <div style="display:flex; gap:12px;">
          <button id="btn-add-warehouse" class="btn" style="background:#1e293b; color:white;">+ Thêm Kho</button>
          <button id="btn-add-zone" class="btn" style="background:#3b82f6; color:white;">+ Khu Vực</button>
          <button id="btn-add-aisle" class="btn" style="background:#0ea5e9; color:white;">+ Dãy</button>
          <button id="btn-add-shelf" class="btn" style="background:#06b6d4; color:white;">+ Kệ</button>
          <button id="btn-add-tier" class="btn" style="background:#14b8a6; color:white;">+ Tầng</button>
        </div>
      </div>
    `;
  }

  static renderModals(): string {
    const modalStyle = `
      position:fixed; top:0; left:0; width:100%; height:100%; 
      background:rgba(0,0,0,0.5); display:none; justify-content:center; align-items:center; z-index:1000;
    `;
    const boxStyle = `
      background:white; padding:24px; border-radius:8px; width:100%; max-width:500px;
      box-shadow:0 4px 6px rgba(0,0,0,0.1);
    `;

    return `
      <!-- Modal Add Warehouse -->
      <div id="modal-warehouse" style="${modalStyle}">
        <div style="${boxStyle}">
          <h3 style="margin-top:0;">Thêm Kho Tổng (Warehouse)</h3>
          <form id="form-warehouse">
            <div style="margin-bottom:16px;">
              <label>Tên Kho *</label>
              <input type="text" id="wh-name" class="form-control" required placeholder="VD: Kho Hà Nội">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Kho (Code) *</label>
              <input type="text" id="wh-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: WH-HN">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-warehouse">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Kho</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Add Zone -->
      <div id="modal-zone" style="${modalStyle}">
        <div style="${boxStyle}">
          <h3 style="margin-top:0;">Thêm Khu Vực (Zone)</h3>
          <form id="form-zone">
            <div style="margin-bottom:16px;">
              <label>Trực thuộc Kho *</label>
              <select id="z-wh-id" class="form-control" required></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Tên Khu Vực *</label>
              <input type="text" id="z-name" class="form-control" required placeholder="VD: Khu A">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Khu Vực (Code) *</label>
              <input type="text" id="z-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: ZA">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-zone">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Khu Vực</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Add Aisle -->
      <div id="modal-aisle" style="${modalStyle}">
        <div style="${boxStyle}">
          <h3 style="margin-top:0;">Thêm Dãy (Aisle)</h3>
          <form id="form-aisle">
            <div style="margin-bottom:16px;">
              <label>Trực thuộc Kho *</label>
              <select id="a-wh-id" class="form-control" required></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Trực thuộc Khu Vực *</label>
              <select id="a-z-id" class="form-control" required><option value="">-- Chọn Kho trước --</option></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Tên Dãy *</label>
              <input type="text" id="a-name" class="form-control" required placeholder="VD: Dãy 1">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Dãy (Code) *</label>
              <input type="text" id="a-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: A1">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-aisle">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Dãy</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Add Shelf -->
      <div id="modal-shelf" style="${modalStyle}">
        <div style="${boxStyle}">
          <h3 style="margin-top:0;">Thêm Kệ (Shelf)</h3>
          <form id="form-shelf">
            <div style="margin-bottom:16px;">
              <label>Trực thuộc Kho *</label>
              <select id="s-wh-id" class="form-control" required></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Khu Vực *</label>
              <select id="s-z-id" class="form-control" required><option value="">-- Chọn Kho trước --</option></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Dãy *</label>
              <select id="s-a-id" class="form-control" required><option value="">-- Chọn Khu Vực trước --</option></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Tên Kệ *</label>
              <input type="text" id="s-name" class="form-control" required placeholder="VD: Kệ 1">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Kệ (Code) *</label>
              <input type="text" id="s-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: S-A1-1">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-shelf">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Kệ</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Add Tier -->
      <div id="modal-tier" style="${modalStyle}">
        <div style="${boxStyle}">
          <h3 style="margin-top:0;">Thêm Tầng (Tier)</h3>
          <form id="form-tier">
            <div style="display:flex; gap:16px; margin-bottom:16px;">
              <div style="flex:1;">
                <label>Kho *</label>
                <select id="t-wh-id" class="form-control" required></select>
              </div>
              <div style="flex:1;">
                <label>Khu Vực *</label>
                <select id="t-z-id" class="form-control" required><option value="">-- Chọn Kho --</option></select>
              </div>
            </div>
            <div style="display:flex; gap:16px; margin-bottom:16px;">
              <div style="flex:1;">
                <label>Dãy *</label>
                <select id="t-a-id" class="form-control" required><option value="">-- Chọn Khu --</option></select>
              </div>
              <div style="flex:1;">
                <label>Kệ *</label>
                <select id="t-s-id" class="form-control" required><option value="">-- Chọn Dãy --</option></select>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <label>Tên Tầng *</label>
              <input type="text" id="t-name" class="form-control" required placeholder="VD: Tầng 1">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Tầng (Code) *</label>
              <input type="text" id="t-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: T-A1-1-1">
            </div>
            <div style="margin-bottom:16px;">
              <label>Sức chứa (Pallet) *</label>
              <input type="number" id="t-capacity" class="form-control" required min="1" value="10">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-tier">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Tầng</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
