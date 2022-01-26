var DataTypes = require("sequelize").DataTypes;
var _delivery = require("./Delivery");
var _documenttypes = require("./documenttypes");
var _images = require("./images");
var _products = require("./products");
var _products_has_delivery = require("./products_has_delivery");
var _users = require("./users");

function initModels(sequelize) {
  var delivery = _delivery(sequelize, DataTypes);
  var documenttypes = _documenttypes(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var products_has_delivery = _products_has_delivery(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  delivery.belongsToMany(products, { as: 'products_idProducts_products', through: products_has_delivery, foreignKey: "delivery_idDelivery", otherKey: "products_idProducts" });
  products.belongsToMany(delivery, { as: 'delivery_idDelivery_deliveries', through: products_has_delivery, foreignKey: "products_idProducts", otherKey: "delivery_idDelivery" });
  products_has_delivery.belongsTo(delivery, { as: "delivery_idDelivery_delivery", foreignKey: "delivery_idDelivery"});
  delivery.hasMany(products_has_delivery, { as: "products_has_deliveries", foreignKey: "delivery_idDelivery"});
  users.belongsTo(documenttypes, { as: "fk_idDocumentType_documenttype", foreignKey: "fk_idDocumentType"});
  documenttypes.hasMany(users, { as: "users", foreignKey: "fk_idDocumentType"});
  products.belongsTo(images, { as: "fk_idImage_image", foreignKey: "fk_idImage"});
  images.hasMany(products, { as: "products", foreignKey: "fk_idImage"});
  users.belongsTo(images, { as: "fk_idImage_image", foreignKey: "fk_idImage"});
  images.hasMany(users, { as: "users", foreignKey: "fk_idImage"});
  products_has_delivery.belongsTo(products, { as: "products_idProducts_product", foreignKey: "products_idProducts"});
  products.hasMany(products_has_delivery, { as: "products_has_deliveries", foreignKey: "products_idProducts"});
  delivery.belongsTo(users, { as: "fk_idUser_user", foreignKey: "fk_idUser"});
  users.hasMany(delivery, { as: "deliveries", foreignKey: "fk_idUser"});

  return {
    delivery,
    documenttypes,
    images,
    products,
    products_has_delivery,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
