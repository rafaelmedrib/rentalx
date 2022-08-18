import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReturnRentalUseCase } from "./returnRentalUseCase";

class ReturnRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const returnRentalUseCase = container.resolve(ReturnRentalUseCase);

    const rental = await returnRentalUseCase.execute({ id });

    return response.status(200).json(rental);
  }
}

export { ReturnRentalController };
