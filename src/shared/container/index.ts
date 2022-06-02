import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesDatabase } from "@modules/cars/infra/typeorm/repositories/CategoriesDatabase";
import { SpecificationsDatabase } from "@modules/cars/infra/typeorm/repositories/SpecificationsDatabase";
import { ICategoriesDatabase } from "@modules/cars/repositories/ICategoriesDatabase";
import { ISpecificationsDatabase } from "@modules/cars/repositories/ISpecificationsDatabase";

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
