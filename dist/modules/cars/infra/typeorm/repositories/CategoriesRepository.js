"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesDatabase = void 0;

var _typeorm = require("typeorm");

var _Category = require("../entities/Category");

class CategoriesDatabase {
  constructor() {
    this.categories = void 0;
    this.categories = (0, _typeorm.getRepository)(_Category.Category);
  }

  async create({
    name,
    description
  }) {
    const category = this.categories.create({
      name,
      description
    });
    await this.categories.save(category);
  }

  async list() {
    const categories = await this.categories.find();
    return categories;
  }

  async alreadyContains(name) {
    const category = await this.categories.findOne({
      name
    });
    return category;
  }

}

exports.CategoriesDatabase = CategoriesDatabase;