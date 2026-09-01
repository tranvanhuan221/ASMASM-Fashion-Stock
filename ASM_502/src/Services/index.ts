/**
 * Services/index.ts
 * Barrel file - export all services from one entry point
 * Usage: import { productService, orderService } from '../Services/index.js'
 */

export { ApiService } from './ApiService.js';
export { ProductService, productService } from './ProductService.js';
export { CategoryService, categoryService } from './CategoryService.js';
export { OrderService, orderService } from './OrderService.js';
export { UserService, userService } from './UserService.js';
export { AuthService } from './AuthService.js';
export { CartService } from './CartService.js';
export type { ICartItem } from './CartService.js';
