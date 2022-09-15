"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async findById(id) {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findOpenRentalByUser(user_id) {
    const openRentalByUser = await this.repository.findOne({
      user_id,
      end_date: null
    });
    return openRentalByUser;
  }

  async findOpenRentalByCar(car_id) {
    const openRentalByCar = await this.repository.findOne({
      car_id,
      end_date: null
    });
    return openRentalByCar;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total
  }) {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }

  async findByUser(user_id) {
    const rentals = await this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
    return rentals;
  }

}

exports.RentalRepository = RentalRepository;