import { inject, injectable } from 'inversify';
import UserRepository from '../../../Domains/users/UserRepository';
import UserRepositoryMySql from '../../../Infrastructures/repository/UserRepositoryMySql';

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject(UserRepositoryMySql)
        private readonly userRepository: UserRepository
    ) {}

    async execute(id: string) {
        await this.userRepository.verifyAvailableUser(id);
        return await this.userRepository.deleteUser(id);
    }
}

export default DeleteUserUseCase;
