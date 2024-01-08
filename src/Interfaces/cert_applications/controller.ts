import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import AddCertApplicationUseCase from '../../Applications/use_case/cert_applications/AddCertApplicationUseCase';
import ApproveCertApplicationUseCase from '../../Applications/use_case/cert_applications/ApproveCertApplicationUseCase';
import EditCertApplicationProcessedUseCase from '../../Applications/use_case/cert_applications/EditCertApplicationProcessedUseCase';
import GetCertApplicationByIdUseCase from '../../Applications/use_case/cert_applications/GetCertApplicationByIdUseCase';
import GetCertApplicationsUseCase from '../../Applications/use_case/cert_applications/GetCertApplicationsUseCase';

class CertApplicationsController {
    constructor(private readonly container: Container) {}

    @autobind
    async postCertApplication(req: Request, res: Response) {
        const addCertApplicationUseCase = this.container.get(
            AddCertApplicationUseCase
        );
        const addedCertApplication = await addCertApplicationUseCase.execute(
            req.body
        );
        res.status(201).json({
            status: 'success',
            data: { addedCertApplication },
        });
    }

    @autobind
    async getCertApplications(req: Request, res: Response) {
        const getCertApplicationsUseCase = this.container.get(
            GetCertApplicationsUseCase
        );
        const isApproved =
            req.query.isApproved !== undefined
                ? req.query.isApproved === 'true'
                : undefined;
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const isThreeMonth =
            req.query.isThreeMonth !== undefined
                ? req.query.isThreeMonth === 'true'
                : undefined;
        const certApplications = await getCertApplicationsUseCase.execute(
            isApproved,
            isProcessed,
            isThreeMonth
        );
        res.status(200).json({
            status: 'success',
            data: { certApplications },
        });
    }

    @autobind
    async getCertApplicationById(req: Request, res: Response) {
        const getCertApplicationsByIdUseCase = this.container.get(
            GetCertApplicationByIdUseCase
        );
        const certApplication = await getCertApplicationsByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { certApplication },
        });
    }

    @autobind
    async approveCertApplication(req: Request, res: Response) {
        const approveCertApplicationUseCase = this.container.get(
            ApproveCertApplicationUseCase
        );
        const certApplication = await approveCertApplicationUseCase.execute(
            req.params.id,
            req.body.isApproved
        );
        res.status(200).json({
            status: 'success',
            message: 'Permohonan Sertifikasi berhasil diubah',
            data: { certApplication },
        });
    }

    @autobind
    async putCertApplicationProcessed(req: Request, res: Response) {
        const editCertApplicationProcessed = this.container.get(
            EditCertApplicationProcessedUseCase
        );
        const certApplication = await editCertApplicationProcessed.execute(
            req.params.id,
            req.body.isProcessed
        );
        res.status(200).json({
            status: 'success',
            message: 'Permohonan Sertifikasi selesai',
            data: { certApplication },
        });
    }
}

export default CertApplicationsController;
