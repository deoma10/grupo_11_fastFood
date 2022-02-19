const express = require('express');
const apiUsers = express.Router();
const { apiUsersController } = require('../../controller/apiController')

apiUsers.get('/:id', apiUsersController.getProfile);
apiUsers.get('/', apiUsersController.getUsers);

module.exports = apiUsers;