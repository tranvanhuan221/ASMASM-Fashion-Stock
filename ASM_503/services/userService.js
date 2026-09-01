const User = require('../models/User');

class UserService {
  async getAllUsers() {
    return await User.find({}).sort({ createdAt: -1 });
  }

  async login(email, password) {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!normalizedEmail || !password) return null;

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return null;

    const storedPassword = String(user.password || '');
    const isPlainTextMatch = storedPassword && storedPassword === password;
    const isHashedMatch = storedPassword.startsWith('$2') && await user.comparePassword(password);

    if (!isPlainTextMatch && !isHashedMatch) {
      return null;
    }

    return user;
  }

  async register(data) {
    return await User.create(data);
  }

  async updateRole(id, role) {
    return await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserService();
