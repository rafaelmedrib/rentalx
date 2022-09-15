"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCarsUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICarsRepository = require("../../repositories/ICarsRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let ListCarsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListCarsUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute({
    name,
    categoryId,
    brand
  }) {
    const availableCars = await this.carsRepository.listAvailable(name, categoryId, brand);
    return availableCars;
  }

}) || _class) || _class) || _class) || _class);
exports.ListCarsUseCase = ListCarsUseCase;