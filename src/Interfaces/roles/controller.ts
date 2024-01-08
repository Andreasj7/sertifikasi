import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import AddRoleUseCase from '../../Applications/use_case/roles/AddRoleUseCse';
import DeleteRoleUseCase from '../../Applications/use_case/roles/DeleteRoleUseCase';
import EditRoleUseCase from '../../Applications/use_case/roles/EditRoleUseCase';
import GetRoleByIdUseCase from '../../Applications/use_case/roles/GetRoleByIdUseCase';
import GetRolesUseCase from '../../Applications/use_case/roles/GetRolesUseCase';

class RolesController {
    constructor(private readonly container: Container) {}

    @autobind
    async postRole(req: Request, res: Response) {
        const addRoleUseCase = this.container.get(AddRoleUseCase);
        const addedRole = await addRoleUseCase.execute(req.body.role);
        res.status(201).json({
            status: 'success',
            message: 'Role berhasil ditambahkan',
            data: { addedRole },
        });
    }

    @autobind
    async getRoles(req: Request, res: Response) {
        const getRolesUseCase = this.container.get(GetRolesUseCase);
        const roles = await getRolesUseCase.execute();
        res.status(200).json({
            status: 'success',
            data: { roles },
        });
    }

    @autobind
    async getRoleById(req: Request, res: Response) {
        const getRoleByIdUseCase = this.container.get(GetRoleByIdUseCase);

        const { id } = req.params;
        const role = await getRoleByIdUseCase.execute(id);

        res.status(200).json({
            status: 'success',
            data: { role },
        });
    }

    @autobind
    async deleteRoleById(req: Request, res: Response) {
        const deleteRoleUseCase = this.container.get(DeleteRoleUseCase);

        const { id } = req.params;
        await deleteRoleUseCase.execute(id);

        res.status(200).json({
            status: 'success',
            message: 'Role berhasil dihapus',
        });
    }

    @autobind
    async editRoleById(req: Request, res: Response) {
        const editRoleUseCase = this.container.get(EditRoleUseCase);

        const { id } = req.params;
        const { role: roleName } = req.body;
        const role = await editRoleUseCase.execute(id, roleName);

        res.status(200).json({
            status: 'success',
            message: 'Role berhasil diubah',
            data: { role },
        });
    }
}

export default RolesController;
