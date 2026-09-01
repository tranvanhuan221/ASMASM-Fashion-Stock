const { User } = require('../models');
const jwt = require('jsonwebtoken');

const authController = {
  // === WEB CONTROLLERS ===
  
  // Show login page
  getLogin: (req, res) => {
    if (req.session && req.session.userId) {
      return res.redirect('/dashboard');
    }
    res.render('auth/login', { title: 'Đăng nhập', layout: 'auth' });
  },
  
  // Process login (Web)
  postLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await User.findOne({ username });
      if (!user) {
        req.flash('error_msg', 'Tài khoản không tồn tại');
        return res.redirect('/login');
      }
      
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        req.flash('error_msg', 'Mật khẩu không chính xác');
        return res.redirect('/login');
      }
      
      if (!user.isActive) {
        req.flash('error_msg', 'Tài khoản đã bị vô hiệu hóa');
        return res.redirect('/login');
      }
      
      // Update last login
      user.lastLogin = new Date();
      await user.save();
      
      // Set session
      req.session.userId = user._id;
      req.flash('success_msg', 'Đăng nhập thành công');
      res.redirect('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      req.flash('error_msg', 'Có lỗi xảy ra trong quá trình đăng nhập');
      res.redirect('/login');
    }
  },
  
  // Logout (Web)
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  },
  
  // === API CONTROLLERS ===
  
  // Process login (API)
  apiLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Tài khoản không tồn tại' });
      }
      
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Mật khẩu không chính xác' });
      }
      
      if (!user.isActive) {
        return res.status(401).json({ success: false, message: 'Tài khoản đã bị vô hiệu hóa' });
      }
      
      // Update last login
      user.lastLogin = new Date();
      await user.save();
      
      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );
      
      res.json({
        success: true,
        message: 'Đăng nhập thành công',
        token,
        user: {
          id: user._id,
          username: user.username,
          fullName: user.fullName,
          role: user.role
        }
      });
      
    } catch (error) {
      console.error('API Login error:', error);
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  }
};

module.exports = authController;
