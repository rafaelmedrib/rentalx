import { ICategoriesDatabase } from "../../repositories/ICategoriesDatabase";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  private categoriesDatabase: ICategoriesDatabase;
  constructor(categoriesDatabase: ICategoriesDatabase) {
    this.categoriesDatabase = categoriesDatabase;
  }

  execute({ name, description }: IRequest): void {
    if (this.categoriesDatabase.alreadyContains(name)) {
      throw new Error("Category already exists!");
    }

    this.categoriesDatabase.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
