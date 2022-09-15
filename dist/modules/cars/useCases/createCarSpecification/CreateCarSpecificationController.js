"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

class CreateCarSpecificationController {
  async handle(request, response) {
    const {
      id: carId
    } = request.params;
    const {
      specificationIds
    } = request.body;

    const createCarSpecificationUseCase = _tsyringe.container.resolve(_CreateCarSpecificationUseCase.CreateCarSpecificationUseCase);

    const car = await createCarSpecificationUseCase.execute({
      car_id: carId,
      specifications_id: specificationIds
    });
    return response.json(car);
  }

}

exports.CreateCarSpecificationController = CreateCarSpecificationController;