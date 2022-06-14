import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationsDTO,
  ISpecificationsDatabase,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specifications } from "../entities/Specifications";

class SpecificationsDatabase implements ISpecificationsDatabase {
  private repository: Repository<Specifications>;

  constructor() {
    this.repository = getRepository(Specifications);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specifications> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async alreadyContains(name: string): Promise<Specifications> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specifications[]> {
    const specifications = await this.repository.findByIds(ids);

    return specifications;
  }
}

export { SpecificationsDatabase };
