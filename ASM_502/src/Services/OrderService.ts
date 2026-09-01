/**
 * OrderService.ts
 * Service cho Orders — admin xem tất cả, user xem của mình
 */

import { ApiService } from './ApiService.js';
import { IOrder, OrderStatus } from '../Models/Order.js';
import { fetchApi } from '../Utils/fetchApi.js';

export class OrderService extends ApiService<IOrder> {
  constructor() {
    super('orders');
  }

  /** Lấy đơn hàng của 1 user cụ thể */
  async getByUser(userId: string): Promise<IOrder[]> {
    const result = await fetchApi<IOrder[]>(`/api/orders/user/${userId}`);
    return result || [];
  }

  /** Tạo đơn hàng (fetchApi tự gắn auth headers) */
  async create(orderData: Omit<IOrder, 'id'>): Promise<IOrder> {
    const result = await fetchApi<IOrder>('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!result) throw new Error('Tạo đơn hàng thất bại');
    return result;
  }

  /** Cập nhật trạng thái đơn hàng (admin) */
  async updateStatus(orderId: number | string, status: OrderStatus): Promise<IOrder | null> {
    return this.update(orderId, { status } as Partial<IOrder>);
  }
}

export const orderService = new OrderService();
