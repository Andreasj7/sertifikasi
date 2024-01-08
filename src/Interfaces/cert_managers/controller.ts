import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditCertManagerUseCase from '../../Applications/use_case/cert_managers/EditCertManagerUseCase';
import GetCertManagerByIdUseCase from '../../Applications/use_case/cert_managers/GetCertManagerByIdUseCase';
import GetCertManagersUseCase from '../../Applications/use_case/cert_managers/GetCertManagersUseCase';

class CertManagersController {
    constructor(private readonly container: Container) {}

    @autobind
    async getCertManagers(req: Request, res: Response) {
        const getCertManagersUseCase = this.container.get(
            GetCertManagersUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const certManagers = await getCertManagersUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { certManagers },
        });
    }

    @autobind
    async getCertManagerById(req: Request, res: Response) {
        const getCertManagerByIdUseCase = this.container.get(
            GetCertManagerByIdUseCase
        );
        const certManager = await getCertManagerByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { certManager },
        });
    }

    @autobind
    async putCertManager(req: Request, res: Response) {
        const editCertManagerUseCase = this.container.get(
            EditCertManagerUseCase
        );

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const certManager = await editCertManagerUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { certManager },
        });
    }
}

export default CertManagersController;
