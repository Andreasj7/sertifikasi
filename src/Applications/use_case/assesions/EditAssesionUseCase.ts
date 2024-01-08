import { inject, injectable } from 'inversify';
import AssesionRepository from '../../../Domains/assesions/AssesionRepository';
import Assesion from '../../../Domains/assesions/entities/Assesions';
import AssesmentScheduleRepository from '../../../Domains/assesment_schedules/AssesmentScheduleRepository';
import AssesionRepositoryMySql from '../../../Infrastructures/repository/AssesionRepositoryMySql';
import AssesmentScheduleRepositoryMySql from '../../../Infrastructures/repository/AssesmentScheduleRepositoryMySql';

@injectable()
class EditAssesionUseCase {
    constructor(
        @inject(AssesionRepositoryMySql)
        private readonly assesionRepository: AssesionRepository,
        @inject(AssesmentScheduleRepositoryMySql)
        private readonly assesmentScheduleRepository: AssesmentScheduleRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined = undefined,
        isProcessed: boolean | undefined = undefined
    ): Promise<Assesion> {
        await this.assesionRepository.verifyAvailableAssesion(id);
        const result = await this.assesionRepository.editAssesion(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.assesmentScheduleRepository.addAssesmenSchedules(id);
        } else {
            await this.assesmentScheduleRepository.deleteAssesmentScheduleByAssesionId(
                id
            );
        }
        return result;
    }
}

export default EditAssesionUseCase;
