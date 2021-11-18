// const model = require("../model/modelo");
const path = require("path");
const fs = require('fs');
const { parse } = require("path");
const productsFilePath = path.resolve(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const newID = () => {
    let last = 0;
    products.forEach(product => {
        if (product.id > last) {
            last = product.id;
        };
    });
    return last + 1;
};

// controlador
const controller = {
    getIndex: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'index'), { products });
    },

    getProductCart: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCart'));
    },

    getProductDetail: (req, res) => {
        let productId = req.params.id;
        let pId = parseInt(productId)
        
        products.filter(k => {
            if(k.id == pId){
            return    res.render(path.resolve(__dirname, '..','views','products','productDetail'), {products: k.id});
        }else {
            return res.render(path.resolve(__dirname, '..','views','products','error'))
        }            
    },

    getProductCreation: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCreation'));
    },

    createProduct: (req, res) => {
        const file = req.file;
        let product = {};
        if (!file) {
            product = {
                id: newID(),
                ...req.body,
                productImage: 'default-image.png'
            }
        } else {
            product = {
                id: newID(),
                ...req.body,
                productImage: req.file.filename
            }
        };

        //Guardar producto en el array de productos
        products.push(product);

        let jsonProducts = JSON.stringify(products, null, 4);
        fs.writeFileSync(productsFilePath, jsonProducts);

        res.redirect('/')
    },

    getProductMod: (req, res) => {
        let productId = req.params.id;
        let pId = parseInt(productId)
        
         if(products[pId-1] != null){
            num = pId -1;
            res.render(path.resolve(__dirname, '..','views','products','productMod'), {product: products[num]});
        }else {
            res.render(path.resolve(__dirname, '..','views','products','error'))
        }
    },

    editProduct: (req, res) => {
        const file = req.file;
        let asignaId = parseInt(req.params.id);
        let productos = products.filter(item => item.id != req.params.id);
        let productoEditado = products.filter(item => item.id == parseInt(req.params.id));
        if (!file) {
            productoEditado = {
                id: asignaId,
                ...req.body,
                productImage: productoEditado.productImage
            }
        } else {
            productoEditado = {
                id: asignaId,
                ...req.body,
                productImage: req.file.filename
            }
        };
        //Guardar producto en el array de productos
        productos.push(productoEditado);

        let jsonProducts = JSON.stringify(productos, null, 4);
        fs.writeFileSync(productsFilePath, jsonProducts);

        res.redirect('/')
    },

    getRegister: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'))
    },

    getLogin: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'));
    }
}


// Acá exportamos el resultado
module.exports = controller;