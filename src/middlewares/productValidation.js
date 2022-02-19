const { body } = require('express-validator');
const path = require('path');

const productValidation = [
    body('name')
        .notEmpty().withMessage('Ingresa el nombre del producto')
        .isLength({ min: 5 }).withMessage('Escribe un nombre de producto Válido'),
    body('description')
        .notEmpty().withMessage('Coloca la descripción de tu producto')
        .isLength({ min: 20 }).withMessage('Escribe una descripción de tu producto'),
    body('price')
        .notEmpty().withMessage('Ingresa el valor del producto')
        .isNumeric().withMessage('Ingresa el valor en números'),
    body('productImage').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif','.PNG'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
            return true;
        }

        return true;
    })
];

module.exports = productValidation;