const { body } = require('express-validator');

const editUserValidation = [
    body('documentNumber')
        .notEmpty().withMessage('No dejes éste campo vacío')
        .isNumeric().withMessage('Documento no válido'),
    body('Name').notEmpty().withMessage('No dejes éste campo vacío'),
    body('lastName').notEmpty().withMessage('No dejes éste campo vacío'),
    body('email')
        .notEmpty().withMessage('No dejes éste campo vacío')
        .isEmail().withMessage('Ingresa un Correo Electrónico valdio')
];

module.exports = editUserValidation;