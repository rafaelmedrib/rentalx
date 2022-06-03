import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesDatabase } from "@modules/cars/repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesDatabase")
    private categoriesDatabase: ICategoriesDatabase
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesDatabase.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
