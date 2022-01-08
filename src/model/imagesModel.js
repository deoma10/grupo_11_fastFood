const db = require('../database/models');
const Op = db.Sequelize.Op;

const imagesModel = {
    getAllImages: function(){
        db.Image.findAll()
        .then(images => {
           return images;
        })
    },

    getOneImageByName: function(value){

        let experimento;
        db.Image.findAll({
            where: {
                name: value
            }
        })
        .then(image => {
            experimento = image
        })
        .catch(error => {return error})

        return experimento;
    },
    createImage: function(imageName){
        db.Image.create({
            name: imageName
        })
        .then(()=> {
            return
        })
        .catch(error => {return error})
    }
}

module.exports =imagesModel