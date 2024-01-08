import { RolePayload } from '../../../Commons/types';

class UserRole {
    public id: string;
    public role: string;

    constructor(payload: RolePayload) {
        this.id = payload.id;
        this.role = payload.role;
    }
}

export default UserRole;
