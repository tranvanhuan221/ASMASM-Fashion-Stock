/**
 * Models/index.ts
 * Barrel file - export all models from one entry point
 * Usage: import { Product, IProduct } from '../Models/index.js'
 */

export { BaseEntity } from './BaseModel.js';
export type { IBaseModel, ICrudService } from './BaseModel.js';

export { Product } from './Product.js';
export type { IProduct } from './Product.js';

export { Category } from './Category.js';
export type { ICategory } from './Category.js';

export { User } from './User.js';
export type { IUser } from './User.js';

export { Order } from './Order.js';
export type { IOrder, IOrderItem, OrderStatus } from './Order.js';
