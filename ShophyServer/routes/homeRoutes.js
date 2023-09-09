const { Router } = require('express');
const homeController = require('../controllers/homeController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', requireAuth, checkUser, homeController.home_get);

module.exports = router;