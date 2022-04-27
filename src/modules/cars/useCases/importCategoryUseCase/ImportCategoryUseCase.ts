import { Parser } from "csv-parse";
import fs from "fs";

import { ICategoriesDatabase } from "../../database/ICategoriesDatabase";

interface IImportCategories {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  private categoriesDatabase: ICategoriesDatabase;
  constructor(categoriesDatabase: ICategoriesDatabase) {
    this.categoriesDatabase = categoriesDatabase;
  }

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
      const alreadyExists = this.categoriesDatabase.alreadyContains(name);
      if (!alreadyExists) {
        this.categoriesDatabase.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
