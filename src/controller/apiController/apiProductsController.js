const { productsModel } = require('../../model')

const apiProductsController = {
    getProducts: async (req, res) => {
        try {
            const productsInDB = await productsModel.getProducts();
            let totalProducts = productsInDB.length;
            let products = productsInDB.map((product) => {
                return newProduct = {
                    idProducts: product.idProducts,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    imageName: product.fk_idImage_image.name
                }
            })
            products = [{count: totalProducts}, [...products]]
            res.json(products);
        } catch (err) {
            res.json({error: 'Error 504'})
        }
    },
    getProductDetail: async (req, res) => {
        try {
            let product = await productsModel.getOneProduct(req.params.id);
            newProduct = {
                idProducts: product.idProducts,
                name: product.name,
                description: product.description,
                price: product.price,
                imageName: product.fk_idImage_image.name
            }
            res.json(newProduct);
        } catch (err) {
            res.json({error: 'Error 404'})
        }
    }

}

module.exports = apiProductsController;