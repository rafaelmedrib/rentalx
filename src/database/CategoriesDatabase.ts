import { Category } from "../model/Category";
import { ICategoriesDatabase, ICreateCategoryDTO } from "./ICategoriesDatabase";

class CategoriesDatabase implements ICategoriesDatabase {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list() {
    return this.categories;
  }

  alreadyContains(name: string): boolean {
    const category = this.categories.some((category) => category.name === name);
    return category;
  }
}

export { CategoriesDatabase };
