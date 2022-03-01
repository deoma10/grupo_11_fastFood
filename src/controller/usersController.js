const { usersModel, imagesModel } = require('../model');
const path = require('path');
const bcrypt = require('bcryptjs'); // Paquete bcryptjs para almacenar datos encriptados.
const { validationResult } = require('express-validator');

const routePath = (route) => {
    return path.resolve(__dirname, '..', 'views', 'users', route);
};

const userController = {

    getRegister: async function (req, res) {
        try {
            if (req.session.userLogged) {
                res.redirect('/')
            } else {
                let documents = await usersModel.getDocumentsDatabase();
                res.render(routePath('register'), { documents })
            }
        }
        catch (err) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'), {err});
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
    getAbout:  (req, res) => {
        res.render(routePath('aboutUs'))
    },

    getPromotions: (req, res) => {
        res.render(routePath('promotions'))
    },

    getLogin: (req, res) => {
        if (req.session.userLogged) {
            res.redirect('/')
        } else {
            res.render(routePath('login'));
        }
    },

    loginProcess: async function (req, res) {
        try {
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render(routePath('login'), {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                })
            } else {
                let userToLogin = await usersModel.findUserByField('email', req.body.email);

                if (userToLogin) {
                    let correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                    if (correctPassword) {
                        req.session.userLogged = await usersModel.findUserByField('email', req.body.email);
                        delete req.session.userLogged.password;
                        if (req.body.remember != undefined) {  //verificar que el checkbox este activado
                            delete req.body.password //borramos el password de la cookie del usuario localmente para no ser leida en la cookie
                            res.cookie('remember', req.body.email, { maxAge: 1000 * 60 * 60 * 24 * 30 * 12 }) // creamos la cookie llamada remember y le asignamos el usuario
                            //por medio del req.body.email maxAge = tiempo de 1 año
                        }
                        res.redirect('/profile');
                    }
                    else {
                        res.render(routePath('login'), {
                            errors: {
                                auth: {
                                    msg: 'Error en autenticación'
                                }
                            }
                        })
                    }
                } else {
                    res.render(routePath('login'), {
                        errors: {
                            auth: {
                                msg: 'Usuario no existe'
                            }
                        }
                    })
                }
            }
        }
        catch (err) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'), {err})
        }
    },

    getUsers: async (req, res) => {
        try {
            if (req.session.userLogged && req.session.userLogged.rol == 9) {
                let users = await usersModel.getUsers();
                res.render(routePath('users'), { users });
            } else {
                res.redirect('/');
            }
        }
        catch (err) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'), {err})
        }

    },

    //Crear Usuarios
    createUser: async function (req, res) {
        try {
            let file = req.file
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                if (file) {
                    imagesModel.deleteImageFile('users', req.file.filename)
                }
                let documents = await usersModel.getDocumentsDatabase();
                return res.render(routePath('register'), {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    documents
                })
            }
            let verifyEmail = await usersModel.findUserByField('email', req.body.email)
            if(verifyEmail) {
                let documents = await usersModel.getDocumentsDatabase();
                return res.render(routePath('register'), {
                    errors: {
                        email: {
                            msg: 'Éste email ya está registrado'
                        }
                    },
                    oldData: req.body,
                    documents
                })
            } else {
                let user = {};
            if (!file) {
                user = {
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, 10),
                    userImage: 'default-image.png'
                }
            } else {
                user = {
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, 10),
                    userImage: req.file.filename
                }
            };

            //Guardar usuario en el array de usuarios
            usersModel.createUsers(user)
            res.redirect('login')
            }
        } catch (err) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'), {err})
        }
    },
    // Vista para Modificar Usuario
    updateUser: async (req, res) => {
        try {
            let user = await usersModel.findUserByField('idUser', parseInt(req.params.id))
            res.render(routePath('editUser'), { user });

        } catch (err) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'), {err})
        }
    },
    //Editar Usuario
    editUser: async (req, res) => {
        try {
            let file = req.file
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                if (file) {
                    imagesModel.deleteImageFile('users', req.file.filename)
                }
                let user = await usersModel.findUserByField('idUser', parseInt(req.params.id))
                return res.render(routePath('editUser'), {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    user
                })
            }
            let user = {};
            if (!file) {
                user = {
                    ...req.body
                }
            } else {
                user = {
                    ...req.body,
                    userImage: req.file.filename
                }
            };
            await usersModel.updateUsers(parseInt(req.params.id), user)
            let newUser = await usersModel.findUserByField('idUser', req.params.id);
            if (newUser.email == req.session.userLogged.email) {
                req.session.userLogged = newUser;
                delete req.session.userLogged.password;
                if (res.cookie.remember) {
                    res.clearCookie('remember');
                    res.cookie('remember', req.body.email, { maxAge: 1000 * 60 * 60 * 24 * 30 * 12 });
                }
            }
            res.redirect('/')
        } catch (err) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'), {err})
        }
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