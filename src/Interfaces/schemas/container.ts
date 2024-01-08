import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import AddSchemaUseCase from '../../Applications/use_case/schemas/AddSchemaUseCase';
import DeleteSchemaUseCase from '../../Applications/use_case/schemas/DeleteSchemaUseCase';
import EditSchemaUseCase from '../../Applications/use_case/schemas/EditSchemaUseCase';
import GetSchemaByIdUseCase from '../../Applications/use_case/schemas/GetSchemaByIdUseCase';
import GetSchemaUseCase from '../../Applications/use_case/schemas/GetSchemasUseCase';

class SchemasController {
    constructor(private readonly container: Container) {}

    @autobind
    async postSchema(req: Request, res: Response) {
        const addSchemaUseCase = this.container.get(AddSchemaUseCase);
        const addedSchema = await addSchemaUseCase.execute(req.body.schema);
        res.status(201).json({
            status: 'success',
            data: { addedSchema },
        });
    }

    @autobind
    async getSchemas(req: Request, res: Response) {
        const getSchemasUseCase = this.container.get(GetSchemaUseCase);
        const schemas = await getSchemasUseCase.execute();
        res.status(200).json({
            status: 'success',
            data: { schemas },
        });
    }

    @autobind
    async getSchemaById(req: Request, res: Response) {
        const getSchemaByIdUseCase = this.container.get(GetSchemaByIdUseCase);

        const { id } = req.params;
        const schema = await getSchemaByIdUseCase.execute(id);

        res.status(200).json({
            status: 'success',
            data: { schema },
        });
    }

    @autobind
    async deleteSchema(req: Request, res: Response) {
        const deleteSchemaUseCase = this.container.get(DeleteSchemaUseCase);

        const { id } = req.params;
        await deleteSchemaUseCase.execute(id);

        res.status(200).json({
            status: 'success',
            message: 'Skema berhasil dihapus',
        });
    }

    @autobind
    async putSchema(req: Request, res: Response) {
        const editSchemaUseCase = this.container.get(EditSchemaUseCase);

        const { id } = req.params;
        const { schema: schemaName } = req.body;
        const schema = await editSchemaUseCase.execute(id, schemaName);

        res.status(200).json({
            status: 'success',
            message: 'Skema berhasil diubah',
            data: { schema },
        });
    }
}

export default SchemasController;
