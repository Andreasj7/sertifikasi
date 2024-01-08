import { inject, injectable } from 'inversify';
import RoleRepository from '../../../Domains/roles/RoleRepository';
import UserRole from '../../../Domains/roles/entities/UserRole';
import RoleRepositoryMySql from '../../../Infrastructures/repository/RoleRepositoryMySql';

@injectable()
class GetRolesUseCase {
    constructor(
        @inject(RoleRepositoryMySql)
        private readonly roleRepository: RoleRepository
    ) {}

    async execute(): Promise<UserRole[]> {
        return this.roleRepository.getRoles();
    }
}

export default GetRolesUseCase;
