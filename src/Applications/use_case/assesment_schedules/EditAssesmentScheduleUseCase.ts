import { inject, injectable } from 'inversify';
import AssesmentScheduleRepository from '../../../Domains/assesment_schedules/AssesmentScheduleRepository';
import AssesmentSchedule from '../../../Domains/assesment_schedules/entities/AssesmentSchedule';
import BaSkRepository from '../../../Domains/ba_sk/BaSkRepository';
import AssesmentScheduleRepositoryMySql from '../../../Infrastructures/repository/AssesmentScheduleRepositoryMySql';
import BaSkRepositoryMySql from '../../../Infrastructures/repository/BaSkRepositoryyMySql';

@injectable()
class EditAssesmentScheduleUseCase {
    constructor(
        @inject(AssesmentScheduleRepositoryMySql)
        private readonly assesmentScheduleRepository: AssesmentScheduleRepository,
        @inject(BaSkRepositoryMySql)
        private readonly baSkRepository: BaSkRepository
    ) {}

    async execute(
        id: string,
        schedule: string | undefined = undefined,
        isProcessed: boolean | undefined = undefined
    ): Promise<AssesmentSchedule> {
        await this.assesmentScheduleRepository.verifyAvailableAssesmentSchedule(
            id
        );
        const result =
            await this.assesmentScheduleRepository.editAssesmentSchedule(
                id,
                schedule,
                isProcessed
            );

        if (result.isProcessed) {
            await this.baSkRepository.addBaSk(id);
        } else {
            await this.baSkRepository.deleteBaSkByAssesmentScheduleId(id);
        }

        return result;
    }
}

export default EditAssesmentScheduleUseCase;
