/**
 * ProductService.ts
 * Service layer for Product CRUD operations
 * Uses generic ApiService<T> as base
 */

import { ApiService } from './ApiService.js';
import { IProduct } from '../Models/Product.js';

export class ProductService extends ApiService<IProduct> {
  constructor() {
    super('products');
  }

  /** Get products filtered by sale flag */
  async getSaleProducts(): Promise<IProduct[]> {
    return this.getAll({ sale: 'true' });
  }

  /** Get products by category */
  async getByCategory(categoryId: number): Promise<IProduct[]> {
    return this.getAll({ categoryId: String(categoryId) });
  }

  /** Search products by name */
  async search(query: string): Promise<IProduct[]> {
    return this.getAll({ search: query });
  }

  // ==========================================
  // Viết chuẩn theo phong cách môn học:
  // ==========================================
  
  async upload(fileInputId: string = 'file') {
    const fileInput = document.getElementById(fileInputId) as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      let formData = new FormData();
      // Đổi 'hinh' thành 'image' vì Multer backend của chúng ta nhận field tên là 'image'
      formData.append('image', file);

      let res = await fetch('http://localhost:3005/api/v1/shop/upload', {
          method: 'POST',
          body: formData
      });
      let data = await res.json();
      return data; // Chứa { url: '...' } từ Cloudinary
    }
    return null;
  }

  insert(product: any) {
    // trước khi thêm vào csdl thì upload file trước, sau đó lấy link 
    // product.images = [(await this.upload()).url]; // Code mẫu nếu dùng await upload()
    
    fetch('http://localhost:3005/api/v1/shop/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then((res) => {
        console.log(res);
        return true;
    }).catch((err) => {
        console.log(err);
        return false;
    });
  }
}

export const productService = new ProductService();
