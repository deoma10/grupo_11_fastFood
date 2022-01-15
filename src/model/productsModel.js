const db = require('../database/models')
const imagesModel = require('./imagesModel')

const productsModel = {
    getProducts: async function () {
        try {
            let product = await db.Product.findAll({
                include: [{ association: 'image' }]
            });
            return product;
        } catch (err) {
            console.log(err);
        }
    },
    getOneProduct: async function (value) {
        try {
            let product = await db.Product.findByPk(value, {
                include: [{ association: 'image' }]
            });
            return product;
        } catch (err) {
            console.log(err);
        }
    },
    createProduct: async function (product) {
        try {
            await imagesModel.createImage(product.productImage);
            let newImage = await imagesModel.getOneImage('name', product.productImage);
            await db.Product.create({
                name: product.name,
                description: product.description,
                price: product.price,
                fk_idImage: newImage.idImage
            })
        } catch (err) {
            console.log(err);
            let newImage = await imagesModel.getOneImage('name', product.productImage);
            await imagesModel.deleteImage('Products', newImage.idImage);
        }
    },
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

module.exports = productsModel;