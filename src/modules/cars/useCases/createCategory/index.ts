import { CategoriesDatabase } from "../../repositories/implementations/CategoriesDatabase";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default (): CreateCategoryController => {
  const categoriesDatabase = new CategoriesDatabase();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesDatabase);
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
