const userService = require('../../services/userService');

class ShopUserController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
      }
      res.json(user);
    } catch (err) {
      console.error('POST /users/login error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi đăng nhập' });
    }
  }

  async register(req, res) {
    try {
      const user = await userService.register(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error('POST /users/register error:', err.message);
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: messages.join(', ') });
      }
      res.status(500).json({ message: 'Lỗi server khi đăng ký' });
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error('GET /users error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách user' });
    }
  }

  async updateRole(req, res) {
    try {
      const { role } = req.body;
      const user = await userService.updateRole(req.params.id, role);
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy user' });
      }
      res.json(user);
    } catch (err) {
      console.error('PUT /users/:id/role error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi cập nhật role' });
    }
  }

  async delete(req, res) {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy user' });
      }
      res.json({ message: 'Xóa user thành công' });
    } catch (err) {
      console.error('DELETE /users/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi xóa user' });
    }
  }
}

module.exports = new ShopUserController();
