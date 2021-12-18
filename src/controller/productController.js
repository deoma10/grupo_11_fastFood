const { productsModel,newID } = require('../model');
const path = require('path');
const { validationResult } = require('express-validator');

const routePath = (route) => {
    return path.resolve(__dirname, '..', 'views', 'products', route);
};

const productController = {
    getIndex: (req, res) => {
        const products = productsModel.getProducts();
        res.render(routePath('index'), {products} );
    },

    getProducts: (req, res) => {
        const products = productsModel.getProducts();
        res.render(routePath('products'), { products });
    },

    getProductCart: (req, res) => {
        res.render(routePath('productCart'),);
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
            res.render(routePath('productDetail'), { products: result[0] });
        } else {
            res.render(routePath('error'))
        }
    },
    getProductList: (req, res) => {
        const products = productsModel.getProducts();
        res.render(routePath('productList'), { products: products });
    },

    getProductCreation: (req, res) => {        
        res.render(routePath('productCreation'));
    },

    //Crear productos
    createProduct: (req, res) => {
        const file = req.file;
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            if(file) {
                productsModel.deleteImage(req.file.filename)
            }
            return res.render(routePath('productCreation'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
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
            res.render(routePath('productMod'), { product: result[0] });
        } else {
            res.render(routePath('error'))
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
    },

    //Vista de Admin
    getAdmin: (req, res) => {
        res.render(routePath('admin'));
    }
}

module.exports = productController;