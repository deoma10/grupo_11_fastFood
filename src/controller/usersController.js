const { usersModel, newID } = require('../model');
const path = require('path');




const userController = {

    getRegister: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'))
    },

    getLogin: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'));
    },

    getUsers: (req, res) => {
        let users = usersModel.getUsers();
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'users'), { users });
    },

    //Crear Usuarios
    createUser: (req, res) => {
        let user = {};
        user = {
            id: newID('user'),
            ...req.body
        }
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
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'editUser'), { user: user[0]});
    },
    //Editar Usuario
    editUser: (req, res) => {
        let id = parseInt(req.params.id);
        let userGet = usersModel.getUsers().filter(function (k){return k.id == id;})
        user = {
            id: id,
            typeDocument: req.body.typeDocument,
            numDoc: req.body.numDoc,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
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
    }
}

module.exports = userController;