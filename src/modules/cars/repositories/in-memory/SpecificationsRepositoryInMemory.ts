import { Specifications } from "@modules/cars/infra/typeorm/entities/Specifications";

import {
  ICreateSpecificationsDTO,
  ISpecificationsDatabase,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsDatabase {
  specifications: Specifications[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specifications> {
    const specification = new Specifications();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async alreadyContains(name: string): Promise<Specifications> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specifications[]> {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return specifications;
  }
}

export { SpecificationsRepositoryInMemory };
