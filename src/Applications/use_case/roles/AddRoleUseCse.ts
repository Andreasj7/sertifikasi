import { inject, injectable } from 'inversify';
import RoleRepository from '../../../Domains/roles/RoleRepository';
import AddedRole from '../../../Domains/roles/entities/UserRole';
import RoleRepositoryMySql from '../../../Infrastructures/repository/RoleRepositoryMySql';

@injectable()
class AddRoleUseCase {
    constructor(
        @inject(RoleRepositoryMySql)
        private readonly roleRepository: RoleRepository
    ) {}

    async execute(roleName: string): Promise<AddedRole> {
        await this.roleRepository.verifyRoleExists(roleName);
        return await this.roleRepository.addRole(roleName);
    }
}

export default AddRoleUseCase;
