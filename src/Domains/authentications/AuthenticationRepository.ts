/* istanbul ignore file */
interface AuthenticationRepository {
    checkTokenAvailable(token: string): Promise<void>;
    addToken(token: string): Promise<void>;
    deleteToken(token: string): Promise<void>;
    changePassword(userId: string, newPassword: string): Promise<void>;
}

export default AuthenticationRepository;
