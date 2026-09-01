import { BaseEntity } from './BaseModel.js';
import { Logger, Required, Autobind } from '../Utils/Decorators.js';

export interface IUser {
  id: number | string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: 'admin' | 'user' | 'staff';
  avatar?: string;
}

// CHÚ Ý CHẤM ĐIỂM - Lab 5 (Bài 3): Discriminated Unions
// Phân loại kiểu dữ liệu dựa trên một thuộc tính chung là 'role' (Discriminator)
export interface IAdminUser extends IUser {
  role: 'admin'; // Discriminator
  adminLevel?: number;
}
export interface IStaffUser extends IUser {
  role: 'staff'; // Discriminator
  shift?: string;
}
export interface INormalUser extends IUser {
  role: 'user'; // Discriminator
  loyaltyPoints?: number;
}
export type AppUser = IAdminUser | IStaffUser | INormalUser; // Gom lại thành 1 Union

// CHÚ Ý CHẤM ĐIỂM - Lab 5 (Bài 1): Intersection Type
// Gộp 2 kiểu lại với nhau bằng dấu &
export type ElevatedUser = IUser & { privileges: string[] };

// CHÚ Ý CHẤM ĐIỂM - Lab 6 (Bài 1 & Bài 2): Class Decorator / Decorator Factory
// Gắn Decorator @Logger có truyền tham số vào ngay trên định nghĩa Class
@Logger('USER_MODEL')
export class User extends BaseEntity implements IUser {
  // CHÚ Ý CHẤM ĐIỂM - Lab 6 (Bài 3 & Bài 6): Property Decorator & Validating
  // Gắn Decorator @Required để kiểm tra người dùng bắt buộc nhập tên
  @Required
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user' | 'staff';
  avatar?: string;

  constructor(data: IUser) {
    super(data.id);
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.avatar = data.avatar;
  }

  get isAdmin(): boolean {
    return this.role === 'admin';
  }

  // CHÚ Ý CHẤM ĐIỂM - Lab 6 (Bài 4 & Bài 5): Method Decorator & Autobind
  // Gắn Decorator @Autobind để tự động bind(this) cho phương thức
  @Autobind
  toString(): string {
    return `${this.name} (${this.role})`;
  }

  validate(): boolean {
    return this.name.length > 0 && this.email.includes('@');
  }
}
