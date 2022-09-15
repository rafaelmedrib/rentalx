"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

class AuthenticateUserController {
  async handle(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticateUserUseCase = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);

    const tokenInfo = await authenticateUserUseCase.execute({
      email,
      password
    });
    return response.json(tokenInfo);
  }

}

exports.AuthenticateUserController = AuthenticateUserController;