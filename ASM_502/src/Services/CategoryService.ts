/**
 * CategoryService.ts
 * Service layer for Category CRUD operations
 */

import { ApiService } from './ApiService.js';
import { ICategory } from '../Models/Category.js';

export class CategoryService extends ApiService<ICategory> {
  constructor() {
    super('categories');
  }

  // Viết chuẩn theo phong cách môn học:
  async addCategory(category: Partial<ICategory>) {
    let user = JSON.parse(localStorage.getItem("genz_user") || "{}"); // lấy user từ localStorage
    let token = user.token; // lấy token
    
    let res = await fetch("http://localhost:3000/api/v1/shop/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(category)
    });
    let data = await res.json();
    return data; // Trả về object category mới
  }
}

export const categoryService = new CategoryService();
