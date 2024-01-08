import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import { NewBaSkPayload } from '../../Commons/types';
import BaSkRepository from '../../Domains/ba_sk/BaSkRepository';
import BaSk from '../../Domains/ba_sk/entities/BaSk';

@injectable()
class BaSkRepositoryMySql implements BaSkRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableBaSk(id: string): Promise<void> {
        const result = await this.db.baSk.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Ba dan Sk tidak ditemukan');
        }
    }

    async addBaSk(assesmentScheduleId: string): Promise<BaSk> {
        const id = `baSk-${this.idGenerator()}`;
        const result = await this.db.baSk.findFirst({
            where: { idAssesmentSchedule: assesmentScheduleId },
        });

        if (result === null) {
            await this.db.baSk.create({
                data: {
                    id,
                    idAssesmentSchedule: assesmentScheduleId,
                },
            });
            return await this.getBaSkById(id);
        } else {
            return await this.getBaSkById(result!.id);
        }
    }

    async getBaSkList(isProcessed: boolean | undefined): Promise<BaSk[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.baSk.findMany({
            where,
            include: {
                assesmentSchedule: {
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
                                                        paymentConfirmation:
                                                            true,
                                                        minerbaData: {
                                                            include: {
                                                                minerbaDist:
                                                                    true,
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
                },
            },
        });

        const baSkList = result.map((baSk) => new BaSk(baSk));
        return baSkList;
    }

    async getBaSkById(id: string): Promise<BaSk> {
        const result = await this.db.baSk.findFirst({
            where: { id },
            include: {
                assesmentSchedule: {
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
                                                        paymentConfirmation:
                                                            true,
                                                        minerbaData: {
                                                            include: {
                                                                minerbaDist:
                                                                    true,
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
                },
            },
        });

        if (result === null) {
            throw new InvariantError('Ba dan Sk tidak ditemukan');
        }

        return new BaSk(result);
    }

    async editBaSk(
        id: string,
        payload: NewBaSkPayload | undefined = undefined
    ): Promise<BaSk> {
        await this.db.baSk.update({
            where: { id },
            data: {
                ...payload,
            },
        });
        return this.getBaSkById(id);
    }

    async deleteBaSkByAssesmentScheduleId(
        assesmentScheduleId: string
    ): Promise<void> {
        await this.db.baSk.deleteMany({
            where: { idAssesmentSchedule: assesmentScheduleId },
        });
    }
}

export default BaSkRepositoryMySql;
