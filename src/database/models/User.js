module.exports = (sequelize, dataTypes) =>{
    const alias = 'User'; //nombre de la tabla

        //Valores de las columnas de la BD
    let cols = {
        idUser: {
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        documentNumber:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        Name:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        lastName:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email:{
            type: dataTypes.STRING(70),
            allowNull: false
        },
        password:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        receivesEmail:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        privacyPolicies:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        rol:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        activated:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        fk_idImage:{
            type: dataTypes.INTEGER,
            allowNull: false

        },
        fk_idDocumentType:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    // el timestamps false, hace que sequelize no requiera fechas
    let config = {
        timestamps: false,
    }

    // Definicion de la entidad para sequelize y el proyecto
    const User = sequelize.define(alias, cols, config)

    // Asociaciones de los Usuarios
    User.associate = function (models){
        User.belongsTo(models.Image, {
            as: 'image',
            foreignKey: 'fk_idImage'
        });
        User.belongsTo(models.DocumentType, {
            as: 'docType',
            foreignKey: 'fk_idDocumentType'
        });
        User.hasMany(models.Delivery,{
            as: 'deliveries',
            foreignKey: 'fk_idUser'
        })
    }

    return User;
}
