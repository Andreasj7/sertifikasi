import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditBlankApplicationUseCase from '../../Applications/use_case/blank_applications/EditBlankApplicationUseCase';
import GetBlankApplicationByIdUseCase from '../../Applications/use_case/blank_applications/GetBlankApplicationByIdUseCase';
import GetBlankApplicationsUseCase from '../../Applications/use_case/blank_applications/GetBlankApplicationsUseCase';

class BlankApplicationsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getBlankApplications(req: Request, res: Response) {
        try {
            const getBlankApplicationsUseCase = this.container.get(
                GetBlankApplicationsUseCase
            );
            const isProcessed =
                req.query.isProcessed !== undefined
                    ? req.query.isProcessed === 'true'
                    : undefined;
            const blankApplications = await getBlankApplicationsUseCase.execute(
                isProcessed
            );
            res.status(200).json({
                status: 'success',
                data: { blankApplications },
            });
        } catch (error) {
            console.log(error);
        }
    }

    @autobind
    async getBlankApplicationById(req: Request, res: Response) {
        const getBlankApplicationByIdUseCase = this.container.get(
            GetBlankApplicationByIdUseCase
        );
        const blankApplication = await getBlankApplicationByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { blankApplication },
        });
    }

    @autobind
    async putBlankApplication(req: Request, res: Response) {
        try {
            const editBlankApplicationUseCase = this.container.get(
                EditBlankApplicationUseCase
            );
            const { id } = req.params;
            const blankApplication = await editBlankApplicationUseCase.execute(
                id,
                req.body
            );
            res.status(200).json({
                status: 'success',
                data: { blankApplication },
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default BlankApplicationsController;
