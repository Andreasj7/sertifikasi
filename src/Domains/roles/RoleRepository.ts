/* istanbul ignore file */
import UserRole from './entities/UserRole';

interface RoleRepository {
    verifyRoleExists(roleName: string): Promise<void>;
    verifyRoleAvailable(id: string): Promise<void>;
    getRoles(): Promise<UserRole[]>;
    getRoleById(id: string): Promise<UserRole>;
    addRole(roleName: string): Promise<UserRole>;
    deleteRole(id: string): Promise<void>;
    editRole(id: string, roleName: string): Promise<UserRole>;
}

export default RoleRepository;
