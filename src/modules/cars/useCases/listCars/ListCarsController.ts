import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "./ListCarsUseCase";

class ListCarsController {
  async handle(request: Request, response: Response) {
    const { name, category_id, brand } = request.query;

    const listCarsUseCase = container.resolve(ListCarsUseCase);

    const cars = await listCarsUseCase.execute({
      name: name as string,
      categoryId: category_id as string,
      brand: brand as string,
    });

    return response.json(cars);
  }
}

export { ListCarsController };
