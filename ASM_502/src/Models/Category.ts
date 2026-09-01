import { BaseEntity } from './BaseModel.js';

export interface ICategory {
  id: number | string;
  name: string;
  icon: string;
  image?: string;
  parentId?: string | null;
}

export class Category extends BaseEntity implements ICategory {
  name: string;
  icon: string;
  image?: string;
  parentId?: string | null;

  constructor(data: any) {
    super(data.id || data._id);
    this.name = data.name;
    this.icon = data.icon || '📌';
    this.image = data.image;
    if (data.parentId) {
      this.parentId = typeof data.parentId === 'object' ? data.parentId._id || data.parentId.id : data.parentId;
    } else {
      this.parentId = null;
    }
  }

  toString(): string {
    return `${this.icon} ${this.name}`;
  }

  validate(): boolean {
    return this.name.length > 0;
  }
}
