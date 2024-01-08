import NewAuth from '../NewAuth';

describe('a NewAuth entity', () => {
    it('should create new auth object correctly', () => {
        // Arrange
        const payload = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
        };

        // Action
        const newAuth = new NewAuth(payload);

        // Assert
        expect(newAuth).toBeInstanceOf(NewAuth);
        expect(newAuth.accessToken).toEqual(payload.accessToken);
        expect(newAuth.refreshToken).toEqual(payload.refreshToken);
    });
});
