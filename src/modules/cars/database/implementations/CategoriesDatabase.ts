import { Category } from "../../model/Category";
import {
  ICategoriesDatabase,
  ICreateCategoryDTO,
} from "../ICategoriesDatabase";

class CategoriesDatabase implements ICategoriesDatabase {
  private categories: Category[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesDatabase;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesDatabase {
    if (!CategoriesDatabase.INSTANCE) {
      CategoriesDatabase.INSTANCE = new CategoriesDatabase();
    }

    return CategoriesDatabase.INSTANCE;
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
    const categoryExists = this.categories.some(
      (category) => category.name === name
    );
    return categoryExists;
  }
}

export { CategoriesDatabase };
