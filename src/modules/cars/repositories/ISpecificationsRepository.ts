import { Specifications } from "../infra/typeorm/entities/Specifications";

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsDatabase {
  create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specifications>;
  alreadyContains(name: string): Promise<Specifications>;
  findByIds(ids: string[]): Promise<Specifications[]>;
}

export { ISpecificationsDatabase, ICreateSpecificationsDTO };
