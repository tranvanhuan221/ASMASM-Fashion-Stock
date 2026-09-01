import { fetchApi } from '../Utils/fetchApi.js';

export interface IReview {
  _id?: string;
  userId: string;
  userName: string;
  productId: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

export class ReviewService {
  static async getByProductId(productId: string): Promise<IReview[]> {
    try {
      const reviews = await fetchApi<IReview[]>(`/api/products/${productId}/reviews`);
      return reviews || [];
    } catch (err) {
      console.error('ReviewService.getByProductId error:', err);
      return [];
    }
  }

  static async getByOrderIdAndUserId(orderId: string, userId: string): Promise<IReview[]> {
    try {
      const reviews = await fetchApi<IReview[]>(`/api/orders/${orderId}/reviews?userId=${userId}`);
      return reviews || [];
    } catch (err) {
      console.error('ReviewService.getByOrderIdAndUserId error:', err);
      return [];
    }
  }

  static async getByUserId(userId: string): Promise<IReview[]> {
    try {
      const reviews = await fetchApi<IReview[]>(`/api/users/${userId}/reviews`);
      return reviews || [];
    } catch (err) {
      console.error('ReviewService.getByUserId error:', err);
      return [];
    }
  }

  static async createReview(data: Partial<IReview>): Promise<IReview> {
    try {
      const review = await fetchApi<IReview>('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return review as IReview;
    } catch (err: any) {
      throw err;
    }
  }
}
