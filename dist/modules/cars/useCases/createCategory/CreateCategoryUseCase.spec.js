"use strict";

var _CategoriesRepositoryInMemory = require("../../repositories/in-memory/CategoriesRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let categoriesRepositoryInMemory;
let createCategoriesUseCase;
describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoriesUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("Should be able to create a new category", async () => {
    const newCategory = {
      name: "Category Test",
      description: "Category description test"
    };
    await createCategoriesUseCase.execute({
      name: newCategory.name,
      description: newCategory.description
    });
    const createdCategory = await categoriesRepositoryInMemory.alreadyContains(newCategory.name);
    expect(createdCategory).toHaveProperty("id");
  });
  it("Should not be able to create a category when name has been used already", async () => {
    const newCategory = {
      name: "Category Test",
      description: "Category description test"
    };
    await createCategoriesUseCase.execute({
      name: newCategory.name,
      description: newCategory.description
    });
    await expect(createCategoriesUseCase.execute({
      name: newCategory.name,
      description: newCategory.description
    })).rejects.toEqual(new _AppError.AppError("Category already exists!"));
  });
});