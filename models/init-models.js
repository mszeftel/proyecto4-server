var DataTypes = require("sequelize").DataTypes;
var _Accounts = require("./accounts");
var _Cities = require("./cities");
var _Countries = require("./countries");
var _Regions = require("./regions");

function initModels(sequelize) {
  var Accounts = _Accounts(sequelize, DataTypes);
  var Cities = _Cities(sequelize, DataTypes);
  var Countries = _Countries(sequelize, DataTypes);
  var Regions = _Regions(sequelize, DataTypes);

  Accounts.belongsTo(Cities, { as: "city", foreignKey: "cityId"});
  Cities.hasMany(Accounts, { as: "accounts", foreignKey: "cityId"});
  Cities.belongsTo(Countries, { as: "country", foreignKey: "countryId"});
  Countries.hasMany(Cities, { as: "cities", foreignKey: "countryId", onDelete: 'CASCADE'});
  Countries.belongsTo(Regions, { as: "region", foreignKey: "regionId"});
  Regions.hasMany(Countries, { as: "countries", foreignKey: "regionId", onDelete: 'CASCADE'});

  return {
    Accounts,
    Cities,
    Countries,
    Regions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
