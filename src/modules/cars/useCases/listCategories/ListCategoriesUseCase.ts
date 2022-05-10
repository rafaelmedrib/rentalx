import { ICategoriesDatabase } from "../../repositories/ICategoriesDatabase";

class ListCategoriesUseCase {
  private categoriesDatabase: ICategoriesDatabase;
  constructor(categoriesDatabase: ICategoriesDatabase) {
    this.categoriesDatabase = categoriesDatabase;
  }

  execute() {
    return this.categoriesDatabase.list();
  }
}

export { ListCategoriesUseCase };
