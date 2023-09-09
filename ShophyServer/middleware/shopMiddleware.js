const jwt = require('jsonwebtoken');
const { models } = require('mongoose');
const User = require('../models/User');
const Shop = require('../models/Shop');


const requireAdmin = async (req, res, next) => {
    
    const token = req.cookies.jwt;
    const userId = jwt.decode(token).id;
    const shopId = req.params.id;
    let shop = await Shop.findById(shopId);

    if (shop.ownerId === userId) {
        next();
        return;
    }
}

module.exports =  { requireAdmin };