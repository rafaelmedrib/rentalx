import { Specifications } from "../model/Specifications";
import {
  ICreateSpecificationsDTO,
  ISpecificationsDatabase,
} from "./ISpecificationsDatabase";

class SpecificationsDatabase implements ISpecificationsDatabase {
  private specificationsDatabase: Specifications[];

  constructor() {
    this.specificationsDatabase = [];
  }

  create({ name, description }: ICreateSpecificationsDTO): void {
    const specifications = new Specifications();

    Object.assign(specifications, {
      name,
      description,
    });

    this.specificationsDatabase.push(specifications);
  }

  alreadyContains(name: string): boolean {
    const specificationsExists = this.specificationsDatabase.some(
      (specifications) => specifications.name === name
    );

    return specificationsExists;
  }
}

export { SpecificationsDatabase };
