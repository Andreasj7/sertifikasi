import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import InvariantError from '../../Commons/exceptions/InvariantError';
import { EditUserPayload, RegisterUserPayload } from '../../Commons/types';
import UserRepository from '../../Domains/users/UserRepository';
import User from '../../Domains/users/entities/User';

@injectable()
class UserRepositoryMySql implements UserRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async getIdByUsername(username: string): Promise<string> {
        const result = await this.db.user.findFirst({
            where: { username: username },
        });

        if (result === null) {
            throw new InvariantError('User tidak ditemukan');
        }

        return result!.id;
    }

    async getPasswordByUsername(username: string): Promise<string> {
        const result = await this.db.user.findFirst({
            where: { username: username },
        });

        if (result === null) {
            throw new InvariantError('User tidak ditemukan');
        }

        return result!.password;
    }

    async verifyAvailableUsername(username: string): Promise<void> {
        const result = await this.db.user.findFirst({
            where: { username: username },
        });

        if (result !== null) {
            throw new InvariantError('Username sudah digunakan');
        }
    }

    async verifyAvailableUser(id: string): Promise<void> {
        const result = await this.db.user.findFirst({
            where: { id: id },
        });

        if (result === null) {
            throw new InvariantError('User tidak ditemukan');
        }
    }

    async getUsers(): Promise<User[]> {
        const result = await this.db.user.findMany({
            include: { role: true },
        });
        return result.map((user) => {
            const payload = {
                id: user.id,
                username: user.username,
                fullname: user.fullname,
                role: user.role,
            };
            return new User(payload);
        });
    }

    async getUserById(id: string): Promise<User> {
        const result = await this.db.user.findFirst({
            where: { id: id },
            include: { role: true },
        });

        if (result === null) {
            throw new InvariantError('User tidak ditemukan');
        }

        const payload = {
            id: result.id,
            username: result.username,
            fullname: result.fullname,
            role: result.role,
        };
        return new User(payload);
    }

    async addUser(user: RegisterUserPayload): Promise<User> {
        const id = `user-${this.idGenerator()}`;
        await this.db.user.create({
            data: {
                id,
                username: user.username,
                fullname: user.fullname,
                password: user.password,
                idRole: user.roleId,
            },
        });
        return await this.getUserById(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.db.user.delete({
            where: { id: id },
        });
    }

    async editUser(
        id: string,
        user: EditUserPayload | undefined
    ): Promise<User> {
        if (user !== undefined) {
            await this.db.user.update({
                where: { id: id },
                data: {
                    username: user.username,
                    fullname: user.fullname,
                    idRole: user.roleId,
                },
            });
        }
        return await this.getUserById(id);
    }
}

export default UserRepositoryMySql;
