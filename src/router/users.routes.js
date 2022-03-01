const express = require('express');
const userRouter = express.Router();
const {userController} = require("../controller");
const {userMulterUpload} = require('../middlewares'); // Middleware de Multer pendiente de usar para el Sprint 5
const {registerValidation, editUserValidation, loginValidation} = require('../middlewares');



userRouter.get('/register', userController.getRegister);

userRouter.get('/profile', userController.getProfile);

userRouter.get('/about', userController.getAbout);
userRouter.get('/promotions', userController.getPromotions);

//Crear Usuario
userRouter.post('/register', userMulterUpload.single('userImage'), registerValidation, userController.createUser);

//Editar usuario
userRouter.get('/editUser/:id', userController.updateUser);

userRouter.put('/editUser/:id', userMulterUpload.single('userImage'), editUserValidation, userController.editUser);

//Eliminar usuario
userRouter.delete('/deleteUser/:id', userController.deleteUser);

userRouter.get('/login', userController.getLogin);

userRouter.post('/login', loginValidation,  userController.loginProcess);

userRouter.get('/users', userController.getUsers);

userRouter.get('/logOut', userController.logOut)

module.exports = userRouter;