/* istanbul ignore file */
import { EditUserPayload, RegisterUserPayload } from '../../Commons/types';
import User from './entities/User';

interface UserRepository {
    verifyAvailableUsername(username: string): Promise<void>;
    verifyAvailableUser(id: string): Promise<void>;
    getUsers(): Promise<User[]>;
    addUser(user: RegisterUserPayload): Promise<User>;
    deleteUser(id: string): Promise<void>;
    getUserById(id: string): Promise<User>;
    editUser(id: string, user: EditUserPayload | undefined): Promise<User>;
    getIdByUsername(username: string): Promise<string>;
    getPasswordByUsername(username: string): Promise<string>;
}

export default UserRepository;
