import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import AddRoleUseCase from '../../Applications/use_case/roles/AddRoleUseCse';
import AddUserUseCase from '../../Applications/use_case/users/AddUserUseCase';
import DeleteUserUseCase from '../../Applications/use_case/users/DeleteUserUseCase';
import EditUserUseCase from '../../Applications/use_case/users/EditUserUseCase';
import GetUsersUseCase from '../../Applications/use_case/users/GetUsersUseCase';

class AdminsController {
    constructor(private readonly container: Container) {}

    @autobind
    async postAdminRole(req: Request, res: Response) {
        const addRoleUseCase = this.container.get(AddRoleUseCase);
        const addedRole = await addRoleUseCase.execute(req.body.role);
        res.status(201).json({
            status: 'success',
            message: 'Role berhasil ditambahkan',
            data: { addedRole },
        });
    }

    @autobind
    async postAdminUser(req: Request, res: Response) {
        try {
            const addUserUseCase = this.container.get(AddUserUseCase);
            const addedUser = await addUserUseCase.execute(req.body);
            res.status(201).json({
                status: 'success',
                message: 'User berhasil ditambahkan',
                data: { addedUser },
            });
        } catch (error) {
            console.log(error);
        }
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
}

export default AdminsController;
