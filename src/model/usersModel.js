const db = require('../database/models')
const imagesModel = require('./imagesModel')

const usersModel = {
    getUsers: async function () {
        try {
            let user = await db.User.findAll(
                {
                    where: {
                        activated: 1
                    }
                },
                {
                include: [{ association: 'image' },{association: 'docType' }]
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
                    user = await db.User.findByPk(value,{
                        include: [{association: 'image'}]
                    })
                    break;
                case 'email':
                    user = await db.User.findOne(
                        { where: { email: value },
                        include: [{association: 'image'}]}
                    );
                    break;
            }
            return user
        } catch(err) {
            console.log(err);
        }
    },

    getOneImage: async function (field, value) {
        try {
            let image;
            switch (field) {
                case 'idImage':
                    image = await db.Image.findByPk(value)
                    break;
                case 'name':
                    image = await db.Image.findOne(
                        { where: { name: value } }
                    );
                    break;
            }
            console.log(image)
            return image
        } catch(err) {
            console.log(err);
        }
    },

    writeFile: function (file) {
        return fs.writeFileSync(
            path.resolve(__dirname, '../data/users.json'),
            JSON.stringify(file, null, 4),
            { encoding: 'utf-8' }
        );
    },

    getDocumentsDatabase: async function() {
        try{
           let documents = await db.DocumentType.findAll();
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
                await db.User.create({
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

    createProduct: async function (product) {
       
    },

    updateUsers: async function (id, user) {
        try{
            console.log(user)
            await db.User.update({
                documentNumber: user.documentNumber,
                Name: user.Name,
                lasName: user.lastName,
                email: user.email
            }, {where: {idUser:id}})
        }catch(err){
            console.log(err);
        }
    },

    deleteImage: function(fileName) {
        fs.unlinkSync(path.resolve(__dirname, '../../public/img/users/' + fileName));
    },

    deleteUser: async function (id) {
        try{
            await db.User.update({activated: 0}, {where: {idUser:id}})
        }catch(err){
            console.log(err);
        }
    }
};

module.exports = usersModel;
