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

    updateUsers: function (id, user) {
        const indiceBuscado = this.getUsers().findIndex(user => user.id == id);
        if(indiceBuscado < 0) {
            return 'User does not exist in database';
        }
        let newUsersFile = this.getUsers()
        user = {
            ...user,
            role: 1
        };
        newUsersFile[indiceBuscado] = user
        this.writeFile(newUsersFile);
        return 'Users succesfully updated'
    },

    deleteImage: function(fileName) {
        fs.unlinkSync(path.resolve(__dirname, '../../public/img/users/' + fileName));
    },

    deleteUser: function (id) {
        const newUsersFile = this.getUsers().filter(users => users.id != id);
        const oldUser = this.getUsers().filter(user => user.id == id);
        const fileName = oldUser[0].userImage;
        this.deleteImage(fileName);
        this.writeFile(newUsersFile);
    }
};

module.exports = usersModel;

const productsModel = {
 
  
    
    updateProduct: async function (id, product) {
        try {
            if (product.productImage) {
                //consultar el producto antes de editarlo por id
                let oldProduct = await this.getOneProduct(id);
                // creamos nueva imagen en BD
                await imagesModel.createImage(product.productImage);
                // consultamos el id de la imagen recien creada
                let newImage = await imagesModel.getOneImage('name', product.productImage);
                await db.Product.update({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    fk_idImage: newImage.idImage
                }, {
                    where: {
                        idProducts: id
                    }
                })
                await imagesModel.deleteImage('Products', oldProduct.fk_idImage);
            } else {
                await db.Product.update({
                    name: product.name,
                    description: product.description,
                    price: product.price
                }, {
                    where: {
                        idProducts: id
                    }
                })
            }
        } catch (err) {
            console.log(err);
        }
    },
    deleteProduct: async function (id) {
        try {
            let oldProduct = await this.getOneProduct(id);
            console.log(oldProduct);
            await db.Product.destroy({
                where: {
                    idProducts: id
                }
            })
            await imagesModel.deleteImage('Products', oldProduct.fk_idImage);
        } catch (err) {
            console.log(err);
        }
    }
};