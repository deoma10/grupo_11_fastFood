const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const imagesModel = require('./imagesModel')

const productsModel = {
    getProducts: function () {
        return JSON.parse(
            fs.readFileSync(
                path.resolve(__dirname, '../data/products.json'),
                { encoding: 'utf-8' }
                )
                );
    },
    writeFile: function (file) {
        return fs.writeFileSync(
            path.resolve(__dirname, '../data/products.json'),
            JSON.stringify(file, null, 4),
            { encoding: 'utf-8' }
        );
    },
    createProduct: async function (product) {
        // const products = this.getProducts();
        //     products.push(product);
        //     this.writeFile(products);
        //     return 'Product created'
        await imagesModel.createImage(product.productImage);
        let newImage = await imagesModel.getOneImageByName(product.productImage); 
        await db.Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            fk_idImage: newImage[0].idImage
        })
    },
    updateProduct: function (id, product) {
        const indiceBuscado = this.getProducts().findIndex(product => product.id == id);
        if(indiceBuscado < 0) {
            return 'Product does not exist in database';
        }
        let newProductsFile = this.getProducts()
        const fileName = newProductsFile[indiceBuscado].productImage;
        if(!product.productImage){
            product = {
                ...product,
                productImage: fileName
            }
        };
        fs.unlinkSync(path.resolve(__dirname, '../../public/img/Products/' + fileName));
        newProductsFile[indiceBuscado] = product
        this.writeFile(newProductsFile);
        return 'Product succesfully updated'
    },
    deleteImage: function(fileName) {
        fs.unlinkSync(path.resolve(__dirname, '../../public/img/Products/' + fileName));
    },
    deleteProduct: function (id) {
        const newProductsFile = this.getProducts().filter(product => product.id != id);
        const oldproduct = this.getProducts().filter(product => product.id == id);
        const fileName = oldproduct[0].productImage;
        this.deleteImage(fileName);
        this.writeFile(newProductsFile);
    }
};

module.exports = productsModel;