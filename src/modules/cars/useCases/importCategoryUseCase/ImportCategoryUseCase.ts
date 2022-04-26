import { Parser } from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
  execute(file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path);

    const csvParse = new Parser({});

    stream.pipe(csvParse);
    csvParse.on("data", (line) => console.log(line));
  }
}

export { ImportCategoryUseCase };
