import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesDatabase {
  create({ name, description }: ICreateCategoryDTO): void;
  list(): Category[];
  alreadyContains(name: string): boolean;
}

export { ICategoriesDatabase, ICreateCategoryDTO };
