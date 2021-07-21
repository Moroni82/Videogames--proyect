const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('genre', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allownull: true,
      },
      name:{
        type: DataTypes.STRING,
        allownull: true,
      },
  });
};