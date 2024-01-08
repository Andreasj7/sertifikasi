import { inject, injectable } from 'inversify';
import RoleRepository from '../../../Domains/roles/RoleRepository';
import UserRole from '../../../Domains/roles/entities/UserRole';
import RoleRepositoryMySql from '../../../Infrastructures/repository/RoleRepositoryMySql';

@injectable()
class EditRoleUseCase {
    constructor(
        @inject(RoleRepositoryMySql)
        private readonly roleRepository: RoleRepository
    ) {}

    async execute(roleId: string, roleName: string): Promise<UserRole> {
        await this.roleRepository.verifyRoleExists(roleName);
        await this.roleRepository.verifyRoleAvailable(roleId);
        return await this.roleRepository.editRole(roleId, roleName);
    }
}

export default EditRoleUseCase;
