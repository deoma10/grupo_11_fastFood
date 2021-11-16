// const model = require("../model/modelo");
const path = require("path");

// controlador
const controller = {
    getIndex: (req,res) => {
        res.render(path.resolve(__dirname, '..','views','products','index'));
    },

    getProductCart: (req, res) => {
        res.render(path.resolve(__dirname, '..','views','products','productCart'));
    },

    getProductDetail: (req, res) => {
        res.render(path.resolve(__dirname, '..','views','products','productDetail'));
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