module.exports = (sequelize, dataTypes) =>{
    const alias = 'Delivery'; //nombre de la tabla

        //Valores de las columnas de la BD
    let cols = {
        idDelivery: {
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fk_idUser:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        comments:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        adress:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        phone:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        totalPrice:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        release_date:{
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };

    // el timestamps false, hace que sequelize no requiera fechas
    let config = {
        timestamps: false,
    }

    // Definicion de la entidad para sequelize y el proyecto
    const Delivery = sequelize.define(alias, cols, config)

    // Asociaciones de los Usuarios
    Delivery.associate = function (models){

    }

    return Delivery;
}
