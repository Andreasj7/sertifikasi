import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditCertStampUseCase from '../../Applications/use_case/cert_stamps/EditCertStampUseCase';
import GetCertStampByIdUseCase from '../../Applications/use_case/cert_stamps/GetCertStampByIdUseCase';
import GetCertStampsUseCase from '../../Applications/use_case/cert_stamps/GetCertStampsUseCase';

class CertStampsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getCertStamps(req: Request, res: Response) {
        const getCertStampsUseCase = this.container.get(GetCertStampsUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const certStamps = await getCertStampsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { certStamps },
        });
    }

    @autobind
    async getCertStampById(req: Request, res: Response) {
        const getCertStampByIdUseCase = this.container.get(
            GetCertStampByIdUseCase
        );
        const certStamp = await getCertStampByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { certStamp },
        });
    }

    @autobind
    async putCertStamp(req: Request, res: Response) {
        const editCertStampUseCase = this.container.get(EditCertStampUseCase);

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const certStamp = await editCertStampUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { certStamp },
        });
    }
}

export default CertStampsController;
