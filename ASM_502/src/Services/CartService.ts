/**
 * CartService.ts
 * - Guest (chưa đăng nhập): lưu vào localStorage + đồng bộ lên API /api/cart/guest-{id}
 * - Logged in: lưu vào API /api/cart/{userId} và sync localStorage
 */

import { IProduct } from '../Models/Product.js';
import { fetchApi } from '../Utils/fetchApi.js';

export interface ICartItem {
  product: IProduct;
  quantity: number;
  size: string;
  color: string;
}

// Dạng lưu trong DB (gọn hơn ICartItem, không lưu toàn bộ product object)
interface ICartItemDB {
  productId: number | string;
  productName: string;
  img: string;
  price: number;
  salePrice?: number | null;
  stock: number;
  size: string;
  color: string;
  quantity: number;
}

const LOCAL_KEY  = 'genz_cart';
const GUEST_KEY  = 'genz_guest_id';

/** Tạo hoặc lấy guest ID */
const getGuestId = (): string => {
  let id = localStorage.getItem(GUEST_KEY);
  if (!id) {
    id = 'guest-' + Math.random().toString(36).slice(2, 10) + Date.now();
    localStorage.setItem(GUEST_KEY, id);
  }
  return id;
};

export class CartService {
  // ── Internal local helpers ──────────────────────────────────────────────

  private static getLocal(): ICartItem[] {
    const d = localStorage.getItem(LOCAL_KEY);
    return d ? JSON.parse(d) : [];
  }

  private static saveLocal(cart: ICartItem[]): void {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: this.countLocal(cart) } }));
  }

  private static countLocal(cart: ICartItem[]): number {
    return cart.reduce((s, i) => s + i.quantity, 0);
  }

  private static toDBItems(cart: ICartItem[]): ICartItemDB[] {
    return cart.map(item => ({
      productId:   item.product.id as number,
      productName: item.product.name,
      img:         item.product.images?.[0] || '',
      price:       item.product.price,
      salePrice:   item.product.salePrice,
      stock:       item.product.stock,
      size:        item.size,
      color:       item.color,
      quantity:    item.quantity
    }));
  }

  /** Lưu cart lên API (không throw, chỉ log lỗi) */
  private static async syncToAPI(userId: string, cart: ICartItem[]): Promise<void> {
    try {
      await fetchApi(`/api/cart/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: this.toDBItems(cart) })
      });
    } catch (err) {
      console.warn('CartService: không thể đồng bộ lên server', err);
    }
  }

  // ── Public API ──────────────────────────────────────────────────────────

  static getCurrentUserId(): string {
    const user = JSON.parse(localStorage.getItem('genz_user') || 'null');
    return user?.id ?? getGuestId();
  }

  static isGuest(): boolean {
    return !JSON.parse(localStorage.getItem('genz_user') || 'null');
  }

  /** Lấy giỏ hàng từ localStorage (luôn nhanh) */
  static getCart(): ICartItem[] {
    return this.getLocal();
  }

  /** Tải giỏ hàng từ API về (gọi khi load trang hoặc sau login) */
  static async loadFromServer(userId?: string): Promise<void> {
    const uid = userId ?? this.getCurrentUserId();
    try {
      const data = await fetchApi<{ userId: string; items: ICartItemDB[] }>(`/api/cart/${uid}`);
      if (!data || !data.items?.length) return;

      // Lấy thông tin sản phẩm đầy đủ từ localStorage (nếu đã cached) hoặc chỉ dùng fields trong DB
      const cart: ICartItem[] = data.items.map(dbItem => ({
        product: {
          id: dbItem.productId,
          name: dbItem.productName,
          images: [dbItem.img],
          price: dbItem.price,
          salePrice: dbItem.salePrice,
          stock: dbItem.stock,
          sku: '', brand: '', description: '', categoryId: 0,
          sizes: [], colors: [], rating: 0, material: '', instruction: ''
        } as any,
        quantity: dbItem.quantity,
        size: dbItem.size,
        color: dbItem.color
      }));
      this.saveLocal(cart);
    } catch (err) {
      console.warn('CartService.loadFromServer error:', err);
    }
  }

  /** Merge giỏ hàng guest → user sau khi đăng nhập */
  static async mergeGuestCart(userId: string): Promise<void> {
    const guestId = localStorage.getItem(GUEST_KEY);
    if (!guestId) return;
    try {
      await fetchApi('/api/cart/merge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId, userId })
      });
      localStorage.removeItem(GUEST_KEY);
      // Load giỏ hàng mới từ server
      await this.loadFromServer(userId);
    } catch (err) {
      console.warn('CartService.mergeGuestCart error:', err);
    }
  }

  static addItem(product: IProduct, quantity: number = 1, size: string = '', color: string = ''): void {
    const cart = this.getLocal();
    const colorName = color || (product.colors?.length ? product.colors[0].name : '');

    const idx = cart.findIndex(
      item => item.product.id === product.id && item.size === size && item.color === colorName
    );
    if (idx >= 0) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({ product, quantity, size, color: colorName });
    }
    this.saveLocal(cart);
    // Đồng bộ lên server
    this.syncToAPI(this.getCurrentUserId(), cart);
  }

  static removeItem(productId: number | string, size: string, color: string): void {
    const cart = this.getLocal().filter(
      item => !(item.product.id === productId && item.size === size && item.color === color)
    );
    this.saveLocal(cart);
    this.syncToAPI(this.getCurrentUserId(), cart);
  }

  static updateQuantity(productId: number | string, size: string, color: string, quantity: number): void {
    if (quantity <= 0) { this.removeItem(productId, size, color); return; }
    const cart = this.getLocal();
    const item = cart.find(i => i.product.id === productId && i.size === size && i.color === color);
    if (item) {
      item.quantity = quantity;
      this.saveLocal(cart);
      this.syncToAPI(this.getCurrentUserId(), cart);
    }
  }

  static getTotal(): number {
    return this.getLocal().reduce((sum, item) => {
      const price = item.product.salePrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);
  }

  static getItemCount(): number {
    return this.getLocal().reduce((s, i) => s + i.quantity, 0);
  }

  static clearCart(): void {
    const userId = this.getCurrentUserId();
    localStorage.removeItem(LOCAL_KEY);
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: 0 } }));
    // Xóa trên server
    fetchApi(`/api/cart/${userId}`, { method: 'DELETE' }).catch(() => {});
  }
}
