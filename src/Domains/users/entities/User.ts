import { UserPayload } from '../../../Commons/types';
import UserRole from '../../roles/entities/UserRole';

class User {
    public id: string;
    public username: string;
    public fullname: string;
    public role: UserRole | null;

    constructor(payload: UserPayload) {
        this.id = payload.id;
        this.username = payload.username;
        this.fullname = payload.fullname;
        this.role = payload.role;
    }
}

export default User;
