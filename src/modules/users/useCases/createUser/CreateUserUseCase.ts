import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const isEmailAlreadyTaken = this.usersRepository.findByEmail(email);
    if (isEmailAlreadyTaken) {
      throw new Error("EmailAlreadyTaken");
    }

    const user = this.usersRepository.create({ name, email });
    return user;
  }
}

export { CreateUserUseCase };
