"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name
  }) {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });
    await this.repository.save(car);
    return car;
  }

  async findCarByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async listAvailable(name, categoryId, brand) {
    const carsQuery = this.repository.createQueryBuilder("car").where("car.available = :available", {
      available: true
    });

    if (name) {
      carsQuery.andWhere("car.name = :name", {
        brand
      });
    }

    if (categoryId) {
      carsQuery.andWhere("car.category_id = :categoryId", {
        categoryId
      });
    }

    if (brand) {
      carsQuery.andWhere("car.brand = :brand", {
        brand
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(car_id) {
    const car = await this.repository.findOne(car_id);
    return car;
  }

  async updateAvailability(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id", {
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;