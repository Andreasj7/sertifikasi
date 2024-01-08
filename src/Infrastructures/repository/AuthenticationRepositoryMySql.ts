import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository';

@injectable()
class AuthenticationRepositoryMySql implements AuthenticationRepository {
    constructor(@inject(PrismaClient) private readonly db: PrismaClient) {}

    async addToken(token: string): Promise<void> {
        await this.db.authentication.create({
            data: { token },
        });
    }

    async checkTokenAvailable(token: string): Promise<void> {
        const result = await this.db.authentication.findFirst({
            where: { token },
        });

        if (result === null) {
            throw new InvariantError('Refresh token tidak ditemukan');
        }
    }

    async deleteToken(token: string): Promise<void> {
        await this.db.authentication.delete({
            where: { token },
        });
    }

    async changePassword(userId: string, newPassword: string): Promise<void> {
        await this.db.user.update({
            where: { id: userId },
            data: {
                password: newPassword,
            },
        });
    }
}

export default AuthenticationRepositoryMySql;
