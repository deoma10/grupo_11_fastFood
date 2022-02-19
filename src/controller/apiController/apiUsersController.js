const { usersModel, imagesModel } = require('../../model');

const apiUsersController = {
    getUsers: async (req, res) => {
        try {
            let usersInDB = await usersModel.getAllUsers();
            let totalUsers = usersInDB.length;
            let users = usersInDB.map((user) => {
                return newUser = {
                    idUser: user.idUser,
                    documentNumber: user.documentNumber,
                    Name: user.Name,
                    lastName: user.lastName,
                    email: user.email,
                    imageName: user.fk_idImage_image.name
                }
            })
            users = [{count: totalUsers}, [...users]]
            res.json(users);
        }
        catch (err) {
            res.json({ error: 'Error 504' });
        }

    },
    getProfile: async (req, res) => {
        try {
            let user = await usersModel.findUserByField("idUser", req.params.id);
            newUser = {
                idUser: user.idUser,
                documentNumber: user.documentNumber,
                Name: user.Name,
                lastName: user.lastName,
                email: user.email,
                imageName: user.fk_idImage_image.name
            }
            res.json(newUser)
        } catch(err) {
            res.json({ error: 'Error 404' });
        }    
    }
};

module.exports = apiUsersController;