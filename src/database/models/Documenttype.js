module.exports = (sequelize, dataTypes) =>{
    const alias = 'DocumentType'; //nombre de la tabla

        //Valores de las columnas de la BD
    let cols = {
        idDocumentType: {
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        description:{
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };

    // el timestamps false, hace que sequelize no requiera fechas
    let config = {
        timestamps: false,
    }

    // Definicion de la entidad para sequelize y el proyecto
    const DocumentType = sequelize.define(alias, cols, config)

    // Asociaciones de los Usuarios
    DocumentType.associate = function (models){
        DocumentType.hasMany(models.User,{
            as: 'users',
            foreignKey: 'fk_idDocumentType'
        })
    }

    return DocumentType;
}
