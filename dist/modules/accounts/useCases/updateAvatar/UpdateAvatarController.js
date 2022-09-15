"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateAvatarUseCase = require("./UpdateAvatarUseCase");

class UpdateAvatarController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const updateAvatarUseCase = _tsyringe.container.resolve(_UpdateAvatarUseCase.UpdateAvatarUseCase);

    const avatar_file = request.file.filename;
    await updateAvatarUseCase.execute({
      user_id: id,
      avatar_file
    });
    return response.status(204).send();
  }

}

exports.UpdateAvatarController = UpdateAvatarController;