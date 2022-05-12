import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

class CreateSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createSpecificationsUseCase = container.resolve(
      CreateSpecificationsUseCase
    );

    try {
      await createSpecificationsUseCase.execute({
        name,
        description,
      });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(201).send();
  }
}

export { CreateSpecificationsController };
