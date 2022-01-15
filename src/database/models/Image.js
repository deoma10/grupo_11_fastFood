module.exports = (sequelize, dataTypes) =>{
    const alias = 'Image'; //nombre de la tabla

        //Valores de las columnas de la BD
    let cols = {
        idImage: {
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(200),
            allowNull: false
        }
    };

    // el timestamps false, hace que sequelize no requiera fechas
    let config = {
        timestamps: false,
    }


    // Definicion de la entidad para sequelize y el proyecto
    const Image = sequelize.define(alias, cols, config)

     // Asociaciones de las imagenes
    Image.associate = function (models){
        // Asociacion entre imagenes y productos.
        Image.hasMany(models.Product,{
            as: 'product',
            foreignKey: 'fk_idImage'
        });
        Image.hasMany(models.User,{
            as: 'user',
            foreignKey: 'fk_idImage'
        })
    }

    return Image;
}
