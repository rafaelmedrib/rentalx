import { ICategoriesDatabase } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: ICategoriesDatabase;
let createCategoriesUseCase: CreateCategoryUseCase;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoriesUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const newCategory = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategoriesUseCase.execute({
      name: newCategory.name,
      description: newCategory.description,
    });

    const createdCategory = await categoriesRepositoryInMemory.alreadyContains(
      newCategory.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("Should not be able to create a category when name has been used already", async () => {
    const newCategory = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategoriesUseCase.execute({
      name: newCategory.name,
      description: newCategory.description,
    });

    await expect(
      createCategoriesUseCase.execute({
        name: newCategory.name,
        description: newCategory.description,
      })
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});
