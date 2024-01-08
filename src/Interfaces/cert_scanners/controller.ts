import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditCertScannerUseCase from '../../Applications/use_case/cert_scanners/EditCertScannerUseCase';
import GetCertScannerByIdUseCase from '../../Applications/use_case/cert_scanners/GetCertScannerByIdUseCase';
import GetCertScannersUseCase from '../../Applications/use_case/cert_scanners/GetCertScannersUseCase';

class CertScannersController {
    constructor(private readonly container: Container) {}

    @autobind
    async getCertScanners(req: Request, res: Response) {
        const getCertScannersUseCase = this.container.get(
            GetCertScannersUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const certScanners = await getCertScannersUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { certScanners },
        });
    }

    @autobind
    async getCertScannerById(req: Request, res: Response) {
        const getCertScannerByIdUseCase = this.container.get(
            GetCertScannerByIdUseCase
        );
        const certScanner = await getCertScannerByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { certScanner },
        });
    }

    @autobind
    async putCertScanner(req: Request, res: Response) {
        const editCertScannerUseCase = this.container.get(
            EditCertScannerUseCase
        );

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const certScanner = await editCertScannerUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { certScanner },
        });
    }
}

export default CertScannersController;
