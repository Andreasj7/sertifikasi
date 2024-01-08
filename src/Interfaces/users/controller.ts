import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import AddUserUseCase from '../../Applications/use_case/users/AddUserUseCase';
import DeleteUserUseCase from '../../Applications/use_case/users/DeleteUserUseCase';
import EditUserUseCase from '../../Applications/use_case/users/EditUserUseCase';
import GetUserByIdUseCase from '../../Applications/use_case/users/GetUserByIdUseCase';
import GetUsersUseCase from '../../Applications/use_case/users/GetUsersUseCase';

class UsersController {
    constructor(private readonly container: Container) {}

    @autobind
    async postUser(req: Request, res: Response) {
        const addUserUseCase = this.container.get(AddUserUseCase);
        const addedUser = await addUserUseCase.execute(req.body);
        res.status(201).json({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: { addedUser },
        });
    }

    @autobind
    async deleteUser(req: Request, res: Response) {
        const deleteUserUseCase = this.container.get(DeleteUserUseCase);
        const { id } = req.params;

        await deleteUserUseCase.execute(id);

        res.status(200).json({
            status: 'success',
            message: 'User berhasil dihapus',
        });
    }

    @autobind
    async putUser(req: Request, res: Response) {
        const editUserUseCase = this.container.get(EditUserUseCase);
        const { id } = req.params;
        const user = await editUserUseCase.execute(id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'User berhasil diubah',
            data: { user },
        });
    }

    @autobind
    async getUsers(req: Request, res: Response) {
        const getUsersUseCase = this.container.get(GetUsersUseCase);
        const users = await getUsersUseCase.execute();
        res.status(200).json({
            status: 'success',
            data: { users },
        });
    }

    @autobind
    async getUserById(req: Request, res: Response) {
        const getUserByIdUseCase = this.container.get(GetUserByIdUseCase);
        const user = await getUserByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { user },
        });
    }
}

export default UsersController;
