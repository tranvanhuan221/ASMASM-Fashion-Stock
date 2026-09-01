import { fetchApi } from '../Utils/fetchApi.js';

export class WmsService {
  static async getWarehouses(): Promise<any> {
    return fetchApi('/api/wms/warehouses');
  }

  static async createWarehouse(data: any): Promise<any> {
    return fetchApi('/api/wms/warehouses', { method: 'POST', body: data });
  }

  static async getZones(warehouseId: string): Promise<any> {
    return fetchApi(`/api/wms/warehouses/${warehouseId}/zones`);
  }

  static async createZone(data: any): Promise<any> {
    return fetchApi('/api/wms/zones', { method: 'POST', body: data });
  }

  static async getAisles(zoneId: string): Promise<any> {
    return fetchApi(`/api/wms/zones/${zoneId}/aisles`);
  }

  static async createAisle(data: any): Promise<any> {
    return fetchApi('/api/wms/aisles', { method: 'POST', body: data });
  }

  static async getShelves(aisleId: string): Promise<any> {
    return fetchApi(`/api/wms/aisles/${aisleId}/shelves`);
  }

  static async createShelf(data: any): Promise<any> {
    return fetchApi('/api/wms/shelves', { method: 'POST', body: data });
  }

  static async getTiers(shelfId: string): Promise<any> {
    return fetchApi(`/api/wms/shelves/${shelfId}/tiers`);
  }

  static async createTier(data: any): Promise<any> {
    return fetchApi('/api/wms/tiers', { method: 'POST', body: data });
  }

  static async deleteLocation(type: string, id: string): Promise<any> {
    return fetchApi(`/api/wms/locations/${type}/${id}`, { method: 'DELETE' });
  }

  static async getBatches(): Promise<any> {
    return fetchApi('/api/wms/import');
  }

  static async createImportBatch(data: any): Promise<any> {
    return fetchApi('/api/wms/import', { method: 'POST', body: data });
  }

  static async getProductLocations(productId: string): Promise<any> {
    return fetchApi(`/api/wms/products/${productId}/locations`);
  }

  static async getInventory(): Promise<any> {
    return fetchApi('/api/wms/inventory');
  }

  static async getExports(): Promise<any> {
    return fetchApi('/api/wms/exports');
  }

  static async createExport(data: any): Promise<any> {
    return fetchApi('/api/wms/exports', { method: 'POST', body: data });
  }
}
