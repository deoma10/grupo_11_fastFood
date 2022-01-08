const db = require('../database/models');
const Op = db.Sequelize.Op;

const imagesModel = {
    getAllImages: function(){
        db.Image.findAll()
        .then(images => {
           return images;
        })
    },

    getOneImageByName: async function(value){
        let image = await db.Image.findAll(
            {where: {name: value}}
            )
            console.log(image)
        return image
    },
    createImage: async function(imageName){
        await db.Image.create({
            name: imageName
        })
    }
}
module.exports =imagesModel

