import { inject, injectable } from 'inversify';
import AssesmentScheduleRepository from '../../../Domains/assesment_schedules/AssesmentScheduleRepository';
import AssesmentSchedule from '../../../Domains/assesment_schedules/entities/AssesmentSchedule';
import AssesmentScheduleRepositoryMySql from '../../../Infrastructures/repository/AssesmentScheduleRepositoryMySql';

@injectable()
class GetAssesmentSchedulesUseCase {
    constructor(
        @inject(AssesmentScheduleRepositoryMySql)
        private readonly assesmentScheduleRepository: AssesmentScheduleRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<AssesmentSchedule[]> {
        return await this.assesmentScheduleRepository.getAssesmentSchedules(
            isProcessed
        );
    }
}

export default GetAssesmentSchedulesUseCase;
