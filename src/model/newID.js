const path = require('path');
const fs = require('fs');
const productsFilePath = path.resolve(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.resolve(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const newID = (tipoID) => {
    let last = 0;
    switch (tipoID){
        case 'product':
            products.forEach(product => {
                if (product.id > last) {
                    last = product.id;
                };
            });
        case 'user':
            users.forEach(user => {
                if (user.id > last) {
                    last = user.id;
                };
            });
        }
    return last + 1;
};

module.exports = newID;