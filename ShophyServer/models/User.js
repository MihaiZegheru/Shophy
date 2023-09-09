const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    username: {
        type: String,
        required: [true, 'Please enter an username'],
        unique: [true, 'That username is already taken'],
        lowercase: [true, 'Your username must be lowercase'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [5, 'Minimum password length is 6 characters']
    },
    isMerchant: {
        type: Boolean
    },
    shopId: String,
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email: email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    else {
        const user = await this.findOne({ username: email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email/ username');
    }
}

userSchema.statics.setShop = async function (userId, shopId) {

    const user = await this.findById(userId);
    let currShopId = user.shopId;
    if (currShopId) {
        return;
    }

    User.findByIdAndUpdate(userId, {shopId: shopId}, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return result;
        }
    });
}

const User = mongoose.model('user', userSchema);

module.exports = User;