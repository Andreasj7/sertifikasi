/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'inversify';
import TokenManager from '../../Applications/security/TokenManager';
import { AuthPayload } from '../../Commons/types';

@injectable()
class JwtTokenManager implements TokenManager {
    constructor(@inject('Jwt') private readonly jwt: any) {}

    async createAccessToken(payload: AuthPayload): Promise<string> {
        return this.jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {});
    }

    async createRefreshToken(payload: AuthPayload): Promise<string> {
        return this.jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);
    }
}

export default JwtTokenManager;
