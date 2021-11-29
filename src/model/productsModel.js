const fs = require('fs');
const path = require('path');

const productsModel = {
    getProducts: function () {
        return JSON.parse(
            fs.readFileSync(
                path.join(__dirname, './products.json'),
                { encoding: 'utf-8' }
                )
                );
    },
    createProduct: function (product) {
        const products = this.getProducts();
            products.push(product);
            fs.writeFileSync(
                path.resolve(__dirname, './products.json'),
                JSON.stringify(products, null, 4),
                { encoding: 'utf-8' }
            );
            return 'Product created'
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
        fs.writeFileSync(
            path.resolve(__dirname, './products.json'),
            JSON.stringify(newProductsFile, null, 4),
            { encoding: 'utf-8' }
        );
        return 'Product succesfully updated'
    },
    deleteProduct: function (id) {
        const newProductsFile = this.getProducts().filter(product => product.id != id);
        const oldproduct = this.getProducts().filter(product => product.id == id);
        const fileName = oldproduct[0].productImage;
        fs.unlinkSync(path.resolve(__dirname, '../../public/img/Products/' + fileName));
        fs.writeFileSync(
            path.resolve(__dirname, './products.json'),
            JSON.stringify(newProductsFile, null, 4),
            { encoding: 'utf-8' }
        );
    }
};

module.exports = productsModel;