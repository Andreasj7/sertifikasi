import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditAssesionUseCase from '../../Applications/use_case/assesions/EditAssesionUseCase';
import GetAssesionByIdUseCase from '../../Applications/use_case/assesions/GetAssesionByIdUseCase';
import GetAssesionsUseCase from '../../Applications/use_case/assesions/GetAssesionsUseCase';

class AssesionsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getAssesions(req: Request, res: Response) {
        try {
            const getAssesionsUseCase = this.container.get(GetAssesionsUseCase);
            const isProcessed =
                req.query.isProcessed !== undefined
                    ? req.query.isProcessed === 'true'
                    : undefined;
            const assesions = await getAssesionsUseCase.execute(isProcessed);
            res.status(200).json({
                status: 'success',
                data: { assesions },
            });
        } catch (error) {
            console.log(error);
        }
    }

    @autobind
    async getAssesionsById(req: Request, res: Response) {
        const getAssesionByIdUseCase = this.container.get(
            GetAssesionByIdUseCase
        );
        const assesion = await getAssesionByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { assesion },
        });
    }

    @autobind
    async putAssesion(req: Request, res: Response) {
        const editAssesionUseCase = this.container.get(EditAssesionUseCase);
        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const assesion = await editAssesionUseCase.execute(
            id,
            date,
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            message: 'Pengisian Data Asesi berhasil',
            data: { assesion },
        });
    }
}

export default AssesionsController;
