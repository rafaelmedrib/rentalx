"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReturnRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICarsRepository = require("../../../cars/repositories/ICarsRepository");

var _IRentalRepository = require("../../repositories/IRentalRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ReturnRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalRepository.IRentalRepository === "undefined" ? Object : _IRentalRepository.IRentalRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ReturnRentalUseCase {
  constructor(rentalRepository, dateProvider, carsRepository) {
    this.rentalRepository = rentalRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async execute({
    id
  }) {
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_days = 1;

    if (!rental) {
      throw new _AppError.AppError("Rental does not exists!");
    }

    const dateNow = this.dateProvider.dateNow();
    let days = this.dateProvider.differenceInDays(rental.start_date, this.dateProvider.dateNow());

    if (days <= 0) {
      days = minimum_days;
    }

    const delay = this.dateProvider.differenceInDays(rental.expected_return_date, dateNow);
    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += days * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;
    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailability(car.id, true);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ReturnRentalUseCase = ReturnRentalUseCase;