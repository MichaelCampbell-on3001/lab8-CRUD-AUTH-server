'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const categoriesModel = require('./categories/model.js');
const itemsModel = require('./items/model.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';



const sequelize = new Sequelize(DATABASE_URL);
const items = itemsModel(sequelize, DataTypes);
const categories = categoriesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  items: new Collection(items),
  categories: new Collection(categories),
};
