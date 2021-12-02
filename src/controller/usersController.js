const { usersModel, newID } = require('../model');
const path = require('path');
const fs = require('fs');
const usersFilePath = path.resolve(__dirname, '../model/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const userController = {

    getRegister: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'))
    },

    getLogin: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'));
    },

    getUsers: (req, res) => {
        // const users =
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'users'), { users });
    },

    //Crear Usuarios
    createUser: (req, res) => {
        let user = {};
        user = {
            id: newID('user'),
            // typeDocument: req.body.typeDocument,
            // numDoc: req.body.numDoc,
            // name: req.body.name,
            // lastname: req.body.lastname,
            // email: req.body.email[0],
            // password: req.body.password[0],
            ...req.body
        }
        //Guardar usuario en el array de usuarios
        users.push(user);

        let jsonUsers = JSON.stringify(users, null, 4);
        fs.writeFileSync(usersFilePath, jsonUsers);

        res.redirect('login')
    },
    updateUser: (req, res) => {
        let id = parseInt(req.params.id);

        let user = users.filter(function (k) {
            return k.id == id;
        })
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'editUser'), { user: user[0] });



    },
    //editar usuarios
    editUser: (req, res) => {
        let id = parseInt(req.params.id);

        let user = users.filter(function (k) {
            return k.id == id;
        })

        let allUser = users.filter(function (k) {
            return k.id != id;
        })

        user = {

            id: user[0].id,
            typeDocument: req.body.typeDocument,
            numDoc: req.body.numDoc,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            recibeCorreo: user[0].recibeCorreo,
            politicaPrivacidad: user[0].politicaPrivacidad
        }

        //Guardar usuario en el array de usuarios
        allUser.push(user);

        let jsonUser = JSON.stringify(allUser, null, 4);
        fs.writeFileSync(usersFilePath, jsonUser);

        res.redirect('/')
    },
    deleteUser: (req, res) => {
        let eliminaId = parseInt(req.params.id)

        let updatedFile = users.filter(user => user.id != eliminaId);

        let jsonUser = JSON.stringify(updatedFile, null, 4);
        fs.writeFileSync(usersFilePath, jsonUser);

        res.redirect('/')
    }
}

module.exports = userController;