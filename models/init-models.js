var DataTypes = require("sequelize").DataTypes;
var _cities = require("./cities");
var _countries = require("./countries");
var _regions = require("./regions");

function initModels(sequelize) {
  var cities = _cities(sequelize, DataTypes);
  var countries = _countries(sequelize, DataTypes);
  var regions = _regions(sequelize, DataTypes);

  cities.belongsTo(countries, { foreignKey: "countryId"});
  countries.hasMany(cities, { foreignKey: "countryId"});
  countries.belongsTo(regions, { foreignKey: "regionId"});
  regions.hasMany(countries, { foreignKey: "regionId"});

  return {
    cities,
    countries,
    regions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
