import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesDatabase } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsDatabase } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesDatabase } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsDatabase } from "@modules/cars/repositories/ISpecificationsRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";

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

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);

container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
