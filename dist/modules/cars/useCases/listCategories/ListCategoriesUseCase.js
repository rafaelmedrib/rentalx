"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoriesUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICategoriesRepository = require("../../repositories/ICategoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let ListCategoriesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesDatabase")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesDatabase === "undefined" ? Object : _ICategoriesRepository.ICategoriesDatabase]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListCategoriesUseCase {
  constructor(categoriesDatabase) {
    this.categoriesDatabase = categoriesDatabase;
  }

  async execute() {
    const categories = await this.categoriesDatabase.list();
    return categories;
  }

}) || _class) || _class) || _class) || _class);
exports.ListCategoriesUseCase = ListCategoriesUseCase;