const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();

// Implementación de EJS
const rutas = require('./router/index.routes')
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname,  '../public')));

app.set('views', path.resolve(__dirname, './views'));

// Lineas 13 y 14 se pueden borrar, hay que probar que todo funcione , SE REEMPLAZO POR LA LINEA 9
// const publicPath = path.resolve(__dirname, './public');
// app.use(express.static(publicPath));

app.use('/', rutas);


app.listen(port, () => {
    console.log('Servidor corriendo en el puerto 4000');
});