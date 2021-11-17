const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();
const methodOverride = require('method-override');

// Implementación de EJS
const rutas = require('./router/index.routes')
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname,  '..', 'public')));

app.set('views', path.resolve(__dirname, './views'));

//Metodo para Edit y delete
app.use(methodOverride('_method'));

app.use('/', rutas);


app.listen(port, () => {
    console.log('Servidor corriendo en el puerto 4000');
});