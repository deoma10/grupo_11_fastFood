const { body } = require('express-validator');

const loginValidation = [
    body('email').notEmpty().withMessage('Escribe tu correo')
    .isEmail().withMessage('Ingresa un correo válido')
];

module.exports = loginValidation;