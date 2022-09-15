"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsDatabase = void 0;

var _typeorm = require("typeorm");

var _Specifications = require("../entities/Specifications");

class SpecificationsDatabase {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Specifications.Specifications);
  }

  async create({
    name,
    description
  }) {
    const specification = this.repository.create({
      name,
      description
    });
    await this.repository.save(specification);
    return specification;
  }

  async alreadyContains(name) {
    const specification = await this.repository.findOne({
      name
    });
    return specification;
  }

  async findByIds(ids) {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

}

exports.SpecificationsDatabase = SpecificationsDatabase;