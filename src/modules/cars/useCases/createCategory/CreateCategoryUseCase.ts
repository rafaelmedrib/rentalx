import { inject, injectable } from "tsyringe";

import { ICategoriesDatabase } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesDatabase")
    private categoriesDatabase: ICategoriesDatabase
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesDatabase.alreadyContains(name);

    if (categoryExists) {
      throw new AppError("Category already exists!");
    }

    await this.categoriesDatabase.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
