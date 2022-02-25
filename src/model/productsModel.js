const db = require('../database/models')
const imagesModel = require('./imagesModel')

const productsModel = {
    getProducts: async function () {
        try {
            let product = await db.products.findAll({
                include: [{ association: 'fk_idImage_image' }]
            });
            if(product===undefined){return new error}
            return product;
        } catch (err) {
            console.log(err);
            return new error
        }
    },
    getOneProduct: async function (value) {
        try {
            let allProducts = await db.products.findAll();
            // if(value <= 0 || value > allProducts.length) {
            //     new error
            // }
            let product = await db.products.findByPk(value, {
                include: [{ association: 'fk_idImage_image' }]
            });
            if(product===undefined){return new error}
            return product;
        } catch (err) {
            console.log(err);
            return new error
        }
    },
    createProduct: async function (product) {
        try {
            await imagesModel.createImage(product.productImage);
            let newImage = await imagesModel.getOneImage('name', product.productImage);
            await db.products.create({
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
                await db.products.update({
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
                await db.products.update({
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
            await db.products.destroy({
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