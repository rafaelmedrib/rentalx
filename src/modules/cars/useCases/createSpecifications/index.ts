import { SpecificationsDatabase } from "../../database/implementations/SpecificationsDatabase";
import { CreateSpecificationsController } from "./CreateSpecificationsController";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

const specificationsDatabase = new SpecificationsDatabase();
const createSpecificationsUseCase = new CreateSpecificationsUseCase(
  specificationsDatabase
);
const createSpecificationsController = new CreateSpecificationsController(
  createSpecificationsUseCase
);

export { createSpecificationsController };
