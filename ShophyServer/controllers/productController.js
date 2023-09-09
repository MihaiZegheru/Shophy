const jwt = require('jsonwebtoken');
const Shop = require('../models/Shop');

module.exports.product_get = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.decode(token);
    const ownerId = decodedToken.id;
    const id = req.params.id;
    const index = req.params.index;


    Shop.findById(id)
        .then( async (result) => {
            let isOwner = false;
            if (result.ownerId === ownerId) {
                isOwner = true;
            }
            console.log(isOwner);
            res.render('product', {isOwner: isOwner, shop: result, product: {
                name: result.products.names[index],
                description: result.products.descriptions[index],
                price: result.products.prices[index],
                image: result.products.images[index]
                }})
        })
        .catch((err) => {
            res.status(404);
            console.log(err);
        });
}


module.exports.product_add_get = (req, res) => {
    const id = req.params.id;
    
    Shop.findById(id)
        .then( async (result) => {
            res.render('addProduct', {shop: result})
        })
        .catch((err) => {
            res.status(404);
            console.log(err);
        });
}

module.exports.product_add_post = (req, res) => {
    const id = req.params.id;
    const { product } = req.body;
    
    Shop.addProduct(product, id)
        .then( async (shop) => {
            res.status(201).json({ shop: id });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({});
        })
}

module.exports.product_update_get = (req, res) => {
    const id = req.params.id;
    const index= req.params.index;
    
    Shop.findById(id)
        .then( async (shop) => {
            const name = shop.products.names[index];
            const shortdescription = shop.products.shortdescriptions[index];
            const description = shop.products.descriptions[index];
            const price = shop.products.prices[index];
            const image = shop.products.images[index];
            res.render('updateProduct', {shop: shop, product: {  
                name: name,
                shortdescription: shortdescription,
                description: description,
                price: price,
                image: image
            }});
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({});
        })
}

module.exports.product_update_post = (req, res) => {
    const id = req.params.id;
    const index= req.params.index;
    const { product } = req.body;
    
    Shop.updateProduct(product, index, id)
        .then( async (shop) => {
            res.status(201).json({ shop: id });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({});
        })
}