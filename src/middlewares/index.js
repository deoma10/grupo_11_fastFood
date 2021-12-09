const multerUpload = require('./multerUpload');
const registerValidation = require('./registerValidation');
const loginValidation = require('./loginValidation');
const productValidation = require('./productValidation');
const userMulterUpload = require('./userMulterUpload');

module.exports = {
    multerUpload,
    userMulterUpload,
    registerValidation,
    loginValidation,
    productValidation
};