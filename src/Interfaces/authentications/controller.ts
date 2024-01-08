import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import ChangePasswordUseCase from '../../Applications/use_case/authentications/ChangePasswordUseCase';
import LoginUserUseCase from '../../Applications/use_case/authentications/LoginUserUseCase';
import LogoutUserUseCase from '../../Applications/use_case/authentications/LogoutUserUseCase';
import GetUserByIdUseCase from '../../Applications/use_case/users/GetUserByIdUseCase';

class AuthenticationsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getLoggedUser(req: Request, res: Response) {
        const getUserByIdUseCase = this.container.get(GetUserByIdUseCase);

        const id = res.locals.userId;
        const user = await getUserByIdUseCase.execute(id);
        res.status(200).json({
            status: 'success',
            data: { user },
        });
    }

    @autobind
    async postAuthentication(req: Request, res: Response) {
        const loginUserUseCase = this.container.get(LoginUserUseCase);

        const payload = req.body;
        const { accessToken, refreshToken } = await loginUserUseCase.execute(
            payload
        );

        res.json({
            status: 'success',
            data: {
                accessToken,
                refreshToken,
            },
        });
    }

    @autobind
    async deleteAuthentication(req: Request, res: Response) {
        const logoutUserUseCase = this.container.get(LogoutUserUseCase);
        await logoutUserUseCase.execute(req.body.refreshToken);
        res.status(200).json({
            status: 'success',
            message: 'Logout success',
        });
    }

    @autobind
    async putPassword(req: Request, res: Response) {
        const changePasswordUseCase = this.container.get(ChangePasswordUseCase);

        const { id, password } = req.body;
        await changePasswordUseCase.execute(id, password);

        res.status(200).json({
            status: 'success',
            message: 'Password berhasil diubah',
        });
    }
}

export default AuthenticationsController;
