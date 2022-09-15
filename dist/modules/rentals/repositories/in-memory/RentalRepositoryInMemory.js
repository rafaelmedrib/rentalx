"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalRepositoryInMemory = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _Rental = require("../../infra/typeorm/entities/Rental");

var _AppError = require("../../../../shared/errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RentalRepositoryInMemory {
  constructor() {
    this.rentals = [];
  }

  async findOpenRentalByUser(user_id) {
    const rental = this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    const rental = this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    return rental;
  }

  async create({
    car_id,
    expected_return_date,
    user_id
  }) {
    _dayjs.default.extend(_utc.default);

    const now = _dayjs.default.utc().toDate();

    const differenceInHours = (0, _dayjs.default)(expected_return_date).diff(now, "hours");
    const differenceIsGreaterThan24Hours = differenceInHours > 24;

    if (!differenceIsGreaterThan24Hours) {
      throw new _AppError.AppError("Expected return date must be at least 24 hours from now");
    }

    const rental = new _Rental.Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: _dayjs.default.utc().toDate()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findById(id) {
    return this.rentals.find(rental => rental.id === id);
  }

  async findByUser(user_id) {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }

}

exports.RentalRepositoryInMemory = RentalRepositoryInMemory;