import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import { NewBlankApplicationPayload } from '../../Commons/types';
import BlankApplicationRepository from '../../Domains/blank_application/BlankApplicationRepository';
import BlankApplication from '../../Domains/blank_application/entities/BlankApplication';

@injectable()
class BlankApplicationRepositoryMySql implements BlankApplicationRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableBlankApplication(id: string): Promise<void> {
        const result = await this.db.blankApplication.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Permohonan Blanko tidak ditemukan');
        }
    }

    async addBlankApplication(
        certApplicationId: string
    ): Promise<BlankApplication> {
        const id = `blankApplication-${this.idGenerator()}`;
        const result = await this.db.blankApplication.findFirst({
            where: { idCertApplication: certApplicationId },
        });

        if (result === null) {
            await this.db.blankApplication.create({
                data: {
                    id,
                    idCertApplication: certApplicationId,
                },
            });
            return await this.getBlankApplicationById(id);
        } else {
            return await this.getBlankApplicationById(result.id);
        }
    }

    async getBlankApplications(
        isProcessed: boolean | undefined
    ): Promise<BlankApplication[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.blankApplication.findMany({
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

        const blankApplications = result.map((blankApplication) => {
            return new BlankApplication(blankApplication);
        });
        return blankApplications;
    }
    async getBlankApplicationById(id: string): Promise<BlankApplication> {
        const result = await this.db.blankApplication.findFirst({
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
            throw new InvariantError('Permohonan Blanko tidak ditemukan');
        }

        return new BlankApplication(result);
    }
    async editBlankApplication(
        id: string,
        payload: NewBlankApplicationPayload | undefined
    ): Promise<BlankApplication> {
        await this.db.blankApplication.update({
            where: { id },
            data: {
                ...payload,
            },
        });
        return await this.getBlankApplicationById(id);
    }
    async deleteBlankApplicationBycertApplicationId(
        certApplicationId: string
    ): Promise<void> {
        await this.db.blankApplication.deleteMany({
            where: { idCertApplication: certApplicationId },
        });
    }
}

export default BlankApplicationRepositoryMySql;
