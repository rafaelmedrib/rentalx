import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as unknown as IFiles[];
    // this images above needs to match the string used in the array method of multer helper when routing

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const car_image_filename = images.map((image) => image.filename);

    await uploadCarImagesUseCase.execute({ car_id: id, car_image_filename });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
