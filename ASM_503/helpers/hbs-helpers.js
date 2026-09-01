module.exports = {
  // Format date
  formatDate: function(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  },

  formatDateTime: function(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  },

  // Format currency VND
  formatCurrency: function(amount) {
    if (!amount && amount !== 0) return '0 ₫';
    return parseFloat(amount).toLocaleString('vi-VN') + ' ₫';
  },

  // Format number
  formatNumber: function(num) {
    if (!num && num !== 0) return '0';
    return parseFloat(num).toLocaleString('vi-VN');
  },

  // Equality check
  eq: function(a, b) { return a == b; },
  neq: function(a, b) { return a != b; },
  gt: function(a, b) { return a > b; },
  lt: function(a, b) { return a < b; },
  gte: function(a, b) { return a >= b; },
  lte: function(a, b) { return a <= b; },

  // Generic conditional
  ifCond: function(v1, operator, v2, options) {
    switch (operator) {
      case '==': return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===': return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=': return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '<': return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=': return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>': return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=': return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      default: return options.inverse(this);
    }
  },

  // Status badge
  statusBadge: function(status) {
    const map = {
      'pending': '<span class="badge badge-warning">Chờ xử lý</span>',
      'completed': '<span class="badge badge-success">Hoàn thành</span>',
      'cancelled': '<span class="badge badge-danger">Đã hủy</span>'
    };
    return map[status] || `<span class="badge">${status}</span>`;
  },

  // Import type badge
  importTypeBadge: function(type) {
    if (type === 'batch') return '<span class="badge badge-info">Nhập lô</span>';
    if (type === 'individual') return '<span class="badge badge-primary">Nhập lẻ</span>';
    return `<span class="badge">${type}</span>`;
  },

  // Export reason badge
  reasonBadge: function(reason) {
    const map = {
      'sell': '<span class="badge badge-success">Bán hàng</span>',
      'return': '<span class="badge badge-warning">Trả hàng</span>',
      'damaged': '<span class="badge badge-danger">Hàng hỏng</span>',
      'other': '<span class="badge badge-info">Khác</span>'
    };
    return map[reason] || `<span class="badge">${reason}</span>`;
  },

  // Type badge for import/export
  typeBadge: function(type) {
    if (type === 'import') return '<span class="badge badge-success">Nhập kho</span>';
    if (type === 'export') return '<span class="badge badge-danger">Xuất kho</span>';
    return `<span class="badge">${type}</span>`;
  },

  // Customer type badge
  customerTypeBadge: function(type) {
    if (type === 'wholesale') return '<span class="badge badge-info">Bán sỉ</span>';
    return '<span class="badge badge-primary">Bán lẻ</span>';
  },

  // Stock status badge
  stockBadge: function(quantity, minQuantity) {
    if (quantity <= 0) return '<span class="badge badge-danger">Hết hàng</span>';
    if (quantity <= minQuantity) return '<span class="badge badge-warning">Sắp hết</span>';
    return '<span class="badge badge-success">Còn hàng</span>';
  },

  // Profit badge
  profitBadge: function(profit) {
    if (!profit && profit !== 0) return '';
    if (profit > 0) return `<span class="badge badge-success">+${parseFloat(profit).toLocaleString('vi-VN')} ₫</span>`;
    if (profit < 0) return `<span class="badge badge-danger">${parseFloat(profit).toLocaleString('vi-VN')} ₫</span>`;
    return '<span class="badge">0 ₫</span>';
  },

  // Location code display
  locationCode: function(code) {
    if (!code) return '';
    return `<span class="location-badge">${code}</span>`;
  },

  // Batch age display
  batchAge: function(importDate) {
    if (!importDate) return '';
    const now = new Date();
    const d = new Date(importDate);
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
    return `${Math.floor(diffDays / 365)} năm trước`;
  },

  // Truncate string
  truncate: function(str, len) {
    if (!str) return '';
    if (str.length <= len) return str;
    return str.substring(0, len) + '...';
  },

  // JSON stringify for script tags
  json: function(context) {
    return JSON.stringify(context);
  },

  // Math helpers
  multiply: function(a, b) { return (parseFloat(a) * parseFloat(b)); },
  add: function(a, b) { return parseFloat(a) + parseFloat(b); },
  subtract: function(a, b) { return parseFloat(a) - parseFloat(b); },
  divide: function(a, b) { return b != 0 ? parseFloat(a) / parseFloat(b) : 0; },
  percent: function(a, b) { return b != 0 ? ((parseFloat(a) / parseFloat(b)) * 100).toFixed(1) : '0'; },

  // Select helper for dropdowns
  selected: function(selected, value) {
    if (!selected || !value) return '';
    return selected.toString() === value.toString() ? 'selected' : '';
  },

  // Active page helper
  isActive: function(activePage, page) {
    return activePage === page ? 'active' : '';
  },

  // Role check
  isAdmin: function(role, options) {
    return role === 'admin' ? options.fn(this) : options.inverse(this);
  },

  isManagerOrAdmin: function(role, options) {
    return (role === 'admin' || role === 'manager') ? options.fn(this) : options.inverse(this);
  },

  // Pagination range helper
  pageRange: function(currentPage, totalPages, options) {
    let result = '';
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) {
      result += options.fn({ page: i, isCurrent: i === currentPage });
    }
    return result;
  },

  // ObjectId to string
  toStr: function(val) {
    if (!val) return '';
    return val.toString();
  },

  // Index helper (for loops)
  inc: function(val) { return parseInt(val) + 1; }
};
