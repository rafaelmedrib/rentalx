import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalRepository: IRentalRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    // Não deve ser possível cadastrar um aluguel para o mesmo carro para mais de um usuário no mesmo período.

    const userHasOpenRental = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );
    if (userHasOpenRental) {
      throw new AppError("User has unreturned rental");
    }

    // Não deve ser possível cadastrar um aluguel caso o usuário já possua um em aberto.

    const carHasOpenRental = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );
    if (carHasOpenRental) {
      throw new AppError("Car has an unfinished rental");
    }

    // Não deve ser possível cadastrar um aluguel com duração inferior a 24 horas.

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}
export { CreateRentalUseCase };
