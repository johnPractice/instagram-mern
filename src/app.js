console.clear();
const express = require('express');
const fileUpload = require('express-fileupload');
const user = require('./routes/user/user');
const post = require('./routes/post/post');
const cors = require('cors');
const app = express();
require('./db-conect');
app.use(express.json());
app.use(cors());
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
app.use('/user', user);
app.use('/post', post);
app.get('/test', (req, res) => res.json("Hello world"));
module.exports = app;