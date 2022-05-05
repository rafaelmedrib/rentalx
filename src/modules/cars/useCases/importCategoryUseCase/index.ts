import { CategoriesDatabase } from "../../repositories/implementations/CategoriesDatabase";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesDatabase = CategoriesDatabase.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesDatabase);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
