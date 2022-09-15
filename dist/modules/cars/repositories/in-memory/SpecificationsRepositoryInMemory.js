"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;

var _Specifications = require("../../infra/typeorm/entities/Specifications");

class SpecificationsRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specifications.Specifications();
    Object.assign(specification, {
      name,
      description
    });
    this.specifications.push(specification);
    return specification;
  }

  async alreadyContains(name) {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  }

  async findByIds(ids) {
    const specifications = this.specifications.filter(specification => ids.includes(specification.id));
    return specifications;
  }

}

exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;