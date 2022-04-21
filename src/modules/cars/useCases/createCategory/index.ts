import { CategoriesDatabase } from "../../database/CategoriesDatabase";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesDatabase = new CategoriesDatabase();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesDatabase);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoryController };
