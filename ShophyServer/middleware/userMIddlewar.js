const jwt = require('jsonwebtoken');
const { models } = require('mongoose');
const User = require('../models/User');


const requireUserAccount = async (req, res, next) => {
    
    const token = req.cookies.jwt;
    const userId = jwt.decode(token).id;
    let user = await User.findById(userId);

    if (user.isMerchant === true) {
        next();
        return;
    }
    res.redirect('/group')
    
}

module.exports =  {requireAccess};