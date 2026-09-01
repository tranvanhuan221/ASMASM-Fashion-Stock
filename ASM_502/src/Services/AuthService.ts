/**
 * AuthService.ts
 * Quản lý session đăng nhập (localStorage) + merge giỏ hàng khi login
 */

import { IUser } from '../Models/User.js';
import { userService } from './UserService.js';
import { CartService } from './CartService.js';

export type UserRole = 'user' | 'staff' | 'admin';

export class AuthService {
  private static readonly STORAGE_KEY = 'genz_user';

  static async login(email: string, password: string): Promise<IUser> {
    const user = await userService.login(email, password);
    this.setCurrentUser(user);

    // Merge giỏ hàng guest → user sau khi đăng nhập
    await CartService.mergeGuestCart(String(user.id));

    return user;
  }

  static async register(name: string, email: string, password: string): Promise<IUser> {
    const user = await userService.register(name, email, password);
    // Không tự động đăng nhập sau khi đăng ký theo yêu cầu
    return user;
  }

  static getCurrentUser(): IUser | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  static setCurrentUser(user: IUser): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('auth-changed'));
  }

  static logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    // Xóa giỏ hàng local khi đăng xuất
    localStorage.removeItem('genz_cart');
    window.dispatchEvent(new CustomEvent('auth-changed'));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: 0 } }));
  }

  static isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  static getRole(): UserRole {
    return (this.getCurrentUser()?.role as UserRole) || 'user';
  }

  static isAdmin(): boolean {
    const role = this.getRole();
    return role === 'admin' || role === 'staff';
  }

  static isManagerAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  /** Headers để gửi kèm mọi request cần xác thực */
  static getAuthHeaders(): Record<string, string> {
    const user = this.getCurrentUser();
    if (!user) return {};
    return {
      'x-user-id':   String(user.id),
      'x-user-role': user.role || 'user'
    };
  }
}
