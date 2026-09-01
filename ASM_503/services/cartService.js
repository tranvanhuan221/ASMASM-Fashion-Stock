const ShopCart = require('../models/Cart');

class CartService {
  async getCart(userId) {
    let cart = await ShopCart.findOne({ userId });
    if (!cart) {
      cart = await ShopCart.create({ userId, items: [] });
    }
    return cart;
  }

  async updateCart(userId, items) {
    let cart = await ShopCart.findOne({ userId });
    if (!cart) {
      cart = new ShopCart({ userId, items });
    } else {
      cart.items = items;
    }
    return await cart.save();
  }

  async clearCart(userId) {
    return await ShopCart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );
  }

  async mergeCart(userId, localItems) {
    let cart = await ShopCart.findOne({ userId });
    if (!cart) {
      cart = new ShopCart({ userId, items: localItems });
      return await cart.save();
    }

    // Merge logic
    localItems.forEach(localItem => {
      const existingItem = cart.items.find(
        dbItem => String(dbItem.productId) === String(localItem.productId)
      );
      if (existingItem) {
        existingItem.quantity += localItem.quantity;
      } else {
        cart.items.push(localItem);
      }
    });

    return await cart.save();
  }
}

module.exports = new CartService();
