"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("../../infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      description,
      license_plate,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      specifications
    });
    this.cars.push(car);
    return car;
  }

  async findCarByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async listAvailable(name, categoryId, brand) {
    let availableCars = this.cars.filter(car => car.available);
    if (!name && !categoryId && !brand) return availableCars;
    availableCars = availableCars.filter(car => {
      if (name === car.name) return true;
      if (categoryId === car.category_id) return true;
      if (brand === car.brand) return true;
      return false;
    });
    return availableCars;
  }

  async findById(car_id) {
    const car = this.cars.find(car => car.id === car_id);
    return car;
  }

  async updateAvailability(id, available) {
    const carIndex = this.cars.findIndex(car => car.id === id);
    this.cars[carIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;