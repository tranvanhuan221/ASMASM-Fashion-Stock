const express = require('express');
const router = express.Router();

// Import API Controllers
const shopProductController = require('../../controllers/api/shopProductController');
const shopCategoryController = require('../../controllers/api/shopCategoryController');
const shopUserController = require('../../controllers/api/shopUserController');
const shopCartController = require('../../controllers/api/shopCartController');
const shopOrderController = require('../../controllers/api/shopOrderController');
const shopReviewController = require('../../controllers/api/shopReviewController');
const uploadController = require('../../controllers/api/uploadController');

// WMS Controller (existing)
const wmsController = require('../../controllers/wmsController');

// Middleware
const uploadCloud = require('../../middleware/upload');

// ============================================================
// SẢN PHẨM (PRODUCTS)
// ============================================================
router.get('/products', shopProductController.getAll);
router.get('/products/:id', shopProductController.getById);
router.post('/products', shopProductController.create);
router.put('/products/:id', shopProductController.update);
router.delete('/products/:id', shopProductController.delete);

// ============================================================
// DANH MỤC (CATEGORIES)
// ============================================================
router.get('/categories', shopCategoryController.getAll);
router.get('/categories/:id', shopCategoryController.getById);
router.post('/categories', shopCategoryController.create);
router.put('/categories/:id', shopCategoryController.update);
router.delete('/categories/:id', shopCategoryController.delete);

// ============================================================
// NGƯỜI DÙNG & XÁC THỰC (USERS & AUTH)
// ============================================================
router.post('/users/login', shopUserController.login);
router.post('/users/register', shopUserController.register);
router.get('/users', shopUserController.getAll);
router.put('/users/:id/role', shopUserController.updateRole);
router.delete('/users/:id', shopUserController.delete);

// ============================================================
// GIỎ HÀNG (CART)
// ============================================================
router.get('/cart/:userId', shopCartController.getByUserId);
router.put('/cart/:userId', shopCartController.update);
router.delete('/cart/:userId', shopCartController.clear);
router.post('/cart/merge', shopCartController.merge);

// ============================================================
// ĐƠN HÀNG (ORDERS)
// ============================================================
router.get('/orders', shopOrderController.getAll);
router.get('/orders/user/:userId', shopOrderController.getByUser);
router.get('/orders/:id', shopOrderController.getById);
router.post('/orders', shopOrderController.create);
router.put('/orders/:id', shopOrderController.update);
router.delete('/orders/:id', shopOrderController.delete);

// ============================================================
// API ĐÁNH GIÁ (REVIEWS)
// ============================================================
router.get('/products/:id/reviews', shopReviewController.getByProduct);
router.post('/reviews', shopReviewController.create);
router.get('/orders/:id/reviews', shopReviewController.getByOrder);
router.get('/users/:id/reviews', shopReviewController.getByUser);

// ============================================================
// UPLOAD ẢNH (CLOUDINARY)
// ============================================================
router.post('/upload', uploadCloud.single('image'), uploadController.uploadImage);

// ============================================================
// WMS ENDPOINTS
// ============================================================
router.get('/wms/warehouses', wmsController.getWarehouses);
router.post('/wms/warehouses', wmsController.createWarehouse);
router.get('/wms/warehouses/:warehouseId/zones', wmsController.getZones);
router.post('/wms/zones', wmsController.createZone);
router.get('/wms/zones/:zoneId/aisles', wmsController.getAisles);
router.post('/wms/aisles', wmsController.createAisle);
router.get('/wms/aisles/:aisleId/shelves', wmsController.getShelves);
router.post('/wms/shelves', wmsController.createShelf);
router.get('/wms/shelves/:shelfId/tiers', wmsController.getTiers);
router.post('/wms/tiers', wmsController.createTier);
router.delete('/wms/locations/:type/:id', wmsController.deleteLocation);

router.get('/wms/import', wmsController.getBatches);
router.post('/wms/import', wmsController.createImportBatch);

router.get('/wms/products/:productId/locations', wmsController.getProductLocations);

router.get('/wms/inventory', wmsController.getInventory);
router.get('/wms/exports', wmsController.getExports);
router.post('/wms/exports', wmsController.createExport);

module.exports = router;
