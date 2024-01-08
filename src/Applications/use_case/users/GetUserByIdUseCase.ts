import { inject, injectable } from 'inversify';
import UserRepository from '../../../Domains/users/UserRepository';
import User from '../../../Domains/users/entities/User';
import UserRepositoryMySql from '../../../Infrastructures/repository/UserRepositoryMySql';

@injectable()
class GetUserByIdUseCase {
    constructor(
        @inject(UserRepositoryMySql)
        private readonly userRepository: UserRepository
    ) {}

    async execute(id: string): Promise<User> {
        return await this.userRepository.getUserById(id);
    }
}

export default GetUserByIdUseCase;
