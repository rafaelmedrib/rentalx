"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListCarsUseCase = require("./ListCarsUseCase");

class ListCarsController {
  async handle(request, response) {
    const {
      name,
      category_id,
      brand
    } = request.query;

    const listCarsUseCase = _tsyringe.container.resolve(_ListCarsUseCase.ListCarsUseCase);

    const cars = await listCarsUseCase.execute({
      name: name,
      categoryId: category_id,
      brand: brand
    });
    return response.json(cars);
  }

}

exports.ListCarsController = ListCarsController;