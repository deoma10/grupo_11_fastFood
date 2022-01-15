module.exports = (sequelize, dataTypes) =>{
    const alias = 'Product'; //nombre de la tabla

        //Valores de las columnas de la BD
    let cols = {
        idProducts: {
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(25),
            allowNull: false
        },
        description:{
            type: dataTypes.STRING(25),
            allowNull: false
        },
        price:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        fk_idImage:{
            type: dataTypes.INTEGER,
            allowNull: false
        }

    };

    // el timestamps false, hace que sequelize no requiera fechas
    let config = {
        timestamps: false,
    }

    // Definicion de la entidad para sequelize y el proyecto
    const Product = sequelize.define(alias, cols, config)

    // Asociaciones de los products
    Product.associate = function (models){
            // Asociacion entre productos e imagenes.
        Product.belongsTo(models.Image, {
            as: 'image',
            foreignKey: 'fk_idImage'
        });
        Product.belongsToMany(models.Delivery, {
            as: 'deliveries',
            through: 'products_has_delivery',
            foreignKey: 'products_id',
            otherKey: 'delivery_id',
            timestamps: false
        })
    }

    return Product;
}
