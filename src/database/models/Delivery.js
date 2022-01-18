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
        orders:{
            type: dataTypes.STRING(200),
            allowNull: false
        },
        comments:{
            type: dataTypes.STRING(200),
            allowNull: false
        },
        adress:{
            type: dataTypes.STRING(200),
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
        Delivery.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'fk_idUser'
        });
        Delivery.belongsToMany(models.Product, {
            as: 'products',
            through: 'products_has_delivery',
            foreignKey: 'delivery_id',
            otherKey: 'products_id',
            timestamps: false
        })
    }

    return Delivery;
}
