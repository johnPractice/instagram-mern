const mongoose = require('mongoose');
const { mongoUrl, mongoLocal } = require('./key');
try {
    mongoose.connect(mongoLocal, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log('db conected :)');
} catch (e) {
    console.error(e);
}