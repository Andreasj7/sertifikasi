import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditCertDistUseCase from '../../Applications/use_case/cert_dists/EditCertDistUseCase';
import GetCertDistByIdUseCase from '../../Applications/use_case/cert_dists/GetCertDistByIdUseCase';
import GetCertDistsUseCase from '../../Applications/use_case/cert_dists/GetCertDistsUseCase';

class CertDistsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getCertDists(req: Request, res: Response) {
        const getCertDistsUseCase = this.container.get(GetCertDistsUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const certDists = await getCertDistsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { certDists },
        });
    }

    @autobind
    async getCertDistById(req: Request, res: Response) {
        const getCertDistByIdUseCase = this.container.get(
            GetCertDistByIdUseCase
        );
        const certDist = await getCertDistByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { certDist },
        });
    }

    @autobind
    async putCertDist(req: Request, res: Response) {
        const editCertDistUseCase = this.container.get(EditCertDistUseCase);

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const certDist = await editCertDistUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { certDist },
        });
    }
}

export default CertDistsController;
