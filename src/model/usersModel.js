const db = require('../database/models')
const imagesModel = require('./imagesModel')

const usersModel = {
    getUsers: async function () {
        try {
            let user = await db.users.findAll(
                {
                    where: {
                        activated: 1
                    }
                },
                {
                include: [{ association: 'fk_idImage_image' },{association: 'fk_idDocumentType_documenttype' }]
            });
            return user;
        } catch (err) {
            console.log(err);
        }
    },

    findUserByField: async function(field, value) {
         try {
            let user;
            switch (field) {
                case 'idUser':
                    user = await db.users.findByPk(value,{
                        include: [{association: 'fk_idImage_image'}]
                    })
                    break;
                case 'email':
                    user = await db.users.findOne(
                        { where: { email: value },
                        include: [{association: 'fk_idImage_image'}]}
                    );
                    break;
            }
            return user
        } catch(err) {
            console.log(err);
        }
    },

    getDocumentsDatabase: async function() {
        try{
           let documents = await db.documenttypes.findAll();
           return documents;
        }
        catch(err){
            console.log(err);
        }
    },

    createUsers: async function (user) {
            try {
                await imagesModel.createImage(user.userImage);
                let newImage = await imagesModel.getOneImage('name', user.userImage);
                await db.users.create({
                    documentNumber: user.documentNumber,
                    Name: user.Name,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    receivesEmail: user.receivesEmail,
                    privacyPolicies: user.privacyPolicies,
                    rol: 1,
                    activated: 1,
                    fk_idImage: newImage.idImage,
                    fk_idDocumentType: user.fk_idDocumentType
                })
            } catch (err) {
                console.log(err);
                let newImage = await imagesModel.getOneImage('name', user.userImage);
                await imagesModel.deleteImage('users', newImage.idImage);
            }
    },

    updateUsers: async function (id, user) {
        try{
            if (user.userImage) {
                //consultar el user antes de editarlo por id
                let oldUser = await this.findUserByField('idUser', id);
                // creamos nueva imagen en BD
                await imagesModel.createImage(user.userImage);
                // consultamos el id de la imagen recien creada
                let newImage = await imagesModel.getOneImage('name', user.userImage);
                console.log(user);
                await db.users.update({
                    documentNumber: oldUser.documentNumber,
                    Name: user.Name,
                    lastName: user.lastName,
                    email: user.email,
                    fk_idImage: newImage.idImage
                }, {where: {idUser:id}})
                await imagesModel.deleteImage('users', oldUser.fk_idImage);
            } else {
                console.log(user);
                await db.users.update({
                    documentNumber: user.documentNumber,
                    Name: user.Name,
                    lastName: user.lastName,
                    email: user.email
                }, {where: {idUser:id}})
            }
        } catch (err) {
            console.log(err);
        }
    },

    deleteUser: async function (id) {
        try{
            await db.users.update({activated: 0}, {where: {idUser:id}})
        }catch(err){
            console.log(err);
        }
    }
};

module.exports = usersModel;
