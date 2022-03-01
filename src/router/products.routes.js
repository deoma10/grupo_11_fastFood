const express = require('express');
const productRouter = express.Router();
const {productController} = require("../controller");
const {multerUpload, productValidation, productModValidation} = require('../middlewares');

productRouter.get('/', productController.getIndex);

productRouter.get('/productCart', productController.getProductCart);

//Detalle de producto
productRouter.get('/productDetail/:id', productController.getProductDetail);

//listado de detalle de todos los producto
productRouter.get('/productList', productController.getProductList);

productRouter.get('/productCreation', productController.getProductCreation);

// Crear producto
productRouter.post('/', multerUpload.single('productImage'), productValidation, productController.createProduct);

productRouter.get('/productMod/:id', productController.getProductMod);

// Editar producto
productRouter.put('/productMod/:id', multerUpload.single('productImage'), productModValidation, productController.editProduct);

// Eliminar producto
productRouter.delete('/productDelete/:id', productController.deleteProducts);

//Tabla de productos
productRouter.get('/products', productController.getProducts);

//Administador
productRouter.get('/admin', productController.getAdmin);

//Tiendas
productRouter.get('/store', productController.getStore);

productRouter.get('/error', productController.getError);

module.exports = productRouter;