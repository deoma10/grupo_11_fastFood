// const model = require("../model/modelo");
const path = require("path");
const fs = require('fs');
const { parse } = require("path");
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

// controlador
const controller = {
    getIndex: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'index'), { products });
    },

    getProductCart: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCart'));
    },

////// Visualizacion individual de cada producto del Index
    getProductDetail: (req, res) => {
        let productId = req.params.id;
        let pId = parseInt(productId)
        let result = products.filter(function (k) {
            return k.id == pId;
        })
        if (result != []) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'productDetail'), { products: result[0] });
        } else {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'))
        }
    },

    getProductCreation: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCreation'));
    },

    //Crear productos
    createProduct: (req, res) => {
        const file = req.file;
        let product = {};
        if (!file) {
            product = {
                id: newID('product'),
                ...req.body,
                productImage: 'default-image.png'
            }
        } else {
            product = {
                id: newID('product'),
                ...req.body,
                productImage: req.file.filename
            }
        };

        //Guardar producto en el array de productos
        products.push(product);

        let jsonProducts = JSON.stringify(products, null, 4);
        fs.writeFileSync(productsFilePath, jsonProducts);

        res.redirect('/')
    },

    getProductMod: (req, res) => {
        let productId = req.params.id;
        let pId = parseInt(productId)
        let result = products.filter(function (k) {
            return k.id == pId;
        })
        if (result != []) {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'productMod'), { product: result[0] });
        } else {
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'error'))
        }
    },

    // Modificar productos
    editProduct: (req, res) => {
        const file = req.file;
        let asignaId = parseInt(req.params.id);
        let productos = products.filter(item => item.id != req.params.id);
        let productoEditado = products.filter(item => item.id == parseInt(req.params.id));
        if (!file) {
            productoEditado = {
                id: asignaId,
                ...req.body,
                productImage: productoEditado.productImage
            }
        } else {
            productoEditado = {
                id: asignaId,
                ...req.body,
                productImage: req.file.filename
            }
        };
        //Guardar producto en el array de productos
        productos.push(productoEditado);

        let jsonProducts = JSON.stringify(productos, null, 4);
        fs.writeFileSync(productsFilePath, jsonProducts);

        res.redirect('/')
    },

    //Eliminar productos
    deleteProducts: (req,res) => {
        let idProduct = parseInt(req.params.id);
        let newProducts = products.filter(item => item.id != idProduct)

        let jsonProducts = JSON.stringify(newProducts, null, 4);
        fs.writeFileSync(productsFilePath, jsonProducts);

        res.redirect('/')
    },


    getRegister: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'))
    },

    getLogin: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'));
    },

     getUsers: (req, res) => {
         res.render(path.resolve(__dirname, '..', 'views', 'users', 'users'), { users });
     },

     //Crear Usuarios
    createUser: (req, res) => {
        let user = {};
            user = {
                id: newID('user'),
                // typeDocument: req.body.typeDocument,
                // numDoc: req.body.numDoc,
                // name: req.body.name,
                // lastname: req.body.lastname,
                // email: req.body.email[0],
                // password: req.body.password[0],
                ...req.body
            }
        //Guardar usuario en el array de usuarios
        users.push(user);

        let jsonUsers = JSON.stringify(users, null, 4);
        fs.writeFileSync(usersFilePath, jsonUsers);

        res.redirect('/')
    },
    updateUser:(req, res) =>{
        let id = parseInt(req.params.id);

        let user = users.filter(function (k){
            return k.id == id;
        })
            res.render(path.resolve(__dirname, '..', 'views', 'users', 'editUser'), { user: user[0] });

       
 
    },
    //editar usuarios
    editUser:(req, res) => {
        let id = parseInt(req.params.id);

        let user = users.filter(function (k){
            return k.id == id;
        })

        let allUser = users.filter(function (k){
            return k.id != id;
        })

        user = {
                        
            id: id,
            typeDocument: req.body.typeDocument,
            numDoc: req.body.numDoc,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            recibeCorreo: user.recibeCorreo,
            politicaPrivacidad: user.politicaPrivacidad
        }

        //Guardar usuario en el array de usuarios
        allUser.push(user);

        let jsonUser = JSON.stringify(allUser, null, 4);
        fs.writeFileSync(usersFilePath, jsonUser);

        res.redirect('/')
    }
}


// Acá exportamos el resultado
module.exports = controller;