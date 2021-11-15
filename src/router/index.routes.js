const express = require('express');
const router = express.Router();


// Controller
const controller = require("../controller/index.controller");

router.get('/', controller.getIndex);

router.post('/', controller.getIndex);


router.get('/productCart', controller.getProductCart);

router.post('/productCart', controller.getProductCart);


router.get('/productDetail/:id', controller.getProductDetail);

router.post('/productDetail/:id', controller.getProductDetail);


router.get('/productCreation', controller.getProductCreation);

router.post('/productCreation', controller.getProductCreation);


router.get('/productMod', controller.getProductMod);

router.post('/productMod', controller.getProductMod);


router.get('/register', controller.getRegister);

router.post('/register', controller.getRegister);


router.get('/login', controller.getLogin);

router.post('/login', controller.getLogin);


module.exports = router;