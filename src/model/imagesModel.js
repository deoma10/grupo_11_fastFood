const db = require('../database/models');
const Op = db.Sequelize.Op;
const path = require('path');
const fs = require('fs');

const imagesModel = {
    getAllImages: function () {
        db.images.findAll()
            .then(images => {
                return images;
            })
    },

    getOneImage: async function (field, value) {
        try {
            let image;
            switch (field) {
                case 'idImage':
                    image = await db.images.findByPk(value)
                    break;
                case 'name':
                    image = await db.images.findOne(
                        { where: { name: value } }
                    );
                    break;
            }
            return image
        } catch(err) {
            console.log(err);
        }
    },
    createImage: async function (imageName) {
            await db.images.create({
                name: imageName
            });
    },
    deleteImage: async function (route, id) {
        try {
            let oldImage = await this.getOneImage('idImage', id);
            await db.images.destroy({
                where: {
                    idImage: id
                }
            })
            this.deleteImageFile(route, oldImage.name);
        } catch (err) {
            console.log(err);
        }
    },
    deleteImageFile: function (route, fileName) {
        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'img', route, fileName));
    }
}

module.exports = imagesModel

