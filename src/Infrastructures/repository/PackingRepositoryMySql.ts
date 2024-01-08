import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import PackingRepository from '../../Domains/packings/PackingRepository';
import Packing from '../../Domains/packings/entities/Packing';

@injectable()
class PackingRepositoryMySql implements PackingRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailablePacking(id: string): Promise<void> {
        const result = await this.db.packing.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Data Packing tidak ditemukan');
        }
    }

    async addPacking(sendCommandId: string): Promise<Packing> {
        const id = `packing-${this.idGenerator()}`;
        const result = await this.db.packing.findFirst({
            where: { idSendCommand: sendCommandId },
        });

        if (result === null) {
            await this.db.packing.create({
                data: {
                    id,
                    idSendCommand: sendCommandId,
                },
            });
            return await this.getPackingById(id);
        } else {
            return await this.getPackingById(result.id);
        }
    }

    async getPackings(isProcessed: boolean | undefined): Promise<Packing[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.packing.findMany({
            where,
            include: {
                sendCommand: {
                    include: {
                        systemMiners: {
                            include: {
                                printBlank: {
                                    include: {
                                        printAssesion: {
                                            include: {
                                                assTestResult: {
                                                    include: {
                                                        baSk: {
                                                            include: {
                                                                assesmentSchedule:
                                                                    {
                                                                        include:
                                                                            {
                                                                                assesion:
                                                                                    {
                                                                                        include:
                                                                                            {
                                                                                                schema: true,
                                                                                                assesmentImpl:
                                                                                                    {
                                                                                                        include:
                                                                                                            {
                                                                                                                sptAssesor:
                                                                                                                    {
                                                                                                                        include:
                                                                                                                            {
                                                                                                                                certApplication:
                                                                                                                                    {
                                                                                                                                        include:
                                                                                                                                            {
                                                                                                                                                certPurpose:
                                                                                                                                                    true,
                                                                                                                                                approval:
                                                                                                                                                    true,
                                                                                                                                                blankApplication:
                                                                                                                                                    true,
                                                                                                                                                certHolder:
                                                                                                                                                    true,
                                                                                                                                                invoiceDist:
                                                                                                                                                    true,
                                                                                                                                                paymentConfirmation:
                                                                                                                                                    true,
                                                                                                                                                minerbaData:
                                                                                                                                                    {
                                                                                                                                                        include:
                                                                                                                                                            {
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

        const certManagers = result.map((packing) => new Packing(packing));

        return certManagers;
    }

    async getPackingById(id: string): Promise<Packing> {
        const result = await this.db.packing.findFirst({
            where: { id },
            include: {
                sendCommand: {
                    include: {
                        systemMiners: {
                            include: {
                                printBlank: {
                                    include: {
                                        printAssesion: {
                                            include: {
                                                assTestResult: {
                                                    include: {
                                                        baSk: {
                                                            include: {
                                                                assesmentSchedule:
                                                                    {
                                                                        include:
                                                                            {
                                                                                assesion:
                                                                                    {
                                                                                        include:
                                                                                            {
                                                                                                schema: true,
                                                                                                assesmentImpl:
                                                                                                    {
                                                                                                        include:
                                                                                                            {
                                                                                                                sptAssesor:
                                                                                                                    {
                                                                                                                        include:
                                                                                                                            {
                                                                                                                                certApplication:
                                                                                                                                    {
                                                                                                                                        include:
                                                                                                                                            {
                                                                                                                                                certPurpose:
                                                                                                                                                    true,
                                                                                                                                                approval:
                                                                                                                                                    true,
                                                                                                                                                blankApplication:
                                                                                                                                                    true,
                                                                                                                                                certHolder:
                                                                                                                                                    true,
                                                                                                                                                invoiceDist:
                                                                                                                                                    true,
                                                                                                                                                paymentConfirmation:
                                                                                                                                                    true,
                                                                                                                                                minerbaData:
                                                                                                                                                    {
                                                                                                                                                        include:
                                                                                                                                                            {
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
            throw new InvariantError('Data Packing tidak ditemukan');
        }

        return new Packing(result);
    }

    async editPacking(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<Packing> {
        try {
            await this.db.packing.update({
                where: { id },
                data: {
                    id,
                    date,
                    isProcessed,
                },
            });
        } catch (error) {
            console.log(error);
        }

        return await this.getPackingById(id);
    }

    async deletePackingBySendCommandId(sendCommandId: string): Promise<void> {
        await this.db.packing.deleteMany({
            where: { idSendCommand: sendCommandId },
        });
    }
}

export default PackingRepositoryMySql;
