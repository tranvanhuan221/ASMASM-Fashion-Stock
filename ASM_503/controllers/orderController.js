const { Order, OrderDetail, Product, Customer, User, sequelize } = require('../models');
const { Op } = require('sequelize');

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || '';
    const search = req.query.search || '';

    const where = {};
    if (status) where.status = status;
    if (search) {
      where[Op.or] = [{ orderCode: { [Op.like]: `%${search}%` } }];
    }

    const { count, rows } = await Order.findAndCountAll({
      where, limit, offset,
      order: [['createdAt', 'DESC']],
      include: [
        { model: Customer, as: 'customer', attributes: ['id', 'name', 'phone'] },
        { model: User, as: 'user', attributes: ['id', 'fullName'] }
      ]
    });
    const totalPages = Math.ceil(count / limit);

    if (req.originalUrl.startsWith('/api/')) {
      return res.json({ success: true, data: rows, pagination: { page, limit, total: count, totalPages } });
    }
    res.render('orders/index', {
      title: 'Quản lý đơn hàng', activePage: 'orders',
      orders: rows.map(o => o.toJSON()), status, search,
      pagination: { page, totalPages, total: count }
    });
  } catch (error) {
    if (req.originalUrl.startsWith('/api/')) return res.status(500).json({ success: false, message: error.message });
    req.flash('error_msg', error.message); res.redirect('/orders');
  }
};

const getById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'user', attributes: ['id', 'fullName'] },
        { model: OrderDetail, as: 'details', include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'sku', 'image'] }] }
      ]
    });
    if (!order) {
      if (req.originalUrl.startsWith('/api/')) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
      req.flash('error_msg', 'Không tìm thấy đơn hàng'); return res.redirect('/orders');
    }
    if (req.originalUrl.startsWith('/api/')) return res.json({ success: true, data: order });
    res.render('orders/detail', { title: `Đơn hàng ${order.orderCode}`, activePage: 'orders', order: order.toJSON() });
  } catch (error) {
    if (req.originalUrl.startsWith('/api/')) return res.status(500).json({ success: false, message: error.message });
    req.flash('error_msg', error.message); res.redirect('/orders');
  }
};

const create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { customerId, discount, note, items } = req.body;

    // Parse items
    let orderItems = items;
    if (typeof items === 'string') {
      orderItems = JSON.parse(items);
    }
    // Handle form array format: items[0][productId], items[0][quantity], etc.
    if (!Array.isArray(orderItems)) {
      orderItems = [];
      if (req.body['items[0][productId]'] || (req.body.productId && Array.isArray(req.body.productId))) {
        // Form array format
        const productIds = Array.isArray(req.body.productId) ? req.body.productId : [req.body.productId];
        const quantities = Array.isArray(req.body.quantity) ? req.body.quantity : [req.body.quantity];
        const unitPrices = Array.isArray(req.body.unitPrice) ? req.body.unitPrice : [req.body.unitPrice];
        for (let i = 0; i < productIds.length; i++) {
          if (productIds[i]) {
            orderItems.push({ productId: productIds[i], quantity: quantities[i], unitPrice: unitPrices[i] });
          }
        }
      }
    }

    if (!orderItems || orderItems.length === 0) {
      await t.rollback();
      if (req.originalUrl.startsWith('/api/')) return res.status(400).json({ success: false, message: 'Đơn hàng phải có ít nhất 1 sản phẩm' });
      req.flash('error_msg', 'Đơn hàng phải có ít nhất 1 sản phẩm'); return res.redirect('/orders/create');
    }

    // Generate order code
    const orderCode = 'ORD-' + Date.now();

    // Calculate total
    let totalAmount = 0;
    for (const item of orderItems) {
      totalAmount += parseFloat(item.quantity) * parseFloat(item.unitPrice);
    }
    totalAmount -= parseFloat(discount || 0);

    const order = await Order.create({
      orderCode, customerId, userId: req.user.id,
      totalAmount, discount: parseFloat(discount || 0), note
    }, { transaction: t });

    // Create order details
    for (const item of orderItems) {
      await OrderDetail.create({
        orderId: order.id,
        productId: item.productId,
        quantity: parseInt(item.quantity),
        unitPrice: parseFloat(item.unitPrice),
        subtotal: parseInt(item.quantity) * parseFloat(item.unitPrice)
      }, { transaction: t });
    }

    await t.commit();

    if (req.originalUrl.startsWith('/api/')) return res.status(201).json({ success: true, message: 'Tạo đơn hàng thành công', data: order });
    req.flash('success_msg', `Tạo đơn hàng ${orderCode} thành công`);
    res.redirect('/orders');
  } catch (error) {
    await t.rollback();
    if (req.originalUrl.startsWith('/api/')) return res.status(500).json({ success: false, message: error.message });
    req.flash('error_msg', 'Lỗi tạo đơn hàng: ' + error.message); res.redirect('/orders/create');
  }
};

const updateStatus = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderDetail, as: 'details' }]
    });

    if (!order) {
      await t.rollback();
      if (req.originalUrl.startsWith('/api/')) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
      req.flash('error_msg', 'Không tìm thấy đơn hàng'); return res.redirect('/orders');
    }

    const { status } = req.body;
    const oldStatus = order.status;

    // If confirming order, decrease stock
    if (status === 'confirmed' && oldStatus === 'pending') {
      for (const detail of order.details) {
        const product = await Product.findByPk(detail.productId, { transaction: t });
        if (product.quantity < detail.quantity) {
          await t.rollback();
          const msg = `Không đủ tồn kho cho sản phẩm ${product.name}. Hiện có: ${product.quantity}, cần: ${detail.quantity}`;
          if (req.originalUrl.startsWith('/api/')) return res.status(400).json({ success: false, message: msg });
          req.flash('error_msg', msg); return res.redirect(`/orders/${order.id}`);
        }
        await product.update({ quantity: product.quantity - detail.quantity }, { transaction: t });
      }
    }

    // If cancelling a confirmed order, restore stock
    if (status === 'cancelled' && (oldStatus === 'confirmed' || oldStatus === 'shipping')) {
      for (const detail of order.details) {
        const product = await Product.findByPk(detail.productId, { transaction: t });
        await product.update({ quantity: product.quantity + detail.quantity }, { transaction: t });
      }
    }

    await order.update({ status }, { transaction: t });
    await t.commit();

    if (req.originalUrl.startsWith('/api/')) return res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: order });
    req.flash('success_msg', `Cập nhật trạng thái đơn hàng thành ${status}`);
    res.redirect(`/orders/${order.id}`);
  } catch (error) {
    await t.rollback();
    if (req.originalUrl.startsWith('/api/')) return res.status(500).json({ success: false, message: error.message });
    req.flash('error_msg', error.message); res.redirect('/orders');
  }
};

// Render create form
const renderCreateForm = async (req, res) => {
  try {
    const customers = await Customer.findAll({ order: [['name', 'ASC']] });
    const products = await Product.findAll({ where: { isActive: true, quantity: { [Op.gt]: 0 } }, attributes: ['id', 'name', 'sku', 'exportPrice', 'quantity'] });
    res.render('orders/create', {
      title: 'Tạo đơn hàng', activePage: 'orders',
      customers: customers.map(c => c.toJSON()),
      products: products.map(p => p.toJSON())
    });
  } catch (error) { req.flash('error_msg', error.message); res.redirect('/orders'); }
};

module.exports = { getAll, getById, create, updateStatus, renderCreateForm };
