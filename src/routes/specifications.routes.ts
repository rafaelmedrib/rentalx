import { Router } from "express";

import { CreateSpecificationsController } from "../modules/cars/useCases/createSpecifications/CreateSpecificationsController";

const specificationsRoutes = Router();
const createSpecifications = new CreateSpecificationsController();

specificationsRoutes.post("/", createSpecifications.handle);

export { specificationsRoutes };
