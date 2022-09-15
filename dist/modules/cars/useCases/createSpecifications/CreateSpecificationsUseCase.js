"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ISpecificationsRepository = require("../../repositories/ISpecificationsRepository");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateSpecificationsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationsDatabase")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationsRepository.ISpecificationsDatabase === "undefined" ? Object : _ISpecificationsRepository.ISpecificationsDatabase]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateSpecificationsUseCase {
  constructor(specificationsDatabase) {
    this.specificationsDatabase = specificationsDatabase;
  }

  async execute({
    name,
    description
  }) {
    const specificationExists = await this.specificationsDatabase.alreadyContains(name);

    if (specificationExists) {
      throw new _AppError.AppError("Specification already exists!");
    }

    await this.specificationsDatabase.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateSpecificationsUseCase = CreateSpecificationsUseCase;