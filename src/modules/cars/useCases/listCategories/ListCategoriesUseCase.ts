import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoriesDatabase } from "../../repositories/ICategoriesDatabase";

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
