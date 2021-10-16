const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html') );
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html') );
});

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto 4000');
});