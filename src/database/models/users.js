const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    idUser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    documentNumber: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    receivesEmail: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    privacyPolicies: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    activated: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    fk_idImage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'images',
        key: 'idImage'
      }
    },
    fk_idDocumentType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'documenttypes',
        key: 'idDocumentType'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
      {
        name: "fk_users_images_idx",
        using: "BTREE",
        fields: [
          { name: "fk_idImage" },
        ]
      },
      {
        name: "fk_users_documentType1_idx",
        using: "BTREE",
        fields: [
          { name: "fk_idDocumentType" },
        ]
      },
    ]
  });
};
