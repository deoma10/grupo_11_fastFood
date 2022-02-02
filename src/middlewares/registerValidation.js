const { body } = require('express-validator');

const registerValidation = [
    body('fk_idDocumentType').notEmpty().withMessage('Selecciona un tipo de documento'),
    body('documentNumber')
        .notEmpty().withMessage('Ingresa tu número de documento')
        .isNumeric().withMessage('Documento no válido'),
    body('Name')
        .notEmpty().withMessage('Escribe tu nombre')
        .isLength({ min: 2 }).withMessage('Escribe un nombre Válido'),
    body('lastName')
        .notEmpty().withMessage('Escribe tu apellido')
        .isLength({ min: 2 }).withMessage('Escribe un Apellido Válido'),
    body('email')
        .notEmpty().withMessage('Diligencia tu Correo Electrónico')
        .isEmail().withMessage('Ingresa un Correo Electrónico valdio'),
    body('password')
        .notEmpty().withMessage('Escribe una contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 carcteres'),
    body('privacyPolicies').custom((value, { req }) => {
        if (value != 'on') {
            throw new Error('Campo obligatorio')
        } else {
            return true;
        }
    })
];

module.exports = registerValidation;