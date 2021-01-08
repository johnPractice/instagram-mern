const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../key');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("check email");
            }
        },
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// generate auth token
userSchema.methods.genAuth = async function() {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, jwtKey);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};
userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    // delete userObject._id;
    // delete userObject.id;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.__v;
    return userObject;
};
userSchema.statics.checUserByEmail = async(email) => {
    const check = await userModel.findOne({ email: email });
    if (check != null) throw new Error('email is use by other user');
    return true;
};
userSchema.statics.loginByEmail = async({ email, password }) => {
    const user = await userModel.findOne({ email: email });
    if (!user) throw new Error('can not fine the user');
    const passChec = await bcrypt.compare(password, user.password);
    if (!passChec) throw new Error('passrd is not valid thing')
    return user;
};
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;