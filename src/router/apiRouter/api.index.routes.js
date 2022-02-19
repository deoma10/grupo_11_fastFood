const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/products', require('./api.products.routes'));
apiRouter.use('/users', require('./api.users.routes'));

module.exports = apiRouter;