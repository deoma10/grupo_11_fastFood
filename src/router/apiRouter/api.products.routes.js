const express = require('express');
const apiProducts = express.Router();
const {apiProductsController} = require('../../controller/apiController');

apiProducts.get('/last', apiProductsController.getLastInDb);
apiProducts.get('/:id', apiProductsController.getProductDetail);
apiProducts.get('/', apiProductsController.getProducts);

module.exports = apiProducts;