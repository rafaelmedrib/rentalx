import { getRepository, Repository } from "typeorm";

import { Specifications } from "../../entities/Specifications";
import {
  ICreateSpecificationsDTO,
  ISpecificationsDatabase,
} from "../ISpecificationsDatabase";

class SpecificationsDatabase implements ISpecificationsDatabase {
  private specifications: Repository<Specifications>;

  constructor() {
    this.specifications = getRepository(Specifications);
  }

  async create({ name, description }: ICreateSpecificationsDTO): Promise<void> {
    const specification = this.specifications.create({
      name,
      description,
    });

    await this.specifications.save(specification);
  }

  async alreadyContains(name: string): Promise<Specifications> {
    const specification = await this.specifications.findOne({ name });
    return specification;
  }
}

export { SpecificationsDatabase };
