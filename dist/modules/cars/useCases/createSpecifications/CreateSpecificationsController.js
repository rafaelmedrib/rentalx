"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _CreateSpecificationsUseCase = require("./CreateSpecificationsUseCase");

class CreateSpecificationsController {
  async handle(request, response) {
    const {
      name,
      description
    } = request.body;

    const createSpecificationsUseCase = _tsyringe.container.resolve(_CreateSpecificationsUseCase.CreateSpecificationsUseCase);

    await createSpecificationsUseCase.execute({
      name,
      description
    });
    return response.status(201).send();
  }

}

exports.CreateSpecificationsController = CreateSpecificationsController;