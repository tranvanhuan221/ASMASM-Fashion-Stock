export interface IBaseModel {
  id: number | string;
}

// CHÚ Ý CHẤM ĐIỂM - Lab 5 (Bài 4): Generic Interface
// Interface sử dụng generic <T> kế thừa từ IBaseModel
export interface ICrudService<T extends IBaseModel> {
  getAll(params?: Record<string, string>): Promise<T[]>;
  getById(id: number | string): Promise<T | null>;
  create(item: Omit<T, 'id'>): Promise<T>;
  update(id: number | string, item: Partial<T>): Promise<T | null>;
  delete(id: number | string): Promise<boolean>;
}

// CHÚ Ý CHẤM ĐIỂM - Lab 4 (Bài 3): Abstract Class
// Lớp trừu tượng (abstract class) triển khai (implements) từ Interface
export abstract class BaseEntity implements IBaseModel {
  id: number | string;
  
  constructor(id: number | string) {
    this.id = id;
  }
  
  abstract toString(): string;
  abstract validate(): boolean;
}
