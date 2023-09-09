const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    shopname: {
        type: String,
        unique: true,
        required: [true, 'Please enter a shop name'],
    },
    ownerId: {
        type: String,
        required: true
    },
    position : {
        lng: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    },
    products: {
        names: {
            type: [String],
            required: [true, 'Please enter a product name']
        },
        shortdescriptions: {
            type: [String],
            required: [true, 'Please enter a product description']
        },
        descriptions: {
            type: [String],
            required: [true, 'Please enter a product description']
        },
        prices: {
            type: [String],
            required: [true, 'Please enter a price']
        },
        images: {
            type: [String]
        }
    }
});

shopSchema.statics.addProduct = async function (product, shopId) {
    const shop = await this.findById(shopId);
    let products = shop.products;
    console.log(products.names.length);

    let names = [];
    let shortdescriptions = [];
    let descriptions = [];
    let prices = [];
    let images = [];

    for (let i = 0; i < products.names.length; i++) {
        names.push(products.names[i]);
        shortdescriptions.push(products.shortdescriptions[i]);
        descriptions.push(products.descriptions[i]);
        prices.push(products.prices[i]);
        images.push(products.images[i]);
    }

    names.push(product.name);
    shortdescriptions.push(product.shortdescription);
    descriptions.push(product.description);
    prices.push(product.price);
    images.push(product.image);

    products = {names: names, shortdescriptions: shortdescriptions, 
        descriptions: descriptions, prices: prices, images: images};

    Shop.findByIdAndUpdate(shopId, {products: products}, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return result;
        }
    });
}

shopSchema.statics.updateProduct = async function (product, productIndex, shopId) {
    const shop = await this.findById(shopId);
    let products = shop.products;
    console.log(products.names.length);

    let names = [];
    let shortdescriptions = [];
    let descriptions = [];
    let prices = [];
    let images = [];

    for (let i = 0; i < products.names.length; i++) {
        names.push(products.names[i]);
        shortdescriptions.push(products.shortdescriptions[i]);
        descriptions.push(products.descriptions[i]);
        prices.push(products.prices[i]);
        images.push(products.images[i]);
    }

    names[productIndex] = product.name;
    shortdescriptions[productIndex] = product.shortdescription;
    descriptions[productIndex] = product.description;
    prices[productIndex] = product.price;
    images[productIndex] = product.image;

    products = {names: names, shortdescriptions: shortdescriptions, 
        descriptions: descriptions, prices: prices, images: images};

    Shop.findByIdAndUpdate(shopId, {products: products}, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return result;
        }
    });
}

const Shop = mongoose.model('shop', shopSchema);

module.exports = Shop;