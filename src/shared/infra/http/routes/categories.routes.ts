import { Router } from "express";
import multer from "multer";

import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes
  .route("/")

  .post(ensureAuthenticated, ensureAdmin, createCategoryController.handle)

  .get(listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
