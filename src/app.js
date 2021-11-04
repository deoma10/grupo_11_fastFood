const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();

// Implementación de EJS
const rutas = require('./router/index.routes')
app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.set('views', path.resolve(__dirname, './views'));

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.use('/', rutas);


app.listen(port, () => {
    console.log('Servidor corriendo en el puerto 4000');
});