const { productsModel,newID } = require('../model');
const path = require('path');
const { validationResult } = require('express-validator');


const productController = {
    getIndex: (req, res) => {
        const products = productsModel.getProducts();
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'index'), {products} );
    },

    getProducts: (req, res) => {
        const products = productsModel.getProducts();
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'products'), { products });
    },

    getProductCart: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCart'));
    },

    // Visualizacion individual de cada producto del Index
    getProductDetail: (req, res) => {
        const products = productsModel.getProducts();
        let productId = req.params.id;
        let pId = parseInt(productId);
        let result = products.filter(function (k) {
            return k.id == pId;
        })
        if (result != []) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'productDetail'), { products: result[0] });
        } else {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'))
        }
    },
    getProductList: (req, res) => {
        const products = productsModel.getProducts();
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productList'), { products: products });
    },

    getProductCreation: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCreation'));
    },

    //Crear productos
    createProduct: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCreation'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        const file = req.file;
        let product = {};
        if (!file) {
            product = {
                id: newID('product'),
                ...req.body,
                productImage: 'default-image.png'
            }
        } else {
            product = {
                id: newID('product'),
                ...req.body,
                productImage: req.file.filename
            }
        };

        //Guardar producto en el array de productos
        productsModel.createProduct(product);


        res.redirect('/')
    },

    getProductMod: (req, res) => {
        const products = productsModel.getProducts();
        let productId = req.params.id;
        let pId = parseInt(productId)
        let result = products.filter(function (k) {
            return k.id == pId;
        })
        if (result != []) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'productMod'), { product: result[0] });
        } else {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'))
        }
    },

    // Modificar productos
    editProduct: (req, res) => {
        const file = req.file;
        let asignaId = parseInt(req.params.id);
        product = {};
        if (!file) {
            product = {
                id: asignaId,
                ...req.body
            }
        } else {
            product = {
                id: asignaId,
                ...req.body,
                productImage: req.file.filename
            }
        };

        productsModel.updateProduct(asignaId, product);

        res.redirect('/')
    },

    //Eliminar productos
    deleteProducts: (req, res) => {
        let idProduct = parseInt(req.params.id);

        productsModel.deleteProduct(idProduct);

        res.redirect('/')
    }
}

module.exports = productController;