/* istanbul ignore file */
import { AuthPayload } from '../../Commons/types';

interface TokenManager {
    createAccessToken: (payload: AuthPayload) => Promise<string>;
    createRefreshToken: (payload: AuthPayload) => Promise<string>;
}

export default TokenManager;
