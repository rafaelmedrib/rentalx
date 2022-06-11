import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.post("/", createCarController.handle);
carsRoutes.get("/available", listCarsController.handle);

export { carsRoutes };
