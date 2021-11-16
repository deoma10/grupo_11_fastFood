// const model = require("../model/modelo");
const path = require("path");
const fs = require('fs')
const productsFilePath = path.resolve(__dirname, '../data/products.json');
const dataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// controlador
const controller = {
    getIndex: (req,res) => {
        res.render(path.resolve(__dirname, '..','views','products','index'));
    },

    getProductCart: (req, res) => {
        res.render(path.resolve(__dirname, '..','views','products','productCart'));
    },

    getProductDetail: (req, res) => {
        let productId = req.params.id;
        let pId = parseInt(productId)
        pId += 1;
        console.log(dataBase[0].price)
        if(pId == dataBase[pId]){
            res.render(path.resolve(__dirname, '..','views','products','productDetail'), {dataBase: dataBase});
        }else {
            res.render(path.resolve(__dirname, '..','views','products','index'))
        }
        
    },

    getProductCreation: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCreation'));
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