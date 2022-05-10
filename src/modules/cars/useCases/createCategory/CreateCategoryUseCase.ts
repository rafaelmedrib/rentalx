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

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesDatabase.alreadyContains(name);

    if (categoryExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesDatabase.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
