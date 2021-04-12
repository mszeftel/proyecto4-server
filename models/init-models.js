var DataTypes = require("sequelize").DataTypes;
var _cities = require("./cities");
var _countries = require("./countries");
var _regions = require("./regions");

function initModels(sequelize) {
  var Cities = _cities(sequelize, DataTypes);
  var Countries = _countries(sequelize, DataTypes);
  var Regions = _regions(sequelize, DataTypes);

  Cities.belongsTo(Countries, { foreignKey: "country_id"});
  Countries.hasMany(Cities, { foreignKey: "country_id", onDelete: 'CASCADE'});
  Countries.belongsTo(Regions, { foreignKey: "region_id"});
  Regions.hasMany(Countries, { foreignKey: "region_id", onDelete: 'CASCADE'});

  return {
    Cities,
    Countries,
    Regions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
