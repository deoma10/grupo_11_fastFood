const express = require('express');
const productRouter = express.Router();
const {productController} = require("../controller");
const {multerUpload, productValidation} = require('../middlewares');

productRouter.get('/', productController.getIndex);

productRouter.get('/productCart', productController.getProductCart);

productRouter.get('/productDetail/:id', productController.getProductDetail);

productRouter.get('/productCreation', productController.getProductCreation);

// Crear producto
productRouter.post('/', multerUpload.single('productImage'), productValidation, productController.createProduct);

productRouter.get('/productMod/:id', productController.getProductMod);

productRouter.put('/productMod/:id', multerUpload.single('productImage'), productController.editProduct);

// Eliminar producto
productRouter.get('/productDelete/:id', productController.deleteProducts);

module.exports = productRouter;