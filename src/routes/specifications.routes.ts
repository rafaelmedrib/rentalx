import { Router } from "express";

import { SpecificationsDatabase } from "../modules/cars/database/implementations/SpecificationsDatabase";
import { CreateSpecificationsService } from "../modules/cars/services/CreateSpecificationsService";

const specificationsRoutes = Router();

const specificationsDatabase = new SpecificationsDatabase();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationsService = new CreateSpecificationsService(
    specificationsDatabase
  );

  createSpecificationsService.execute({
    name,
    description,
  });

  response.status(201).send();
});

export { specificationsRoutes };
