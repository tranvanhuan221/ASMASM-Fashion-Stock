/**
 * fetchApi.ts
 * Centralized HTTP client — tất cả request gửi đến Backend (ASM_503) tại http://localhost:3005
 * Tự động gắn auth headers từ localStorage nếu user đã đăng nhập
 */

const API_URL = "http://localhost:3005";

const getAuthHeaders = (): Record<string, string> => {
  try {
    const user = JSON.parse(localStorage.getItem('genz_user') || 'null');
    if (user?.id) {
      return {
        'x-user-id':   String(user.id),
        'x-user-role': user.role || 'user',
        'Authorization': `Bearer ${user.token || ''}`
      };
    }
  } catch { /* ignore */ }
  return {};
};

export const fetchApi = async <T>(path: string, options: RequestInit = {}): Promise<T | null> => {
  const headers: Record<string, string> = {
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string> || {})
  };

  // Rewrite /api/xxx to /api/v1/shop/xxx for BE shop routes compatibility
  const apiUrlPath = path.startsWith('/api/') ? path.replace('/api/', '/api/v1/shop/') : path;

  const response = await fetch(`${API_URL}${apiUrlPath}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errorMsg = `API Error ${response.status}`;
    try {
      const err = await response.json();
      errorMsg = err.error || err.message || errorMsg;
    } catch { /* body không phải JSON */ }
    throw new Error(errorMsg);
  }

  // 204 No Content (DELETE success)
  if (response.status === 204) return null;

  const resJson = await response.json();
  // Handle BE response format { success: true, data: ... }
  if (resJson && typeof resJson === 'object' && 'success' in resJson && 'data' in resJson) {
    return resJson.data as T;
  }
  return resJson as T;
};

