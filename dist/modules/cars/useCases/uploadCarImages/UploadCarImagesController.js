"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImagesController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarImagesUseCase = require("./UploadCarImagesUseCase");

class UploadCarImagesController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const images = request.files; // this images above needs to match the string used in the array method of multer helper when routing

    const uploadCarImagesUseCase = _tsyringe.container.resolve(_UploadCarImagesUseCase.UploadCarImagesUseCase);

    const car_image_filename = images.map(image => image.filename);
    await uploadCarImagesUseCase.execute({
      car_id: id,
      car_image_filename
    });
    return response.status(201).send();
  }

}

exports.UploadCarImagesController = UploadCarImagesController;