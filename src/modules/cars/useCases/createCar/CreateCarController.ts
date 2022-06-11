import { Request, Response } from "express";
import { container } from "tsyringe";
import "reflect-metadata";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    console.log("handle controller");
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    try {
      console.log("try controller");
      const car = await createCarUseCase.execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      });

      return response.status(201).json(car);
    } catch (error) {
      console.log("catch controller");
      return response.status(500).json({ error: error.message });
    }
  }
}

export { CreateCarController };
