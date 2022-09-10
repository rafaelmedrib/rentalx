import { inject, injectable } from "tsyringe";

import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class UserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { UserProfileUseCase };
