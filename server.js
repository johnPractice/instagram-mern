const app = require('./src/app');
const port = 5000;

app.listen(port, () => {
    console.log(`server is running ar port ${port}`);
});