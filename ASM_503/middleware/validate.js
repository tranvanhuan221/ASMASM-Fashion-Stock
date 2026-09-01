const { body, validationResult } = require('express-validator');

const validateProduct = [
  body('name').notEmpty().withMessage('Tên sản phẩm không được để trống'),
  body('sku').notEmpty().withMessage('Mã SKU không được để trống'),
  body('importPrice').optional().isNumeric().withMessage('Giá nhập phải là số'),
  body('exportPrice').optional().isNumeric().withMessage('Giá bán phải là số')
];

const validateCategory = [
  body('name').notEmpty().withMessage('Tên danh mục không được để trống')
];

const validateSupplier = [
  body('name').notEmpty().withMessage('Tên nhà cung cấp không được để trống')
];

const validateCustomer = [
  body('name').notEmpty().withMessage('Tên khách hàng không được để trống')
];

const validateUser = [
  body('username').isLength({ min: 3 }).withMessage('Username tối thiểu 3 ký tự'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password').isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự'),
  body('fullName').notEmpty().withMessage('Họ tên không được để trống')
];

const validateLogin = [
  body('username').notEmpty().withMessage('Username không được để trống'),
  body('password').notEmpty().withMessage('Mật khẩu không được để trống')
];

const validateInventory = [
  body('productId').isInt().withMessage('Vui lòng chọn sản phẩm'),
  body('quantity').isInt({ min: 1 }).withMessage('Số lượng phải >= 1'),
  body('unitPrice').isNumeric().withMessage('Đơn giá phải là số')
];

const validateOrder = [
  body('customerId').notEmpty().withMessage('Vui lòng chọn khách hàng')
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.originalUrl.startsWith('/api/')) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    req.flash('error_msg', errors.array().map(e => e.msg).join(', '));
    return res.redirect('back');
  }
  next();
};

module.exports = {
  validateProduct,
  validateCategory,
  validateSupplier,
  validateCustomer,
  validateUser,
  validateLogin,
  validateInventory,
  validateOrder,
  handleValidationErrors
};
