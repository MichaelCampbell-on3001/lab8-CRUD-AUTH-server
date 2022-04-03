'use strict';

const categoriesModel = (sequelize, DataTypes) => sequelize.define('categories', {
  name: { type: DataTypes.STRING, required: true },
  color: { type: DataTypes.STRING, required: true },
  size: { type: DataTypes.STRING, required: true },
});

module.exports = categoriesModel;
