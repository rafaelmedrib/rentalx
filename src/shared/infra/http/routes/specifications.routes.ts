import { Router } from "express";

import { CreateSpecificationsController } from "../../../../modules/cars/useCases/createSpecifications/CreateSpecificationsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();
const createSpecifications = new CreateSpecificationsController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecifications.handle);

export { specificationsRoutes };
