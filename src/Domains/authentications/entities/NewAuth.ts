import { TokenPayload } from '../../../Commons/types';

class NewAuth {
    public accessToken: string;
    public refreshToken: string;

    constructor(payload: TokenPayload) {
        this.accessToken = payload.accessToken;
        this.refreshToken = payload.refreshToken;
    }
}

export default NewAuth;
