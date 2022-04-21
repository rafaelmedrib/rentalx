import { Router } from "express";

import { CategoriesDatabase } from "../database/CategoriesDatabase";

const categoriesRoutes = Router();
const categoriesDatabase = new CategoriesDatabase();

categoriesRoutes
  .route("/")

  .post((request, response) => {
    const { name, description } = request.body;

    categoriesDatabase.create({
      name,
      description,
    });

    response.status(201).send();
  })

  .get((request, response) => {
    const allCategories = categoriesDatabase.list();

    return response.json(allCategories);
  });

export { categoriesRoutes };
