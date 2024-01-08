import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditAssesmentScheduleUseCase from '../../Applications/use_case/assesment_schedules/EditAssesmentScheduleUseCase';
import GetAssesmentScheduleByIdUseCase from '../../Applications/use_case/assesment_schedules/GetAssesmentScheduleByIdUseCase';
import GetAssesmentSchedulesUseCase from '../../Applications/use_case/assesment_schedules/GetAssesmentSchedulesUseCase';

class AssesmentSchedulesController {
    constructor(private readonly container: Container) {}

    @autobind
    async getAssesmentsSchedules(req: Request, res: Response) {
        const getAssesmentSchedulesUseCase = this.container.get(
            GetAssesmentSchedulesUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const assesmentSchedules = await getAssesmentSchedulesUseCase.execute(
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            data: { assesmentSchedules },
        });
    }

    @autobind
    async getAssesmentByIdSchedules(req: Request, res: Response) {
        const getAssesmentScheduleByIdUseCase = this.container.get(
            GetAssesmentScheduleByIdUseCase
        );
        const assesmentSchedule = await getAssesmentScheduleByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { assesmentSchedule },
        });
    }

    @autobind
    async putAssesmentSchedules(req: Request, res: Response) {
        const editAssesmentScheduleUseCase = this.container.get(
            EditAssesmentScheduleUseCase
        );
        const { id } = req.params;
        const { schedule, isProcessed } = req.body;
        const assesmentSchedule = await editAssesmentScheduleUseCase.execute(
            id,
            schedule,
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            data: { assesmentSchedule },
        });
    }
}

export default AssesmentSchedulesController;
