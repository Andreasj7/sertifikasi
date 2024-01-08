import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import MinerbaDataRepository from '../../Domains/minerba_datas/MinerbaDataRepository';
import MinerbaData from '../../Domains/minerba_datas/entities/MinerbaData';

@injectable()
class MinerbaDataRepositoryMySql implements MinerbaDataRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableMinerbaData(id: string): Promise<void> {
        const result = await this.db.minerbaData.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Data Register Minerba tidak ditemukan');
        }
    }

    async addMinerbaData(certApplicationId: string): Promise<MinerbaData> {
        const id = `minerbaData-${this.idGenerator()}`;
        const result = await this.db.minerbaData.findFirst({
            where: { idCertApplication: certApplicationId },
        });

        if (result === null) {
            await this.db.minerbaData.create({
                data: {
                    id,
                    idCertApplication: certApplicationId,
                },
            });
            return await this.getMinerbaDataById(id);
        } else {
            return await this.getMinerbaDataById(result.id);
        }
    }

    async getMinerbaDatas(
        isProcessed: boolean | undefined
    ): Promise<MinerbaData[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.minerbaData.findMany({
            where,
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
                                                                assTestResult: {
                                                                    include: {
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
        });

        const certManagers = result.map(
            (minerbaData) => new MinerbaData(minerbaData)
        );

        return certManagers;
    }

    async getMinerbaDataById(id: string): Promise<MinerbaData> {
        const result = await this.db.minerbaData.findFirst({
            where: { id },
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
                                                                assTestResult: {
                                                                    include: {
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
        });

        if (result === null) {
            throw new InvariantError('Data Register Minerba tidak ditemukan');
        }

        return new MinerbaData(result);
    }

    async editMinerbaData(
        id: string,
        no: string | undefined,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<MinerbaData> {
        try {
            await this.db.minerbaData.update({
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

        return await this.getMinerbaDataById(id);
    }

    async deleteMinerbaDataByCertApplicationId(
        certApplicationId: string
    ): Promise<void> {
        await this.db.minerbaData.deleteMany({
            where: { idCertApplication: certApplicationId },
        });
    }
}

export default MinerbaDataRepositoryMySql;
