import { AdminWmsView } from '../Views/AdminWmsView.js';
import { LayoutView } from '../Views/LayoutView.js';
import { WmsService } from '../Services/WmsService.js';
import { showToast } from '../Utils/helpers.js';

export class AdminWmsController {
  static async renderLocations(appElement: HTMLElement): Promise<void> {
    try {
      const warehouses = await WmsService.getWarehouses();
      appElement.innerHTML = LayoutView.render(`
        ${AdminWmsView.renderActionButtons()}
        ${AdminWmsView.renderLocations(warehouses)}
        ${AdminWmsView.renderModals()}
      `, true);
      LayoutView.bindEvents();

      // Bind Modal Opens
      const openModal = async (id: string) => {
        (document.getElementById(id) as HTMLElement).style.display = 'flex';
        // Populate Warehouse selects
        if (id !== 'modal-warehouse') {
          const whs = await WmsService.getWarehouses();
          const selects = document.querySelectorAll(`select[id$="-wh-id"]`);
          selects.forEach(s => {
            s.innerHTML = '<option value="">-- Chọn Kho --</option>' + whs.map((w:any) => `<option value="${w._id}">${w.name}</option>`).join('');
          });
        }
      };

      document.getElementById('btn-add-warehouse')?.addEventListener('click', () => openModal('modal-warehouse'));
      document.getElementById('btn-add-zone')?.addEventListener('click', () => openModal('modal-zone'));
      document.getElementById('btn-add-aisle')?.addEventListener('click', () => openModal('modal-aisle'));
      document.getElementById('btn-add-shelf')?.addEventListener('click', () => openModal('modal-shelf'));
      document.getElementById('btn-add-tier')?.addEventListener('click', () => openModal('modal-tier'));

      // Bind Modal Closes
      document.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = (e.target as HTMLElement).getAttribute('data-target');
          if (target) (document.getElementById(target) as HTMLElement).style.display = 'none';
        });
      });

      // Cascading logic for Aisle Modal
      document.getElementById('a-wh-id')?.addEventListener('change', async (e) => {
        const whId = (e.target as HTMLSelectElement).value;
        const zSelect = document.getElementById('a-z-id') as HTMLSelectElement;
        zSelect.innerHTML = '<option value="">-- Chọn Khu Vực --</option>';
        if (!whId) return;
        const zones = await WmsService.getZones(whId);
        zones.forEach((z:any) => zSelect.innerHTML += `<option value="${z._id}">${z.name}</option>`);
      });

      // Cascading logic for Shelf Modal
      document.getElementById('s-wh-id')?.addEventListener('change', async (e) => {
        const whId = (e.target as HTMLSelectElement).value;
        const zSelect = document.getElementById('s-z-id') as HTMLSelectElement;
        zSelect.innerHTML = '<option value="">-- Chọn Khu Vực --</option>';
        document.getElementById('s-a-id')!.innerHTML = '<option value="">-- Chọn Dãy --</option>';
        if (!whId) return;
        const zones = await WmsService.getZones(whId);
        zones.forEach((z:any) => zSelect.innerHTML += `<option value="${z._id}">${z.name}</option>`);
      });
      document.getElementById('s-z-id')?.addEventListener('change', async (e) => {
        const zId = (e.target as HTMLSelectElement).value;
        const aSelect = document.getElementById('s-a-id') as HTMLSelectElement;
        aSelect.innerHTML = '<option value="">-- Chọn Dãy --</option>';
        if (!zId) return;
        const aisles = await WmsService.getAisles(zId);
        aisles.forEach((a:any) => aSelect.innerHTML += `<option value="${a._id}">${a.name}</option>`);
      });

      // Cascading logic for Tier Modal
      document.getElementById('t-wh-id')?.addEventListener('change', async (e) => {
        const whId = (e.target as HTMLSelectElement).value;
        const zSelect = document.getElementById('t-z-id') as HTMLSelectElement;
        zSelect.innerHTML = '<option value="">-- Chọn Khu Vực --</option>';
        if (!whId) return;
        const zones = await WmsService.getZones(whId);
        zones.forEach((z:any) => zSelect.innerHTML += `<option value="${z._id}">${z.name}</option>`);
      });
      document.getElementById('t-z-id')?.addEventListener('change', async (e) => {
        const zId = (e.target as HTMLSelectElement).value;
        const aSelect = document.getElementById('t-a-id') as HTMLSelectElement;
        aSelect.innerHTML = '<option value="">-- Chọn Dãy --</option>';
        if (!zId) return;
        const aisles = await WmsService.getAisles(zId);
        aisles.forEach((a:any) => aSelect.innerHTML += `<option value="${a._id}">${a.name}</option>`);
      });
      document.getElementById('t-a-id')?.addEventListener('change', async (e) => {
        const aId = (e.target as HTMLSelectElement).value;
        const sSelect = document.getElementById('t-s-id') as HTMLSelectElement;
        sSelect.innerHTML = '<option value="">-- Chọn Kệ --</option>';
        if (!aId) return;
        const shelves = await WmsService.getShelves(aId);
        shelves.forEach((s:any) => sSelect.innerHTML += `<option value="${s._id}">${s.name}</option>`);
      });

      // Form Submits
      const handleSubmit = async (formId: string, action: Function) => {
        document.getElementById(formId)?.addEventListener('submit', async (e) => {
          e.preventDefault();
          try {
            await action();
            showToast('Thêm vị trí thành công!');
            this.renderLocations(appElement);
          } catch(err:any) { showToast('Lỗi: ' + err.message, 'error'); }
        });
      };

      handleSubmit('form-warehouse', () => WmsService.createWarehouse({
        name: (document.getElementById('wh-name') as HTMLInputElement).value,
        code: (document.getElementById('wh-code') as HTMLInputElement).value.toUpperCase()
      }));

      handleSubmit('form-zone', () => WmsService.createZone({
        warehouseId: (document.getElementById('z-wh-id') as HTMLSelectElement).value,
        name: (document.getElementById('z-name') as HTMLInputElement).value,
        code: (document.getElementById('z-code') as HTMLInputElement).value.toUpperCase()
      }));

      handleSubmit('form-aisle', () => WmsService.createAisle({
        zoneId: (document.getElementById('a-z-id') as HTMLSelectElement).value,
        name: (document.getElementById('a-name') as HTMLInputElement).value,
        code: (document.getElementById('a-code') as HTMLInputElement).value.toUpperCase()
      }));

      handleSubmit('form-shelf', () => WmsService.createShelf({
        aisleId: (document.getElementById('s-a-id') as HTMLSelectElement).value,
        name: (document.getElementById('s-name') as HTMLInputElement).value,
        code: (document.getElementById('s-code') as HTMLInputElement).value.toUpperCase()
      }));

      handleSubmit('form-tier', () => WmsService.createTier({
        shelfId: (document.getElementById('t-s-id') as HTMLSelectElement).value,
        name: (document.getElementById('t-name') as HTMLInputElement).value,
        code: (document.getElementById('t-code') as HTMLInputElement).value.toUpperCase(),
        capacity: Number((document.getElementById('t-capacity') as HTMLInputElement).value)
      }));
    } catch (error: any) {
      showToast('Lỗi tải dữ liệu kho', 'error');
    }
  }

  static async renderImportBatches(appElement: HTMLElement): Promise<void> {
    try {
      const batches = await WmsService.getBatches();
      appElement.innerHTML = LayoutView.render(AdminWmsView.renderImportBatches(batches), true);
      LayoutView.bindEvents();

      document.getElementById('btn-add-batch')?.addEventListener('click', async () => {
        // Dummy implementation for brevity
        const batchCode = prompt('Nhập mã Lô Hàng nhập mới (VD: BATCH-001):');
        if (!batchCode) return;
        const palletCode = prompt('Nhập mã Pallet:');
        if (!palletCode) return;
        const productId = prompt('Nhập ID sản phẩm (ObjectId MongoDB):');
        if (!productId) return;
        const quantity = prompt('Số lượng:');

        try {
          await WmsService.createImportBatch({
            batchCode,
            pallets: [
              {
                palletCode,
                items: [{ productId, quantity: Number(quantity) || 1, importPrice: 100000 }]
              }
            ]
          });
          showToast('Nhập hàng thành công!');
          this.renderImportBatches(appElement);
        } catch (err: any) {
          showToast('Lỗi: ' + err.message, 'error');
        }
      });
    } catch (error: any) {
      showToast('Lỗi tải dữ liệu nhập hàng', 'error');
    }
  }

  static async renderInventory(appElement: HTMLElement): Promise<void> {
    try {
      const inventory = await WmsService.getInventory();
      appElement.innerHTML = LayoutView.render(AdminWmsView.renderInventory(inventory), true);
      LayoutView.bindEvents();
    } catch (error: any) {
      showToast('Lỗi tải dữ liệu tồn kho', 'error');
    }
  }

  static async renderExports(appElement: HTMLElement): Promise<void> {
    try {
      const exports = await WmsService.getExports();
      appElement.innerHTML = LayoutView.render(AdminWmsView.renderExports(exports), true);
      LayoutView.bindEvents();

      document.getElementById('btn-add-export')?.addEventListener('click', async () => {
        const productId = prompt('Nhập ID sản phẩm cần xuất (ObjectId):');
        if (!productId) return;
        const quantity = prompt('Nhập số lượng cần xuất:');
        if (!quantity) return;
        const reason = prompt('Nhập lý do xuất kho (VD: Xuất bán, Xuất hủy):') || 'Xuất bán';

        try {
          await WmsService.createExport({
            reason,
            items: [{ productId, quantity: Number(quantity) }]
          });
          showToast('Tạo phiếu xuất thành công! Hệ thống đã tự động trừ kho (FIFO).');
          this.renderExports(appElement);
        } catch (err: any) {
          showToast('Lỗi: ' + (err.error || err.message), 'error');
        }
      });
    } catch (error: any) {
      showToast('Lỗi tải lịch sử xuất kho', 'error');
    }
  }
}
