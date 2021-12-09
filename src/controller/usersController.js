const { usersModel, newID } = require('../model');
const path = require('path');
const bcrypt = require('bcryptjs'); // Paquete bcryptjs para almacenar datos encriptados.
const { validationResult } = require('express-validator');

const userController = {

    getRegister: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'))
    },

    getLogin: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'));
    },

    loginProcess: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
            let userToLogin = usersModel.findUserByField('email', req.body.email);
            if (userToLogin) {
                let correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                if (correctPassword) {
                    if(req.body.remember!=undefined){  //verificar que el checkbox este activado
                        delete req.body.password //borramos el password de la cookie del usuario localmente para no ser leida en la cookie
                        res.cookie('remember', req.body.email, {maxAge: 60000}) // creamos la cookie llamada remember y le asignamos el usuario
                        //por medio del req.body.email maxAge = tiempo de 1minuto
                }
                    res.redirect('/users');
                } else {
                    res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'), {
                        errors: {
                            auth: {
                                msg: 'Error en autenticación'
                            }
                        }
                    })
                }
            }         
        }
    },

    getUsers: (req, res) => {
        let users = usersModel.getUsers();
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'users'), { users });
    },

    //Crear Usuarios
    createUser: (req, res) => {
        let file = req.file
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        let user = {};
        if (!file) {
            user = {
                id: newID('user'),
                ...req.body,
                userImage: 'default-image.png'
            }
        } else {
            user = {
                id: newID('user'),
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
                userImage: req.file.filename
            }
        };

        //Guardar usuario en el array de usuarios
        usersModel.createUsers(user)
        res.redirect('login')
    },
    // Vista para Modificar Usuario
    updateUser: (req, res) => {
        let id = parseInt(req.params.id);
        let users = usersModel.getUsers();
        let user = users.filter(function (k) {
            return k.id == id;
        })
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'editUser'), { user: user[0] });
    },
    //Editar Usuario
    editUser: (req, res) => {
        let id = parseInt(req.params.id);
        let userGet = usersModel.getUsers().filter(function (k) { return k.id == id; })
        user = {
            id: id,
            typeDocument: req.body.typeDocument,
            numDoc: req.body.numDoc,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            recibeCorreo: userGet[0].recibeCorreo,
            politicaPrivacidad: userGet[0].politicaPrivacidad
        }
        //Guardar usuario en el array de usuarios
        usersModel.updateUsers(id, user)
        res.redirect('/')
    },
    deleteUser: (req, res) => {
        let id = parseInt(req.params.id)
        usersModel.deleteUser(id)
        res.redirect('/')
    },
    logOut: (req,res) =>{ // borramos la sesion
        res.clearCookie('remember') // borramos la cookie
        req.session.destroy() // destruimos la sesion (eliminamos el usuario logeado)
        res.redirect('/')
    }
}

module.exports = userController;