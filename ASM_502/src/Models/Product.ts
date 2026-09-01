/**
 * Product.ts - Model class + Interface
 * Lab 4: Classes & Interfaces | Lab 5: Generics
 */

import { BaseEntity } from './BaseModel.js';

export interface IProductColor {
  name: string;
  code: string;
  image: string;
}

export interface IProduct {
  id: number | string;   // matches BaseEntity (number | string)
  sku: string;
  name: string;
  images: string[];
  price: number;
  salePrice?: number | null;
  categoryId: number;
  brand: string;
  description: string;
  material?: string;
  instruction?: string;
  sizes: string[];
  colors: IProductColor[];
  rating: number;
  stock: number;
  weight: number;
}

export class Product extends BaseEntity implements IProduct {
  sku: string;
  name: string;
  images: string[];
  price: number;
  salePrice?: number | null;
  categoryId: number;
  brand: string;
  description: string;
  material?: string;
  instruction?: string;
  sizes: string[];
  colors: IProductColor[];
  rating: number;
  stock: number;
  weight: number;

  constructor(data: any) {
    super(data.id || data._id);
    this.sku         = data.sku || `SKU-${this.id}`;
    this.name        = data.name;
    this.images      = data.images || [];
    if (data.image) this.images.push(data.image); // handle BE image field
    this.price       = data.price;
    this.salePrice   = data.salePrice;
    
    // Handle category object from populate or categoryId primitive
    if (data.category && typeof data.category === 'object') {
      this.categoryId = data.category.id || data.category._id;
    } else {
      this.categoryId = data.categoryId || data.category;
    }
    
    this.brand       = data.brand || 'GENZ';
    this.description = data.description || '';
    this.material    = data.material;
    this.instruction = data.instruction;
    this.sizes       = data.sizes || (data.size ? [data.size] : []);
    this.colors      = data.colors || (data.color ? [{ name: data.color, code: '', image: '' }] : []);
    this.rating      = data.rating || 0;
    this.stock       = data.stock || data.quantity || 0;
    this.weight      = data.weight || 0;
  }

  /** First image URL (or placeholder) */
  get img(): string {
    return this.images[0] || 'https://picsum.photos/seed/genz/400/500';
  }

  get formattedPrice(): string {
    return new Intl.NumberFormat('vi-VN').format(this.price) + ' đ';
  }

  get formattedSalePrice(): string | null {
    return this.salePrice
      ? new Intl.NumberFormat('vi-VN').format(this.salePrice) + ' đ'
      : null;
  }

  get discountPercent(): number {
    if (!this.salePrice) return 0;
    return Math.round((1 - this.salePrice / this.price) * 100);
  }

  get isOnSale(): boolean {
    return !!this.salePrice && this.salePrice < this.price;
  }

  get isInStock(): boolean {
    return this.stock > 0;
  }

  getStarRating(): string {
    const full  = Math.floor(this.rating);
    const half  = this.rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(empty);
  }

  toString(): string  { return `${this.name} - ${this.formattedPrice}`; }
  validate(): boolean { return this.name.length > 0 && this.price > 0 && this.categoryId > 0; }
}
