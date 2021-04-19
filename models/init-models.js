var DataTypes = require("sequelize").DataTypes;
var _Accounts = require("./accounts");
var _Cities = require("./cities");
var _ContactChannels = require("./contact_channels");
var _Contacts = require("./contacts");
var _Countries = require("./countries");
var _Regions = require("./regions");
var _Users = require("./users");

function initModels(sequelize) {
  var Accounts = _Accounts(sequelize, DataTypes);
  var Cities = _Cities(sequelize, DataTypes);
  var ContactChannels = _ContactChannels(sequelize, DataTypes);
  var Contacts = _Contacts(sequelize, DataTypes);
  var Countries = _Countries(sequelize, DataTypes);
  var Regions = _Regions(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Contacts.belongsTo(Accounts, { as: "account", foreignKey: "accountId"});
  Accounts.hasMany(Contacts, { as: "contacts", foreignKey: "accountId"});
  Accounts.belongsTo(Cities, { as: "city", foreignKey: "cityId"});
  Cities.hasMany(Accounts, { as: "accounts", foreignKey: "cityId"});
  Contacts.belongsTo(Cities, { as: "city", foreignKey: "cityId"});
  Cities.hasMany(Contacts, { as: "contacts", foreignKey: "cityId"});
  ContactChannels.belongsTo(Contacts, { as: "contact", foreignKey: "contactId"});
  Contacts.hasMany(ContactChannels, { as: "contactChannels", foreignKey: "contactId", onDelete: 'CASCADE'});
  Cities.belongsTo(Countries, { as: "country", foreignKey: "countryId"});
  Countries.hasMany(Cities, { as: "cities", foreignKey: "countryId", onDelete: 'CASCADE'});
  Countries.belongsTo(Regions, { as: "region", foreignKey: "regionId"});
  Regions.hasMany(Countries, { as: "countries", foreignKey: "regionId", onDelete: 'CASCADE'});

  return {
    Accounts,
    Cities,
    ContactChannels,
    Contacts,
    Countries,
    Regions,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
