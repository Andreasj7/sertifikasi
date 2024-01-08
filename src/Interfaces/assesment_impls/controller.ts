import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditAssesmentImplUseCase from '../../Applications/use_case/assesment_impls/EditAssesmentImplUseCase';
import GetAssesmentImplByIdUseCase from '../../Applications/use_case/assesment_impls/GetAssesmentImplByIdUseCase';
import GetAssesmentImplsUseCase from '../../Applications/use_case/assesment_impls/GetAssesmentImplsUseCase';

class AssesmentImplsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getAssesmentImpls(req: Request, res: Response) {
        const getAssesmentImpls = this.container.get(GetAssesmentImplsUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const assesmentImpls = await getAssesmentImpls.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { assesmentImpls },
        });
    }

    @autobind
    async getAssesmentImplById(req: Request, res: Response) {
        const getAssesmentImplByid = this.container.get(
            GetAssesmentImplByIdUseCase
        );
        const assesmentImpl = await getAssesmentImplByid.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { assesmentImpl },
        });
    }

    @autobind
    async putAssesmentImpl(req: Request, res: Response) {
        const editAssesmentImplUseCase = this.container.get(
            EditAssesmentImplUseCase
        );
        const assesmentImpl = await editAssesmentImplUseCase.execute(
            req.params.id,
            req.body.isProcessed,
            { ...req.body, isProcessed: false }
        );
        res.status(200).json({
            status: 'success',
            message: 'Pelaksanaan Asesmen berhasil diubah',
            data: { assesmentImpl },
        });
    }
}

export default AssesmentImplsController;
