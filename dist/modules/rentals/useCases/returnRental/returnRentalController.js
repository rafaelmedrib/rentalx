"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReturnRentalController = void 0;

var _tsyringe = require("tsyringe");

var _returnRentalUseCase = require("./returnRentalUseCase");

class ReturnRentalController {
  async handle(request, response) {
    const {
      id
    } = request.params;

    const returnRentalUseCase = _tsyringe.container.resolve(_returnRentalUseCase.ReturnRentalUseCase);

    const rental = await returnRentalUseCase.execute({
      id
    });
    return response.status(200).json(rental);
  }

}

exports.ReturnRentalController = ReturnRentalController;