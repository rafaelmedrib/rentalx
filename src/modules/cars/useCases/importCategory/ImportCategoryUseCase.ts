import { Parser } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesDatabase } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesDatabase")
    private categoriesDatabase: ICategoriesDatabase
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const csvParse = new Parser({});

      const categories: IImportCategories[] = [];

      stream.pipe(csvParse);
      csvParse
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const alreadyExists = await this.categoriesDatabase.alreadyContains(name);

      if (!alreadyExists) {
        await this.categoriesDatabase.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
