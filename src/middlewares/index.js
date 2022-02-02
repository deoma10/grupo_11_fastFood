const multerUpload = require('./multerUpload');
const registerValidation = require('./registerValidation');
const loginValidation = require('./loginValidation');
const editUserValidation = require('./editUserValidation');
const productValidation = require('./productValidation');
const userMulterUpload = require('./userMulterUpload');
const userSession = require('./userSession');
const productModValidation = require('./productModValidation');

module.exports = {
    multerUpload,
    userMulterUpload,
    registerValidation,
    loginValidation,
    editUserValidation,
    productValidation,
    productModValidation,
    userSession
};