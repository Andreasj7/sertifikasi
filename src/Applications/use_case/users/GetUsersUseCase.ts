import { inject, injectable } from 'inversify';
import UserRepository from '../../../Domains/users/UserRepository';
import User from '../../../Domains/users/entities/User';
import UserRepositoryMySql from '../../../Infrastructures/repository/UserRepositoryMySql';

@injectable()
class GetUsersUseCase {
    constructor(
        @inject(UserRepositoryMySql)
        private readonly userRepository: UserRepository
    ) {}

    async execute(): Promise<User[]> {
        return await this.userRepository.getUsers();
    }
}

export default GetUsersUseCase;
