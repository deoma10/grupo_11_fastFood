const { body } = require('express-validator');

const registerValidation = [
    body('typeDocument').notEmpty().withMessage('Selecciona un tipo de documento'),
    body('numDoc')
        .notEmpty().withMessage('Ingresa tu número de documento')
        .isNumeric().withMessage('Documento no válido'),
    body('name').notEmpty().withMessage('Escribe tu nombre'),
    body('lastname').notEmpty().withMessage('Escribe tu apellido'),
    body('email')
        .notEmpty().withMessage('Diligencia tu Correo Electrónico')
        .isEmail().withMessage('Ingresa un Correo Electrónico valdio'),
    body('password').notEmpty().withMessage('Escribe una contraseña'),
    body('politicaPrivacidad').custom((value, { req }) => {
        if(value != 'on') {
            throw new Error('Campo obligatorio')
        } else {
            return true;
        }
      })
];

module.exports = registerValidation;