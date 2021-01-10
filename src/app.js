console.clear();
const express = require('express');
const fileUpload = require('express-fileupload');
const user = require('./routes/user/user');
const seeOtherProfile = require('./routes/user/view_profile');
const post = require('./routes/post/post');
const like_unlike = require('./routes/post/like_unlike');
const comment = require('./routes/post/comment');

const cors = require('cors');
const app = express();
require('./db-conect');

app.use(express.json());
app.use(cors());
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

app.use('/user', user);
app.use('/user', seeOtherProfile);
app.use('/post', post);
app.use('/post', like_unlike);
app.use('/post', comment);
app.use((req, res, next) => {
    console.log(req.path);
    next();
});

app.get('/test', (req, res) => res.json("Hello world"));
module.exports = app;