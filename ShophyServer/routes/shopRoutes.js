const { Router } = require('express');
const shopController = require('../controllers/shopController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireMerchantAccount } = require('../middleware/merchantMiddleware'); 

 
const router = Router();


router.get('/shop', requireAuth, shopController.shop_get);
router.get('/shop/create', requireAuth, requireMerchantAccount, 
        shopController.shop_create_get);
router.post('/shop/create', requireAuth, requireMerchantAccount, 
        shopController.shop_create_post);
router.get('/shop/:id', requireAuth, shopController.shop_details_get);

module.exports = router;