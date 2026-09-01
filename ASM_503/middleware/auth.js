const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authenticate JWT token for API routes
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid or inactive user' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};
// Authenticate session for web routes
const authenticateSession = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.redirect('/login');
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user || !user.isActive) {
      req.session.destroy();
      return res.redirect('/login');
    }
    req.user = user;
    res.locals.user = user.toObject();
    next();
  } catch (error) {
    return res.redirect('/login');
  }
};

// Attach user to res.locals if session exists (for templates)
const attachUser = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
        res.locals.user = user.toObject();
      }
    } catch (error) {
      // silently continue
    }
  }
  next();
};

module.exports = { authenticateToken, authenticateSession, attachUser };
