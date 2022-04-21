import { Router } from "express";

import { CategoriesDatabase } from "../modules/cars/database/CategoriesDatabase";
import { createCategoryController } from "../modules/cars/useCases/createCategory/index";

const categoriesRoutes = Router();

categoriesRoutes
  .route("/")

  .post((request, response) => {
    return createCategoryController.handle(request, response);
  })

  .get((request, response) => {
    const allCategories = categoriesDatabase.list();

    return response.json(allCategories);
  });

export { categoriesRoutes };
