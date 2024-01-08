/* istanbul ignore file */
interface PasswordHash {
    hash: (password: string) => Promise<string>;
    comparePassword: (
        password: string,
        hashedPassword: string
    ) => Promise<void>;
}

export default PasswordHash;
