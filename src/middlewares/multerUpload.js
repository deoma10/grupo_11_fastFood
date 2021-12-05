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

const multerUpload = multer({ storage });

module.exports = multerUpload;