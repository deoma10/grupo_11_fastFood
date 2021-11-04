const express = require('express');
const router = express.Router();


// Controller
const controller = require("../controller/index.controller");


router.get('/', controller.getIndex);

router.post('/', controller.getIndex);

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html') );
});

router.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html') );
});

router.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html') );
});

router.post('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html') );
});

router.get('/productCart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html') );
});

router.post('/productCart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html') );
});

module.exports = router;