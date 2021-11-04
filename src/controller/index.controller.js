// const model = require("../model/modelo");
const path = require("path");


// controlador
const controller = {
    getIndex: (req,res) => {
        res.render('./products/index');
    }
}


// Acá exportamos el resultado
module.exports = controller;