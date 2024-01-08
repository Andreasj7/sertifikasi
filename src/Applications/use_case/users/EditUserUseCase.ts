import { inject, injectable } from 'inversify';
import { EditUserPayload } from '../../../Commons/types';
import RoleRepository from '../../../Domains/roles/RoleRepository';
import UserRepository from '../../../Domains/users/UserRepository';
import User from '../../../Domains/users/entities/User';
import RoleRepositoryMySql from '../../../Infrastructures/repository/RoleRepositoryMySql';
import UserRepositoryMySql from '../../../Infrastructures/repository/UserRepositoryMySql';

@injectable()
class EditUserUseCase {
    constructor(
        @inject(UserRepositoryMySql)
        private readonly userRepository: UserRepository,
        @inject(RoleRepositoryMySql)
        private readonly roleRepository: RoleRepository
    ) {}

    async execute(userId: string, payload: EditUserPayload): Promise<User> {
        await this.roleRepository.verifyRoleAvailable(payload.roleId);
        if (payload.username) {
            await this.userRepository.verifyAvailableUsername(payload.username);
        }
        await this.userRepository.verifyAvailableUser(userId);
        return await this.userRepository.editUser(userId, payload);
    }
}

export default EditUserUseCase;
