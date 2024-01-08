import { inject, injectable } from 'inversify';
import RoleRepository from '../../../Domains/roles/RoleRepository';
import RoleRepositoryMySql from '../../../Infrastructures/repository/RoleRepositoryMySql';

@injectable()
class DeleteRoleUseCase {
    constructor(
        @inject(RoleRepositoryMySql)
        private readonly roleRepository: RoleRepository
    ) {}

    async execute(roleId: string): Promise<void> {
        await this.roleRepository.verifyRoleAvailable(roleId);
        return await this.roleRepository.deleteRole(roleId);
    }
}

export default DeleteRoleUseCase;
