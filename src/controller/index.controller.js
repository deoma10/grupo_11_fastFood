// const model = require("../model/modelo");
const path = require("path");
const fs = require('fs');
const productsFilePath = path.resolve(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const newID = () => {
    let last = 0;
    dataBase.forEach(product => {
        if(product.id > last) {
            last = product.id;
        };
    });
    return last + 1;
};

// controlador
const controller = {
    getIndex: (req,res) => {
        res.render(path.resolve(__dirname, '..','views','products','index'), {products});
    },

    getProductCart: (req, res) => {
        res.render(path.resolve(__dirname, '..','views','products','productCart'));
    },

    getProductDetail: (req, res) => {
        let productId = req.params.id;
        let pId = parseInt(productId)
        if(products[pId-1] != null){
            num = pId -1;
            res.render(path.resolve(__dirname, '..','views','products','productDetail'), {products: products[num]});
        }else {
            res.render(path.resolve(__dirname, '..','views','products','error'))
        }
        
    },

    getProductCreation: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCreation'));
    },

    createProduct: (req, res) => {
        const file = req.file;
        let product = {};
        if(!file) {
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
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productMod'));
    },

    getRegister: (req, res) => {
        res.render(path.resolve(__dirname, '..','views','users','register'))
    },

    getLogin:(req, res) => {
        res.render(path.resolve(__dirname, '..','views','users','login'));
    }
}


// Acá exportamos el resultado
module.exports = controller;