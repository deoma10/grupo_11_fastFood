const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_has_delivery', {
    products_idProducts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'idProducts'
      }
    },
    delivery_idDelivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'delivery',
        key: 'idDelivery'
      }
    }
  }, {
    sequelize,
    tableName: 'products_has_delivery',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_idProducts" },
          { name: "delivery_idDelivery" },
        ]
      },
      {
        name: "fk_products_has_delivery_delivery1_idx",
        using: "BTREE",
        fields: [
          { name: "delivery_idDelivery" },
        ]
      },
      {
        name: "fk_products_has_delivery_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_idProducts" },
        ]
      },
    ]
  });
};
