console.clear();
const express = require('express');
const user = require('./routes/user/user');
const post = require('./routes/post/post');
const app = express();
require('./db-conect');
app.use(express.json());

app.use('/user', user);
app.use('/post', post);
app.get('/test', (req, res) => res.json("Hello world"));
module.exports = app;