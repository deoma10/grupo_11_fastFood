const express = require('express');
const userRouter = express.Router();
const {userController} = require("../controller");
const {userMulterUpload} = require('../middlewares'); // Middleware de Multer pendiente de usar para el Sprint 5
const {registerValidation, loginValidation} = require('../middlewares');

userRouter.get('/register', userController.getRegister);

//Crear Usuario
userRouter.post('/register', userMulterUpload.single('userImage'), registerValidation, userController.createUser);

//Editar usuario
userRouter.get('/editUser/:id', userController.updateUser);

userRouter.put('/editUser/:id', userController.editUser);

//Eliminar usuario
userRouter.delete('/deleteUser/:id', userController.deleteUser);

userRouter.get('/login', userController.getLogin);

userRouter.post('/login', loginValidation,  userController.loginProcess);

userRouter.get('/users', userController.getUsers);

userRouter.get('/logOut', userController.logOut)

module.exports = userRouter;