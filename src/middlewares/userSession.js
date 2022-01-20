const {usersModel} = require('../model')

async function userSession (req, res, next){
    let user = undefined;
    res.locals.isLogged = false; // se crea un locals llamado isLogged con parametro falso para la vista EJS
    let userLog = req.cookies.remember; //requerir la coockie creada en userController
    if(userLog!=undefined){
        user = await usersModel.findUserByField('email', userLog) //buscar al usuario por email con la cookie creada
    }
    if(user!=undefined){
        delete user.password; //borrar la contraseña del usuario localmente
        req.session.userLogged = user //asignar a la session el usuario logeado
    }
    if(req.session.userLogged){ //verificar que el usuario este logeado
        res.locals.isLogged = true; // si esta logeado cambia el loged a true
        res.locals.userInSession = req.session.userLogged //le enviamos a la vista EJS el usuario que se logeo
    }
    next()
}

module.exports = userSession;