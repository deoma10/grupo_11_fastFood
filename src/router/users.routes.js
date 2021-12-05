const express = require('express');
const userRouter = express.Router();
const {userController} = require("../controller");
const {multerUpload} = require('../middlewares'); // Middleware de Multer pendiente de usar para el Sprint 5

userRouter.get('/register', userController.getRegister);

//Crear Usuario
userRouter.post('/register', userController.createUser);

//Editar usuario
userRouter.get('/editUser/:id', userController.updateUser);

userRouter.put('/editUser/:id', userController.editUser);

//Eliminar usuario
userRouter.delete('/deleteUser/:id', userController.deleteUser);

userRouter.get('/login', userController.getLogin);

userRouter.post('/login', userController.getLogin);

userRouter.get('/users', userController.getUsers);

module.exports = userRouter;