const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('delivery', {
    idDelivery: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fk_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'idUser'
      }
    },
    orders: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    adress: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    release_date: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'delivery',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDelivery" },
        ]
      },
      {
        name: "fk_delivery_users1_idx",
        using: "BTREE",
        fields: [
          { name: "fk_idUser" },
        ]
      },
    ]
  });
};
