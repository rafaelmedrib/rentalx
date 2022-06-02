import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesDatabase,
  ICreateCategoryDTO,
} from "../ICategoriesDatabase";

class CategoriesRepositoryInMemory implements ICategoriesDatabase {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }

  async alreadyContains(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepositoryInMemory };
