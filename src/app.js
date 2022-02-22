const express = require('express'); // Requerir el framework Express
const path = require('path'); // Requerir el módulo Path
const port = process.env.PORT || 4000;
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const {userSession} = require('./middlewares')
const cookie = require('cookie-parser');
const cors = require('cors');
app.use(cors());

app.use(session({secret: 'la clave que no van a decifrar'}))
app.use(cookie())//usamos la cookie de manera general
app.use(userSession) //llamamos la funcion donde se procesa la cookie y se envia a la vista de EJS

// Implementación de EJS
const rutas = require('./router/index.routes')
const apiRutas = require('./router/apiRouter/api.index.routes')
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname,  '..', 'public')));
app.use(express.urlencoded({extended: false})); // Middleware que recoge información de los formularios
app.use(express.json()); // Complemento de URL encoded

app.set('views', path.resolve(__dirname, './views'));

//Metodo para Edit y delete
app.use(methodOverride('_method'));

app.use('/', rutas);
app.use('/api', apiRutas);


app.listen(port, () => {
console.log(`Server running in port: ${port}`);
});