const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve(__dirname, '..','..','public','img','Products'));
    },
    filename: (req, file, callback) => {
        const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        callback(null, fileName);
    }
});

const upload = multer({ storage });

// Controller
const controller = require("../controller/index.controller");

router.get('/', controller.getIndex);

// router.post('/', controller.getIndex);


router.get('/productCart', controller.getProductCart);

// router.post('/productCart', controller.getProductCart);


router.get('/productDetail/:id', controller.getProductDetail);

// router.post('/productDetail/:id', controller.getProductDetail);


router.get('/productCreation', controller.getProductCreation);

//Crear producto
router.post('/', upload.single('productImage'), controller.createProduct);



router.get('/productMod/:id', controller.getProductMod);

router.put('/productMod/:id', upload.single('productImage'), controller.editProduct);

//Eliminar producto
router.get('/productDelete/:id', controller.deleteProducts);


router.get('/register', controller.getRegister);
//Crear Usuario
router.post('/register', controller.createUser);


//Editar usuario
router.get('/editUser/:id', controller.updateUser);

router.put('/editUser/:id', controller.editUser);

//

router.get('/login', controller.getLogin);

// router.post('/login', controller.getLogin);

router.get('/users', controller.getUsers);


module.exports = router;