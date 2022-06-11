import { getRepository, Repository } from "typeorm";

import {
  ICategoriesDatabase,
  ICreateCategoryDTO,
} from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

class CategoriesDatabase implements ICategoriesDatabase {
  private categories: Repository<Category>;

  constructor() {
    this.categories = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.categories.create({
      name,
      description,
    });

    await this.categories.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.categories.find();
    return categories;
  }

  async alreadyContains(name: string): Promise<Category> {
    const category = await this.categories.findOne({ name });
    return category;
  }
}

export { CategoriesDatabase };
