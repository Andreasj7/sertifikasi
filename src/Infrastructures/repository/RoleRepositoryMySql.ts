import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import RoleRepository from '../../Domains/roles/RoleRepository';
import UserRole from '../../Domains/roles/entities/UserRole';

@injectable()
class RoleRepositoryMySql implements RoleRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyRoleExists(roleName: string): Promise<void> {
        const result = await this.db.role.findFirst({
            where: { role: roleName },
        });

        if (result !== null) {
            throw new InvariantError('Role telah ada');
        }
    }

    async verifyRoleAvailable(id: string): Promise<void> {
        const result = await this.db.role.findFirst({
            where: { id: id },
        });

        if (result === null) {
            throw new InvariantError('Role tidak ditemukan');
        }
    }

    async getRoles(): Promise<UserRole[]> {
        const result = await this.db.role.findMany();
        const roles = result.map(
            (role) =>
                new UserRole({
                    id: role.id,
                    role: role.role,
                })
        );
        return roles;
    }

    async getRoleById(id: string): Promise<UserRole> {
        const result = await this.db.role.findFirst({
            where: { id: id },
        });

        if (result === null) {
            throw new InvariantError('Role tidak ditemukan');
        }

        const payload = { id: result!.id, role: result!.role };
        return new UserRole(payload);
    }

    async addRole(roleName: string): Promise<UserRole> {
        const id = `role-${this.idGenerator()}`;
        await this.db.role.create({
            data: { id: id, role: roleName },
        });
        return await this.getRoleById(id);
    }

    async deleteRole(id: string): Promise<void> {
        await this.db.role.delete({
            where: { id: id },
        });
    }

    async editRole(
        id: string,
        roleName: string | undefined
    ): Promise<UserRole> {
        await this.db.role.update({
            where: { id: id },
            data: {
                role: roleName,
            },
        });
        return await this.getRoleById(id);
    }
}

export default RoleRepositoryMySql;
