/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'inversify';
import AuthenticationError from '../../Commons/exceptions/AuthenticationError';

@injectable()
class BcryptPasswordHash {
    constructor(
        @inject('Bcrypt') private readonly bcrypt: any,
        private saltRound: number = 10
    ) {}

    async hash(password: string) {
        return this.bcrypt.hash(password, this.saltRound);
    }

    async comparePassword(password: string, hashedPassword: string) {
        const result = await this.bcrypt.compare(password, hashedPassword);

        if (!result) {
            throw new AuthenticationError(
                'Kredensial yang Anda masukkan salah'
            );
        }
    }
}

export default BcryptPasswordHash;
