import { inject, injectable } from 'inversify';
import RoleRepository from '../../../Domains/roles/RoleRepository';
import UserRole from '../../../Domains/roles/entities/UserRole';
import RoleRepositoryMySql from '../../../Infrastructures/repository/RoleRepositoryMySql';

@injectable()
class GetRoleByIdUseCase {
    constructor(
        @inject(RoleRepositoryMySql)
        private readonly roleRepository: RoleRepository
    ) {}

    async execute(id: string): Promise<UserRole> {
        return this.roleRepository.getRoleById(id);
    }
}

export default GetRoleByIdUseCase;
