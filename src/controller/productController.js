const { productsModel, newID, imagesModel } = require('../model');
const path = require('path');
const { validationResult } = require('express-validator');


const routePath = (route) => {
    return path.resolve(__dirname, '..', 'views', 'products', route);
};

const productController = {
    getIndex: async (req, res) => {
        try {
            const products = await productsModel.getProducts();
            res.render(routePath('index'), { products });
        } catch (err) {
            res.render(routePath('error'), { err });
        }
    },

    getProducts: async (req, res) => {
        try {
            if (req.session.userLogged && req.session.userLogged.rol == 9) {
                const products = await productsModel.getProducts();
                res.render(routePath('products'), { products });
            } else {
                res.redirect('/');
            }
        } catch (err) {
            res.render(routePath('error'), { err });
        }

    },

    getProductCart: (req, res) => {
        res.render(routePath('productCart'),);
    },

    // Visualizacion individual de cada producto del Index
    getProductDetail: async (req, res) => {
        try {
            let product = await productsModel.getOneProduct(req.params.id);
            res.render(routePath('productDetail'), { product });
        } catch (err) {
            res.render(routePath('error'), { err });
        }
    },
    getProductList: async (req, res) => {
        try {
            const products = await productsModel.getProducts();
            res.render(routePath('productList'), { products: products });
        } catch (err) {
            res.render(routePath('error'), { err });
        }
    },

    getProductCreation: (req, res) => {
        if (req.session.userLogged && req.session.userLogged.rol == 9) {
            res.render(routePath('productCreation'));
        } else {
            res.redirect('/');
        }
    },

    //Crear productos
    createProduct: (req, res) => {
        const file = req.file;
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            if (file) {
                imagesModel.deleteImageFile(req.file.filename)
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

    getProductMod: async (req, res) => {
        try {
            if (req.session.userLogged && req.session.userLogged.rol == 9) {
                const product = await productsModel.getOneProduct(req.params.id)
                res.render(routePath('productMod'), { product });
            } else {
                res.redirect('/');
            }
        } catch (err) {
            res.render(routePath('error'), { err });
        }
    },

    // Modificar productos
    editProduct: async (req, res) => {
        try {
            const file = req.file;
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                if (file) {
                    imagesModel.deleteImageFile(req.file.filename)
                }
                const product = await productsModel.getOneProduct(req.params.id)
                return res.render(routePath('productCreation'), {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    product
                })
            }
            let asignaId = parseInt(req.params.id);
            product = {};
            if (!file) {
                product = {
                    ...req.body
                }
            } else {
                product = {
                    ...req.body,
                    productImage: req.file.filename
                }
            };

            await productsModel.updateProduct(asignaId, product);

            res.redirect('/')
        } catch (err) {
            res.render(routePath('error'), { err });
        }
    },

    //Eliminar productos
    deleteProducts: async (req, res) => {
        try {
            await productsModel.deleteProduct(parseInt(req.params.id));
            res.redirect('/')
        } catch (err) {
            res.render(routePath('error'), { err });
        }
    },

    //Vista de Admin
    getAdmin: (req, res) => {
        if (req.session.userLogged && req.session.userLogged.rol == 9) {
            res.render(routePath('admin'));
        } else {
            res.redirect('/');
        }
    },

    getStore: (req, res) => {
        res.render(routePath('store'))
    },

    getError: (req, res) => {
        res.render(routePath('error'));
    }
}

module.exports = productController;