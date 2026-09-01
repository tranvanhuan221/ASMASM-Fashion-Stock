// Role-based access control middleware

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      if (req.originalUrl.startsWith('/api/')) {
        return res.status(403).json({
          success: false,
          message: 'Bạn không có quyền truy cập chức năng này'
        });
      }
      req.flash('error_msg', 'Bạn không có quyền truy cập chức năng này');
      return res.redirect('/dashboard');
    }
    next();
  };
};

module.exports = { authorizeRoles };
