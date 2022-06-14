import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id: carId } = request.params;
    const { specificationIds } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationUseCase.execute({
      car_id: carId as string,
      specifications_id: specificationIds as string[],
    });

    return response.json(car);
  }
}

export { CreateCarSpecificationController };
