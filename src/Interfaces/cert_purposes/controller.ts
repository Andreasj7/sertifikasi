import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import AddCertPurposeUseCase from '../../Applications/use_case/cert_purposes/AddCertPurposeUseCase';
import DeleteCertPurposeUseCase from '../../Applications/use_case/cert_purposes/DeleteCertPurposeUseCase';
import EditCertPurposeUseCase from '../../Applications/use_case/cert_purposes/EditCertPurposeUseCase';
import GetCertPurposeByIdUseCase from '../../Applications/use_case/cert_purposes/GetCertPurposeByIdUseCase';
import GetCertPurposesUseCase from '../../Applications/use_case/cert_purposes/GetCertPurposesUseCase';

class CertPurposesController {
    constructor(private readonly container: Container) {}

    @autobind
    async postCertPurpose(req: Request, res: Response) {
        const addCertPurposeUseCase = this.container.get(AddCertPurposeUseCase);
        const addedPurpose = await addCertPurposeUseCase.execute(
            req.body.purpose
        );
        res.status(201).json({
            status: 'success',
            data: { addedPurpose },
        });
    }

    @autobind
    async getCertPurposes(req: Request, res: Response) {
        const getCertPurposesUseCase = this.container.get(
            GetCertPurposesUseCase
        );
        const purposes = await getCertPurposesUseCase.execute();
        res.status(200).json({
            status: 'success',
            data: { purposes },
        });
    }

    @autobind
    async getCertPurposeById(req: Request, res: Response) {
        const getCertPurposeByIdUseCase = this.container.get(
            GetCertPurposeByIdUseCase
        );
        const purpose = await getCertPurposeByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { purpose },
        });
    }

    @autobind
    async putCertPurpose(req: Request, res: Response) {
        const editCertPurposeUseCase = this.container.get(
            EditCertPurposeUseCase
        );

        const { id } = req.params;
        const { purpose: certPurpose } = req.body;
        const purpose = await editCertPurposeUseCase.execute(id, certPurpose);

        res.status(200).json({
            status: 'success',
            message: 'Tujuan Sertifikasi berhasil diubah',
            data: { purpose },
        });
    }

    @autobind
    async deleteCertPurpose(req: Request, res: Response) {
        const deleteCertPurposeUseCase = this.container.get(
            DeleteCertPurposeUseCase
        );
        await deleteCertPurposeUseCase.execute(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Tujuan Sertifikasi berhasil dihapus',
        });
    }
}

export default CertPurposesController;
