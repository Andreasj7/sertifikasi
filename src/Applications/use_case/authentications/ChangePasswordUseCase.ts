import { inject, injectable } from 'inversify';
import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository';
import UserRepository from '../../../Domains/users/UserRepository';
import AuthenticationRepositoryMySql from '../../../Infrastructures/repository/AuthenticationRepositoryMySql';
import UserRepositoryMySql from '../../../Infrastructures/repository/UserRepositoryMySql';
import BcryptPasswordHash from '../../../Infrastructures/security/BcryptPasswordHash';
import PasswordHash from '../../security/PasswordHash';

@injectable()
class ChangePasswordUseCase {
    constructor(
        @inject(UserRepositoryMySql)
        private readonly userRepository: UserRepository,
        @inject(AuthenticationRepositoryMySql)
        private readonly authenticationRepository: AuthenticationRepository,
        @inject(BcryptPasswordHash) private readonly passwordHash: PasswordHash
    ) {}

    async execute(userId: string, newPassword: string) {
        await this.userRepository.verifyAvailableUser(userId);
        const hashedPassword = await this.passwordHash.hash(newPassword);
        return await this.authenticationRepository.changePassword(
            userId,
            hashedPassword
        );
    }
}

export default ChangePasswordUseCase;
