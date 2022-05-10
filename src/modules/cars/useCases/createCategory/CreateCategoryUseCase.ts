import { inject, injectable } from "tsyringe";

import { ICategoriesDatabase } from "../../repositories/ICategoriesDatabase";

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
      throw new Error("Category already exists!");
    }

    this.categoriesDatabase.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
