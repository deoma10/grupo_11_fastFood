// const model = require("../model/modelo");
const path = require("path");


// controlador
const controller = {
    getIndex: (req,res) => {
        res.render('./products/index');
    },

    getProductCart: (req, res) => {
        res.render(path.resolve(__dirname, '../views/products/productCart') );
    },

    getProductDetail: (req, res) => {
        res.render(path.resolve(__dirname, '../views/products/productDetail'));
    },

    getRegister: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register'))
    },

    getLogin:(req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login'));
    }
}


// Acá exportamos el resultado
module.exports = controller;