/**
 * Order.ts - Model class + Interface
 * Lab 4: Classes & Interfaces
 */

import { BaseEntity } from './BaseModel.js';

export interface IOrderItem {
  productId: number;
  productName: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
  img: string;
  paymentMethod: string;
  shipping: number;
  cancelRequested?: boolean;
  cancelReason?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'completed' | 'returned' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refund_requested' | 'refunded';
export type ReturnStatus = 'none' | 'pending' | 'approved' | 'rejected';

export interface IOrder {
  id: number | string;   // matches BaseEntity (number | string)
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: IOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: string;
  shipping: number;
  cancelRequested: boolean;
  cancelReason: string;
  paymentStatus: PaymentStatus;
  receivedAt: string | null;
  returnRequested: boolean;
  returnReason: string;
  returnStatus: ReturnStatus;
}

export class Order extends BaseEntity implements IOrder {
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: IOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: string;
  shipping: number;
  cancelRequested: boolean;
  cancelReason: string;
  paymentStatus: PaymentStatus;
  receivedAt: string | null;
  returnRequested: boolean;
  returnReason: string;
  returnStatus: ReturnStatus;

  constructor(data: IOrder) {
    super(data.id);
    this.userId          = data.userId;
    this.customerName    = data.customerName;
    this.customerEmail   = data.customerEmail;
    this.customerPhone   = data.customerPhone;
    this.customerAddress = data.customerAddress;
    this.items           = data.items   || [];
    this.total           = data.total   || 0;
    this.status          = data.status  || 'pending';
    this.createdAt       = data.createdAt;
    this.paymentMethod = data.paymentMethod || 'cod';
    this.shipping    = data.shipping || 0;
    this.cancelRequested = data.cancelRequested || false;
    this.cancelReason = data.cancelReason || '';
    this.paymentStatus = data.paymentStatus || 'unpaid';
    this.receivedAt = data.receivedAt || null;
    this.returnRequested = data.returnRequested || false;
    this.returnReason = data.returnReason || '';
    this.returnStatus = data.returnStatus || 'none';
  }

  get formattedTotal(): string {
    return new Intl.NumberFormat('vi-VN').format(this.total) + ' đ';
  }

  get formattedDate(): string {
    return new Date(this.createdAt).toLocaleString('vi-VN', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  }

  get statusLabel(): string {
    const labels: Record<OrderStatus, string> = {
      pending:   'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      shipping:  'Đang giao hàng',
      delivered: 'Đã giao',
      completed: 'Hoàn thành',
      returned:  'Đã hoàn trả',
      cancelled: 'Đã hủy'
    };
    return labels[this.status] ?? this.status;
  }

  get statusColor(): string {
    const colors: Record<OrderStatus, string> = {
      pending:   '#d97706',
      confirmed: '#2563eb',
      shipping:  '#7c3aed',
      delivered: '#059669',
      completed: '#16a34a',
      returned:  '#9333ea',
      cancelled: '#dc2626'
    };
    return colors[this.status] ?? '#666';
  }

  get statusCssClass(): string {
    return `status-${this.status}`;
  }

  toString(): string  { return `#${this.id} - ${this.customerName} - ${this.formattedTotal}`; }
  validate(): boolean { return this.items.length > 0 && this.customerName.length > 0; }
}
