import { CategoriesDatabase } from "../../database/CategoriesDatabase";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesDatabase = CategoriesDatabase.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesDatabase);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
