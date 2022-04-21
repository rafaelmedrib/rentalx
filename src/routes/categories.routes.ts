import { Router } from "express";

import { CategoriesDatabase } from "../database/CategoriesDatabase";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesDatabase = new CategoriesDatabase();

categoriesRoutes
  .route("/")

  .post((request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(categoriesDatabase);
    createCategoryService.execute({ name, description });

    return response.status(201).send();
  })

  .get((request, response) => {
    const allCategories = categoriesDatabase.list();

    return response.json(allCategories);
  });

export { categoriesRoutes };
