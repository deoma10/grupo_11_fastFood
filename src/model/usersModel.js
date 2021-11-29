const path = require("path");
const fs = require('fs');

const usersModel = {
    getUsers: function () {
        return JSON.parse(
            fs.readFileSync(
                path.join(__dirname, './users.json'),
                { encoding: 'utf-8' }
                )
                );
    },
    createUser: function (product) {
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
        newProductsFile[indiceBuscado] = product        
        fs.writeFileSync(
            path.resolve(__dirname, './products.json'),
            JSON.stringify(newProductsFile, null, 4),
            { encoding: 'utf-8' }
        );
        return 'Product succesfully updated'
    },
    // deleteUser: function (cedula) {
    //     const newDb = this.getUsers().filter(item => item.cedula != cedula);
    //     fs.writeFileSync(
    //         path.resolve(__dirname, './users.json'),
    //         JSON.stringify(newDb, null, 4),
    //         { encoding: 'utf-8' }
    //     );
    // }
};

