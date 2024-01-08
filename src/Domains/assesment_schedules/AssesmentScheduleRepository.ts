import AssesmentSchedule from './entities/AssesmentSchedule';

interface AssesmentScheduleRepository {
    verifyAvailableAssesmentSchedule(id: string): Promise<void>;
    addAssesmenSchedules(assesionId: string): Promise<AssesmentSchedule>;
    getAssesmentSchedules(
        isProcessed: boolean | undefined
    ): Promise<AssesmentSchedule[]>;
    getAssesmentScheduleById(id: string): Promise<AssesmentSchedule>;
    editAssesmentSchedule(
        id: string,
        schedule: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<AssesmentSchedule>;
    deleteAssesmentScheduleByAssesionId(id: string): Promise<void>;
}

export default AssesmentScheduleRepository;
