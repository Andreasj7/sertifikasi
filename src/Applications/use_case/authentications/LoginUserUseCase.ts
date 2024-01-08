import { inject, injectable } from 'inversify';
import { LoginPayload } from '../../../Commons/types';
import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository';
import NewAuth from '../../../Domains/authentications/entities/NewAuth';
import UserRepository from '../../../Domains/users/UserRepository';
import AuthenticationRepositoryMySql from '../../../Infrastructures/repository/AuthenticationRepositoryMySql';
import UserRepositoryMySql from '../../../Infrastructures/repository/UserRepositoryMySql';
import BcryptPasswordHash from '../../../Infrastructures/security/BcryptPasswordHash';
import JwtTokenManager from '../../../Infrastructures/security/JwtTokenManager';
import PasswordHash from '../../security/PasswordHash';
import TokenManager from '../../security/TokenManager';

@injectable()
class LoginUserUseCase {
    constructor(
        @inject(UserRepositoryMySql)
        private readonly userRepository: UserRepository,
        @inject(AuthenticationRepositoryMySql)
        private readonly authenticationRepository: AuthenticationRepository,
        @inject(BcryptPasswordHash) private readonly passwordHash: PasswordHash,
        @inject(JwtTokenManager) private readonly tokenManager: TokenManager
    ) {}

    async execute(payload: LoginPayload): Promise<NewAuth> {
        const { username, password } = payload;

        const encryptedPassword =
            await this.userRepository.getPasswordByUsername(username);
        await this.passwordHash.comparePassword(password, encryptedPassword);

        const id = await this.userRepository.getIdByUsername(username);
        const accessToken = await this.tokenManager.createAccessToken({
            id,
            username,
        });
        const refreshToken = await this.tokenManager.createRefreshToken({
            id,
            username,
        });

        const newAuth = new NewAuth({ accessToken, refreshToken });
        await this.authenticationRepository.addToken(newAuth.refreshToken);

        return newAuth;
    }
}

export default LoginUserUseCase;
