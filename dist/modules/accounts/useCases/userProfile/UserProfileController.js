"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfileController = void 0;

var _tsyringe = require("tsyringe");

var _UserProfileUseCase = require("./UserProfileUseCase");

class UserProfileController {
  async handle(request, response) {
    const userProfileUseCase = _tsyringe.container.resolve(_UserProfileUseCase.UserProfileUseCase);

    const {
      id
    } = request.user;
    const user = await userProfileUseCase.execute(id);
    return response.json(user);
  }

}

exports.UserProfileController = UserProfileController;