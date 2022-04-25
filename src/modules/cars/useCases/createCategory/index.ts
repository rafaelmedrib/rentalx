import { CategoriesDatabase } from "../../database/implementations/CategoriesDatabase";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesDatabase = CategoriesDatabase.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesDatabase);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoryController };
