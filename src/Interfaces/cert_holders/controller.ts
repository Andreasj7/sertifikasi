import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditCertHolderUseCase from '../../Applications/use_case/cert_holders/EditCertHolderUseCase';
import GetCertHolderByIdUseCase from '../../Applications/use_case/cert_holders/GetCertHolderByIdUseCase';
import GetCertHoldersUseCase from '../../Applications/use_case/cert_holders/GetCertHoldersUseCase';

class CertHoldersController {
    constructor(private readonly container: Container) {}

    @autobind
    async getCertHolders(req: Request, res: Response) {
        const getCertHoldersUseCase = this.container.get(GetCertHoldersUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const certHolders = await getCertHoldersUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { certHolders },
        });
    }

    @autobind
    async getCertHolderById(req: Request, res: Response) {
        const getCertHolderByIdUseCase = this.container.get(
            GetCertHolderByIdUseCase
        );
        const certHolder = await getCertHolderByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { certHolder },
        });
    }

    @autobind
    async putCertHolder(req: Request, res: Response) {
        const editCertHolderUseCase = this.container.get(EditCertHolderUseCase);

        const { id } = req.params;
        const { certHolder: holder, isProcessed } = req.body;
        const certHolder = await editCertHolderUseCase.execute(
            id,
            holder,
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            data: { certHolder },
        });
    }
}

export default CertHoldersController;
