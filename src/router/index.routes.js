const express = require('express');
const router = express.Router();

router.use('/', require('./products.routes'));
router.use('/', require('./users.routes'));

module.exports = router;