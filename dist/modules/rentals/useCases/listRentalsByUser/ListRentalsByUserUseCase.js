"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IRentalRepository = require("../../repositories/IRentalRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let ListRentalsByUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRentalRepository.IRentalRepository === "undefined" ? Object : _IRentalRepository.IRentalRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListRentalsByUserUseCase {
  constructor(rentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  async execute(user_id) {
    const rentals = await this.rentalRepository.findByUser(user_id);
    return rentals;
  }

}) || _class) || _class) || _class) || _class);
exports.ListRentalsByUserUseCase = ListRentalsByUserUseCase;