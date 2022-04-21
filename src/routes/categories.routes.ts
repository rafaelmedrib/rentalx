import { Router } from "express";

import { CategoriesDatabase } from "../database/CategoriesDatabase";

const categoriesRoutes = Router();
const categoriesDatabase = new CategoriesDatabase();

categoriesRoutes
  .route("/")

  .post((request, response) => {
    const { name, description } = request.body;

    if (categoriesDatabase.alreadyContains(name)) {
      return response.status(400).json({ error: "Category already exists" });
    }

    categoriesDatabase.create({
      name,
      description,
    });

    return response.status(201).send();
  })

  .get((request, response) => {
    const allCategories = categoriesDatabase.list();

    return response.json(allCategories);
  });

export { categoriesRoutes };
