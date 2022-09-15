"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICarsRepository = require("../../../cars/repositories/ICarsRepository");

var _IRentalRepository = require("../../repositories/IRentalRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalRepository.IRentalRepository === "undefined" ? Object : _IRentalRepository.IRentalRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(rentalRepository, dateProvider, carsRepository) {
    this.rentalRepository = rentalRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async execute({
    car_id,
    user_id,
    expected_return_date
  }) {
    // Não deve ser possível cadastrar um aluguel caso o usuário já possua um em aberto.
    const userHasOpenRental = await this.rentalRepository.findOpenRentalByUser(user_id);

    if (userHasOpenRental) {
      throw new _AppError.AppError("User has unreturned rental");
    } // Não deve ser possível cadastrar um aluguel para o mesmo carro para mais de um usuário no mesmo período.


    const carHasOpenRental = await this.rentalRepository.findOpenRentalByCar(car_id);

    if (carHasOpenRental) {
      throw new _AppError.AppError("Car has an unfinished rental");
    } // Não deve ser possível cadastrar um aluguel com duração inferior a 24 horas.


    const dateNow = this.dateProvider.dateNow();
    const hoursToReturn = this.dateProvider.differenceInHours(dateNow, expected_return_date);

    if (hoursToReturn < 24) {
      throw new _AppError.AppError("Expected return date must be at least 24 hours from now");
    }

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date
    });
    await this.carsRepository.updateAvailability(rental.car_id, false);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;