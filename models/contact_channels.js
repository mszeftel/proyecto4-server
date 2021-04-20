const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ContactChannels', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contacts',
        key: 'id'
      },
      field: 'contact_id'
    },
    type: {
      type: DataTypes.ENUM('Phone','WhatsApp','Email','Facebook','Twitter','Instagram'),
      allowNull: false
    },
    handle: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ""
    },
    preference: {
      type: DataTypes.ENUM('No preference','Favourite','Do not disturb'),
      allowNull: false,
      defaultValue: "No preference"
    }
  }, {
    sequelize,
    tableName: 'contact_channels',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK__contacts",
        using: "BTREE",
        fields: [
          { name: "contact_id" },
        ]
      },
    ]
  });
};
