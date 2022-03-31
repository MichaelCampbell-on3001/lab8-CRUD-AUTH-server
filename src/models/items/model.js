'use strict';

const itemsModel = (sequelize, DataTypes) => sequelize.define('items', {
  name: { type: DataTypes.STRING, required: true },
  calories: { type: DataTypes.NUMBER, required: true },
  type: { type: DataTypes.ENUM('fruit', 'vegetable', 'protein'), required: true },
});

module.exports = itemsModel;
