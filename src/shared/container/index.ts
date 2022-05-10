import { container } from "tsyringe";

import { ICategoriesDatabase } from "../../modules/cars/repositories/ICategoriesDatabase";
import { CategoriesDatabase } from "../../modules/cars/repositories/implementations/CategoriesDatabase";

container.registerSingleton<ICategoriesDatabase>(
  "CategoriesDatabase",
  CategoriesDatabase
);
