const { usersModel, newID } = require('../model');
const path = require('path');
const bcrypt = require('bcryptjs'); // Paquete bcryptjs para almacenar datos encriptados.
const { validationResult } = require('express-validator');

const routePath = (route) => {
    return path.resolve(__dirname, '..', 'views', 'users', route);
};

const userController = {

    getRegister: (req, res) => {
        if (req.session.userLogged) {
            res.redirect('/')
        } else {
            res.render(routePath('register'))
        }
    },
    //Modulo para mostrar la opcion de perfil solo a los usuarios logeados
    getProfile: (req, res) => {
        let users = usersModel.getUsers();
        // Se crea un if donde si el usuario esta logueado lo deje entrar a la vista profile o sino lo redireccione a la pagina de inicio de sesión
        if (req.session.userLogged) {
            res.render(routePath('profile'), { users })
        }
        else {
            res.redirect('login')
        }
    },

    getLogin: (req, res) => {
        if (req.session.userLogged) {
            res.redirect('/')
        } else {
            res.render(routePath('login'));
        }
    },

    loginProcess: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render(routePath('login'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
            let userToLogin = usersModel.findUserByField('email', req.body.email);
            if (userToLogin) {
                let correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                if (correctPassword) {
                    req.session.userLogged = usersModel.findUserByField('email', req.body.email);
                    delete req.session.userLogged.password;
                    if (req.body.remember != undefined) {  //verificar que el checkbox este activado
                        delete req.body.password //borramos el password de la cookie del usuario localmente para no ser leida en la cookie
                        res.cookie('remember', req.body.email, { maxAge: 1000 * 60 * 60 * 24 * 30 * 12 }) // creamos la cookie llamada remember y le asignamos el usuario
                        //por medio del req.body.email maxAge = tiempo de 1 año
                    }
                    res.redirect('/profile');
                } else {
                    res.render(routePath('login'), {
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
        if (req.session.userLogged && req.session.userLogged.role == 9) {
            let users = usersModel.getUsers();
            res.render(routePath('users'), { users });
        } else {
            res.redirect('/');
        }
    },

    //Crear Usuarios
    createUser: (req, res) => {
        let file = req.file
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            if (file) {
                usersModel.deleteImage(req.file.filename)
            }
            return res.render(routePath('register'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        let user = {};
        if (!file) {
            user = {
                id: newID('user'),
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
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
        res.render(routePath('editUser'), { user: user[0] });
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
    logOut: (req, res) => { // borramos la sesion
        res.clearCookie('remember') // borramos la cookie
        req.session.destroy() // destruimos la sesion (eliminamos el usuario logeado)
        res.redirect('/')
    }
}

module.exports = userController;