import { Request, Response } from "express";

import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

class CreateSpecificationsController {
  private createSpecificationsUseCase: CreateSpecificationsUseCase;
  constructor(createSpecificationsUseCase: CreateSpecificationsUseCase) {
    this.createSpecificationsUseCase = createSpecificationsUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecificationsUseCase.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}

export { CreateSpecificationsController };
