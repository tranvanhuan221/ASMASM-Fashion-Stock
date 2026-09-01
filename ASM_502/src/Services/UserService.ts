/**
 * UserService.ts
 * Service layer for User operations (list, login, register)
 */

import { fetchApi } from '../Utils/fetchApi.js';
import { IUser } from '../Models/User.js';
import { ApiService } from './ApiService.js';

export class UserService extends ApiService<IUser> {
  constructor() {
    super('users');
  }

  async login(email: string, password: string): Promise<IUser> {
    const user = await fetchApi<IUser>('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!user) throw new Error('Email hoặc mật khẩu không đúng');
    return user;
  }

  async register(name: string, email: string, password: string): Promise<IUser> {
    const user = await fetchApi<IUser>('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!user) throw new Error('Đăng ký thất bại');
    return user;
  }
}

export const userService = new UserService();
