const app = require('./app');
const user = require('./routes/user/user');
app.use('/user', user);