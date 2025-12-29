const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Settings = sequelize.define("Settings", {
  // Store configs as JSON so frontend doesn’t need DB structure changes
  theme: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: { mode: "light", primaryColor: "#2563eb" },
  },
  smtp: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {},
  },
  gateway: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {},
  },
});

module.exports = Settings;