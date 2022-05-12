import { container } from "tsyringe";

import { ICategoriesDatabase } from "../../modules/cars/repositories/ICategoriesDatabase";
import { CategoriesDatabase } from "../../modules/cars/repositories/implementations/CategoriesDatabase";
import { SpecificationsDatabase } from "../../modules/cars/repositories/implementations/SpecificationsDatabase";
import { ISpecificationsDatabase } from "../../modules/cars/repositories/ISpecificationsDatabase";

container.registerSingleton<ICategoriesDatabase>(
  "CategoriesDatabase",
  CategoriesDatabase
);

container.registerSingleton<ISpecificationsDatabase>(
  "SpecificationsDatabase",
  SpecificationsDatabase
);
