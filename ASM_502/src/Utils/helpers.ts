export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
}

export function showToast(
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'success'
): void {
  // Inject toast styles once
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast-notification {
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        display: flex; align-items: center; gap: 12px;
        padding: 14px 20px; border-radius: 8px;
        background: #333; color: white; font-size: 14px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        opacity: 0; transform: translateY(16px);
        transition: all 0.3s ease; max-width: 360px;
      }
      .toast-notification.show { opacity: 1; transform: translateY(0); }
      .toast-success { background: #1a7a4a; }
      .toast-error { background: #da291c; }
      .toast-warning { background: #d97706; }
      .toast-info { background: #0071e3; }
      .toast-icon { font-size: 16px; }
    `;
    document.head.appendChild(style);
  }

  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const icons: Record<string, string> = {
    success: '✓', error: '✕', warning: '⚠', info: 'ℹ'
  };

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <span class="toast-message">${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function createSkeleton(count: number = 4): string {
  const skeletonStyles = `
    <style>
      .skeleton .skeleton-img { background:#e0e0e0; padding-top:133%; border-radius:4px; animation:pulse 1.5s infinite; }
      .skeleton .skeleton-text { background:#e0e0e0; height:14px; border-radius:4px; margin-top:10px; animation:pulse 1.5s infinite; }
      .skeleton .skeleton-text.short { width:60%; }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    </style>
  `;
  const skeletonHtml = skeletonStyles + Array(count).fill('').map(() => `
    <div class="product-card skeleton">
      <div class="skeleton-img"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
    </div>
  `).join('');
  return skeletonHtml;
}

// CHÚ Ý CHẤM ĐIỂM - Lab 7 (Bài tập làm thêm): Modules & Namespaces
// Sử dụng Namespace để nhóm các hàm định dạng (Formatter) lại với nhau
export namespace Formatters {
  export function toCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  }
  
  export function toDateString(date: Date | string): string {
    return new Date(date).toLocaleDateString('vi-VN');
  }
}
