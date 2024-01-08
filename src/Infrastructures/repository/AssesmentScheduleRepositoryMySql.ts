import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import AssesmentScheduleRepository from '../../Domains/assesment_schedules/AssesmentScheduleRepository';
import AssesmentSchedule from '../../Domains/assesment_schedules/entities/AssesmentSchedule';

@injectable()
class AssesmentScheduleRepositoryMySql implements AssesmentScheduleRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableAssesmentSchedule(id: string): Promise<void> {
        const result = await this.db.assesmentSchedule.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Jadwal Assesmen tidak ditemukan');
        }
    }

    async addAssesmenSchedules(assesionId: string): Promise<AssesmentSchedule> {
        const id = `assesmentSchedule-${this.idGenerator()}`;
        const result = await this.db.assesmentSchedule.findFirst({
            where: { idAssesion: assesionId },
        });

        if (result === null) {
            await this.db.assesmentSchedule.create({
                data: {
                    id,
                    idAssesion: assesionId,
                },
            });
            return await this.getAssesmentScheduleById(id);
        } else {
            return await this.getAssesmentScheduleById(result.id);
        }
    }

    async getAssesmentSchedules(
        isProcessed: boolean | undefined
    ): Promise<AssesmentSchedule[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.assesmentSchedule.findMany({
            where,
            include: {
                assesion: {
                    include: {
                        schema: true,
                        assesmentImpl: {
                            include: {
                                sptAssesor: {
                                    include: {
                                        certApplication: {
                                            include: {
                                                certPurpose: true,
                                                approval: true,
                                                blankApplication: true,
                                                certHolder: true,
                                                invoiceDist: true,
                                                paymentConfirmation: true,
                                                minerbaData: {
                                                    include: {
                                                        minerbaDist: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const assesmentSchedules = result.map(
            (schedule) => new AssesmentSchedule(schedule)
        );
        return assesmentSchedules;
    }

    async getAssesmentScheduleById(id: string): Promise<AssesmentSchedule> {
        const result = await this.db.assesmentSchedule.findFirst({
            where: { id },
            include: {
                assesion: {
                    include: {
                        schema: true,
                        assesmentImpl: {
                            include: {
                                sptAssesor: {
                                    include: {
                                        certApplication: {
                                            include: {
                                                certPurpose: true,
                                                approval: true,
                                                blankApplication: true,
                                                certHolder: true,
                                                invoiceDist: true,
                                                paymentConfirmation: true,
                                                minerbaData: {
                                                    include: {
                                                        minerbaDist: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (result === null) {
            throw new InvariantError('Jadwal Assesmen tidak ditemukan');
        }

        return new AssesmentSchedule(result);
    }

    async editAssesmentSchedule(
        id: string,
        schedule: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<AssesmentSchedule> {
        await this.db.assesmentSchedule.update({
            where: { id },
            data: {
                schedule,
                isProcessed,
            },
        });
        return await this.getAssesmentScheduleById(id);
    }

    async deleteAssesmentScheduleByAssesionId(id: string): Promise<void> {
        await this.db.assesmentSchedule.deleteMany({
            where: { idAssesion: id },
        });
    }
}

export default AssesmentScheduleRepositoryMySql;
