import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import MinerbaDistRepository from '../../Domains/minerba_dists/MinerbaDataRepository';
import MinerbaDist from '../../Domains/minerba_dists/entities/MinerbaDist';

@injectable()
class MinerbaDistRepositoryMySql implements MinerbaDistRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableMinerbaDist(id: string): Promise<void> {
        const result = await this.db.minerbaDist.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Data Register Minerba tidak ditemukan');
        }
    }

    async addMinerbaDist(minerbaDataId: string): Promise<MinerbaDist> {
        const id = `minerbaDist-${this.idGenerator()}`;
        const result = await this.db.minerbaDist.findFirst({
            where: { idMinerbaData: minerbaDataId },
        });

        if (result === null) {
            await this.db.minerbaDist.create({
                data: {
                    id,
                    idMinerbaData: minerbaDataId,
                },
            });
            return await this.getMinerbaDistById(id);
        } else {
            return await this.getMinerbaDistById(result.id);
        }
    }

    async getMinerbaDists(
        isProcessed: boolean | undefined
    ): Promise<MinerbaDist[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.minerbaDist.findMany({
            where,
            include: {
                minerbaData: {
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
                                sptAssesor: {
                                    include: {
                                        assesmentImpl: {
                                            include: {
                                                assesions: {
                                                    include: {
                                                        schema: true,
                                                        assesmentSchedule: {
                                                            include: {
                                                                baSk: {
                                                                    include: {
                                                                        assTestResult:
                                                                            {
                                                                                include:
                                                                                    {
                                                                                        printAssesion:
                                                                                            {
                                                                                                include:
                                                                                                    {
                                                                                                        printBlank:
                                                                                                            {
                                                                                                                include:
                                                                                                                    {
                                                                                                                        printCompensation:
                                                                                                                            true,
                                                                                                                        directurSign:
                                                                                                                            true,
                                                                                                                        certManager:
                                                                                                                            true,
                                                                                                                        certStamp:
                                                                                                                            true,
                                                                                                                        certScanner:
                                                                                                                            true,
                                                                                                                        certStorage:
                                                                                                                            true,
                                                                                                                        systemMiners:
                                                                                                                            {
                                                                                                                                include:
                                                                                                                                    {
                                                                                                                                        sendCommand:
                                                                                                                                            {
                                                                                                                                                include:
                                                                                                                                                    {
                                                                                                                                                        packing:
                                                                                                                                                            {
                                                                                                                                                                include:
                                                                                                                                                                    {
                                                                                                                                                                        cardDist:
                                                                                                                                                                            {
                                                                                                                                                                                include:
                                                                                                                                                                                    {
                                                                                                                                                                                        certDist:
                                                                                                                                                                                            {
                                                                                                                                                                                                include:
                                                                                                                                                                                                    {
                                                                                                                                                                                                        receipt:
                                                                                                                                                                                                            {
                                                                                                                                                                                                                include:
                                                                                                                                                                                                                    {
                                                                                                                                                                                                                        tukConfirmation:
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
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const certManagers = result.map(
            (minerbaDist) => new MinerbaDist(minerbaDist)
        );

        return certManagers;
    }

    async getMinerbaDistById(id: string): Promise<MinerbaDist> {
        const result = await this.db.minerbaDist.findFirst({
            where: { id },
            include: {
                minerbaData: {
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
                                sptAssesor: {
                                    include: {
                                        assesmentImpl: {
                                            include: {
                                                assesions: {
                                                    include: {
                                                        schema: true,
                                                        assesmentSchedule: {
                                                            include: {
                                                                baSk: {
                                                                    include: {
                                                                        assTestResult:
                                                                            {
                                                                                include:
                                                                                    {
                                                                                        printAssesion:
                                                                                            {
                                                                                                include:
                                                                                                    {
                                                                                                        printBlank:
                                                                                                            {
                                                                                                                include:
                                                                                                                    {
                                                                                                                        printCompensation:
                                                                                                                            true,
                                                                                                                        directurSign:
                                                                                                                            true,
                                                                                                                        certManager:
                                                                                                                            true,
                                                                                                                        certStamp:
                                                                                                                            true,
                                                                                                                        certScanner:
                                                                                                                            true,
                                                                                                                        certStorage:
                                                                                                                            true,
                                                                                                                        systemMiners:
                                                                                                                            {
                                                                                                                                include:
                                                                                                                                    {
                                                                                                                                        sendCommand:
                                                                                                                                            {
                                                                                                                                                include:
                                                                                                                                                    {
                                                                                                                                                        packing:
                                                                                                                                                            {
                                                                                                                                                                include:
                                                                                                                                                                    {
                                                                                                                                                                        cardDist:
                                                                                                                                                                            {
                                                                                                                                                                                include:
                                                                                                                                                                                    {
                                                                                                                                                                                        certDist:
                                                                                                                                                                                            {
                                                                                                                                                                                                include:
                                                                                                                                                                                                    {
                                                                                                                                                                                                        receipt:
                                                                                                                                                                                                            {
                                                                                                                                                                                                                include:
                                                                                                                                                                                                                    {
                                                                                                                                                                                                                        tukConfirmation:
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
            throw new InvariantError('Data Register Minerba tidak ditemukan');
        }

        return new MinerbaDist(result);
    }

    async editMinerbaDist(
        id: string,
        no: string | undefined,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<MinerbaDist> {
        try {
            await this.db.minerbaDist.update({
                where: { id },
                data: {
                    no,
                    date,
                    isProcessed,
                },
            });
        } catch (error) {
            console.log(error);
        }

        return await this.getMinerbaDistById(id);
    }

    async deleteMinerbaDistByMinerbaDataId(
        minerbaDataId: string
    ): Promise<void> {
        await this.db.minerbaDist.deleteMany({
            where: { idMinerbaData: minerbaDataId },
        });
    }
}

export default MinerbaDistRepositoryMySql;
