"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICategoriesRepository = require("../../repositories/ICategoriesRepository");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesDatabase")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesDatabase === "undefined" ? Object : _ICategoriesRepository.ICategoriesDatabase]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCategoryUseCase {
  constructor(categoriesDatabase) {
    this.categoriesDatabase = categoriesDatabase;
  }

  async execute({
    name,
    description
  }) {
    const categoryExists = await this.categoriesDatabase.alreadyContains(name);

    if (categoryExists) {
      throw new _AppError.AppError("Category already exists!");
    }

    await this.categoriesDatabase.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCategoryUseCase = CreateCategoryUseCase;