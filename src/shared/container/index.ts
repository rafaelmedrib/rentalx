import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesDatabase } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsDatabase } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesDatabase } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsDatabase } from "@modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesDatabase>(
  "CategoriesDatabase",
  CategoriesDatabase
);

container.registerSingleton<ISpecificationsDatabase>(
  "SpecificationsDatabase",
  SpecificationsDatabase
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
