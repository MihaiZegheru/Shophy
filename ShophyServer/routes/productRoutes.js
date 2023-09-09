const { Router } = require('express');
const productController = require('../controllers/productController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireMerchantAccount } = require('../middleware/merchantMiddleware'); 
const { requireAdmin } = require('../middleware/shopMiddleware');

const router = Router();

router.get('/shop/:id/product/add', requireAuth, requireMerchantAccount, requireAdmin, 
    productController.product_add_get);
router.post('/shop/:id/product/add', requireAuth, requireMerchantAccount, requireAdmin, 
    productController.product_add_post);
router.get('/shop/:id/product/:index', requireAuth, productController.product_get);
router.get('/shop/:id/product/:index/update', requireAuth,  requireMerchantAccount, requireAdmin, productController.product_update_get);
router.post('/shop/:id/product/:index/update', requireAuth,  requireMerchantAccount, requireAdmin, productController.product_update_post);


module.exports = router;