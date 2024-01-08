import { inject, injectable } from 'inversify';
import { RegisterUserPayload } from '../../../Commons/types';
import RoleRepository from '../../../Domains/roles/RoleRepository';
import UserRepository from '../../../Domains/users/UserRepository';
import User from '../../../Domains/users/entities/User';
import RoleRepositoryMySql from '../../../Infrastructures/repository/RoleRepositoryMySql';
import UserRepositoryMySql from '../../../Infrastructures/repository/UserRepositoryMySql';
import BcryptPasswordHash from '../../../Infrastructures/security/BcryptPasswordHash';
import PasswordHash from '../../security/PasswordHash';

@injectable()
class AddUserUseCase {
    constructor(
        @inject(UserRepositoryMySql)
        private readonly userRepository: UserRepository,
        @inject(RoleRepositoryMySql)
        private readonly roleRepository: RoleRepository,
        @inject(BcryptPasswordHash) private readonly passwordHash: PasswordHash
    ) {}

    async execute(payload: RegisterUserPayload): Promise<User> {
        await this.roleRepository.verifyRoleAvailable(payload.roleId);
        await this.userRepository.verifyAvailableUsername(payload.username);
        const hashedPassword = await this.passwordHash.hash(payload.password);
        const result = await this.userRepository.addUser({
            ...payload,
            password: hashedPassword,
        });
        return result;
    }
}

export default AddUserUseCase;
