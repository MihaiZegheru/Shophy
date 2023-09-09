const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Shop = require('../models/Shop');

module.exports.shop_get = async (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;

    User.findById(userId)
    .then( async (user) => {
        const isMerchant = user.isMerchant;

        if (isMerchant) {
            const shopId = user.shopId;
            if (shopId == null) {
                res.redirect('/shop/create')
                return;
            }
            console.log(shopId);
            Shop.findById(shopId)
            .then ((shop) => {
                res.redirect('/shop/' + shop._id);
            })
            .catch((err) => {
                console.log(err);
            }); 
        }
        else {
            Shop.find()
            .then ((shops) => {
                console.log(user);
                let shopsMap = [];

                shops.forEach(function(shop) {
                    shopsMap.push(shop);
                })
                res.render('shop', {isMerchant, shopsMap})
            })
            .catch((err) => {
                console.log(err);
            }); 
        }
    })
    .catch((err) => {
        res.status(404);
        console.log(err);
    });


}


module.exports.shop_create_get = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;


    User.findById(userId)
    .then( async (user) => {
        const isMerchant = user.isMerchant;

        if (isMerchant) {
            const shopId = user.shopId;
            if (shopId == null) {
                res.render('createShop');
            }
            else {
                res.redirect('/shop');
            }
        }
        res.status(404);
    })
    .catch((err) => {
        res.status(404);
        console.log(err);
    });

    
}

module.exports.shop_create_post = async (req, res) => {
    const { shopname, position, products } = req.body;;

    const token = req.cookies.jwt;
    const decodedToken = jwt.decode(token);
    const ownerId = decodedToken.id;

    const user = await User.findById(ownerId);
    if (!user.shopId) {
        Shop.create({ shopname, ownerId, position, products})
        .then((shop) => {
            User.setShop(ownerId, shop._id);
            res.status(201).json({ shop: shop._id });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({});
        })
    }
    else {
        // you have shop
    }


}

module.exports.shop_details_get = (req, res) => {
    const id = req.params.id;
    Shop.findById(id)
        .then( async (result) => {
            res.render('shopDetails', {shop: result})
        })
        .catch((err) => {
            res.status(404);
            console.log(err);
        });
}


