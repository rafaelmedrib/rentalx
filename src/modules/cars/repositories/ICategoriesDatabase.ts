import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesDatabase {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  alreadyContains(name: string): Promise<boolean>;
}

export { ICategoriesDatabase, ICreateCategoryDTO };
