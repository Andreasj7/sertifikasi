import { inject, injectable } from 'inversify';
import AssesmentScheduleRepository from '../../../Domains/assesment_schedules/AssesmentScheduleRepository';
import AssesmentSchedule from '../../../Domains/assesment_schedules/entities/AssesmentSchedule';
import AssesmentScheduleRepositoryMySql from '../../../Infrastructures/repository/AssesmentScheduleRepositoryMySql';

@injectable()
class GetAssesmentScheduleByIdUseCase {
    constructor(
        @inject(AssesmentScheduleRepositoryMySql)
        private readonly assesmentScheduleRepository: AssesmentScheduleRepository
    ) {}

    async execute(id: string): Promise<AssesmentSchedule> {
        return await this.assesmentScheduleRepository.getAssesmentScheduleById(
            id
        );
    }
}

export default GetAssesmentScheduleByIdUseCase;
