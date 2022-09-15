"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarImagesRepository = void 0;

var _typeorm = require("typeorm");

var _CarImages = require("../entities/CarImages");

class CarImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_CarImages.CarImages);
  }

  async create(car_id, image_name) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });
    await this.repository.save(carImage);
    return carImage;
  }

}

exports.CarImagesRepository = CarImagesRepository;