/**
 * ApiService.ts
 * Generic CRUD base service using Generics (Lab 5)
 * All domain services (ProductService, OrderService, etc.) extend this class
 */

import { IBaseModel, ICrudService } from '../Models/BaseModel.js';
import { fetchApi } from '../Utils/fetchApi.js';

export class ApiService<T extends IBaseModel> implements ICrudService<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `/api/${endpoint}`;
  }

  async getAll(params?: Record<string, string>): Promise<T[]> {
    let path = this.endpoint;
    if (params && Object.keys(params).length > 0) {
      path += `?${new URLSearchParams(params).toString()}`;
    }
    const result = await fetchApi<T[]>(path);
    return result ?? [];
  }

  async getById(id: number | string): Promise<T | null> {
    return fetchApi<T>(`${this.endpoint}/${id}`);
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const result = await fetchApi<T>(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!result) throw new Error('Tạo mới thất bại');
    return result;
  }

  async update(id: number | string, item: Partial<T>): Promise<T | null> {
    return fetchApi<T>(`${this.endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
  }

  async delete(id: number | string): Promise<boolean> {
    const result = await fetchApi<null>(`${this.endpoint}/${id}`, {
      method: 'DELETE'
    });
    // fetchApi throws on error, so if it doesn't throw, consider it success
    return true;
  }
}
