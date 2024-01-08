import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditCertStorageUseCase from '../../Applications/use_case/cert_storages/EditCertScannerUseCase';
import GetCertStorageByIdUseCase from '../../Applications/use_case/cert_storages/GetCertStorageByIdUseCase';
import GetCertStoragesUseCase from '../../Applications/use_case/cert_storages/GetCertStoragesUseCase';

class CertStoragesController {
    constructor(private readonly container: Container) {}

    @autobind
    async getCertStorages(req: Request, res: Response) {
        const getCertStoragesUseCase = this.container.get(
            GetCertStoragesUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const certStorages = await getCertStoragesUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { certStorages },
        });
    }

    @autobind
    async getCertStorageById(req: Request, res: Response) {
        const getCertStorageByIdUseCase = this.container.get(
            GetCertStorageByIdUseCase
        );
        const certStorage = await getCertStorageByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { certStorage },
        });
    }

    @autobind
    async putCertStorage(req: Request, res: Response) {
        const editCertStorageUseCase = this.container.get(
            EditCertStorageUseCase
        );

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const certStorage = await editCertStorageUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { certStorage },
        });
    }
}

export default CertStoragesController;
