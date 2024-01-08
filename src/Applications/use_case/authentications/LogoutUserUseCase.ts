import { inject, injectable } from 'inversify';
import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository';
import AuthenticationRepositoryMySql from '../../../Infrastructures/repository/AuthenticationRepositoryMySql';

@injectable()
class LogoutUserUseCase {
    constructor(
        @inject(AuthenticationRepositoryMySql)
        private readonly authenticationRepository: AuthenticationRepository
    ) {}

    async execute(token: string) {
        await this.authenticationRepository.checkTokenAvailable(token);
        await this.authenticationRepository.deleteToken(token);
    }
}

export default LogoutUserUseCase;
