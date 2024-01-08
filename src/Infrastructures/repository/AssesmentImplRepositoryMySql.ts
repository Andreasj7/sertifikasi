import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import AssesmentImplRepository from '../../Domains/assesment_impl/AssmentImplRepository';
import AssesmentImpl from '../../Domains/assesment_impl/entities/AssesmentImpl';

@injectable()
class AssesmentImplRepositoryMySql implements AssesmentImplRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async deleteAssesmentImplByAssesorId(sptAssesorId: string): Promise<void> {
        await this.db.assesmentImplementation.deleteMany({
            where: { idSptAssesor: sptAssesorId },
        });
    }

    async verifyAvailableAssesmentImpl(id: string): Promise<void> {
        const result = await this.db.assesmentImplementation.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Pelaksanaan Asesmen tidak ditemukan');
        }
    }

    async getAssesmentImpls(
        isProcessed: boolean | undefined = undefined
    ): Promise<AssesmentImpl[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.assesmentImplementation.findMany({
            where,
            include: {
                assesions: {
                    include: {
                        schema: true,
                    },
                },
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
                                                                printAssesion: {
                                                                    include: {
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
        });
        const assesments = result.map(
            (assesment) => new AssesmentImpl(assesment)
        );
        return assesments;
    }

    async getAssesmentImplById(id: string): Promise<AssesmentImpl> {
        const result = await this.db.assesmentImplementation.findFirst({
            where: { id },
            include: {
                assesions: {
                    include: {
                        schema: true,
                    },
                },
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
                                                                printAssesion: {
                                                                    include: {
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
        });

        if (result === null) {
            throw new InvariantError('Pelaksanaan Asesmen tidak ditemukan');
        }

        return new AssesmentImpl(result);
    }

    async addAssesmentImpl(sptAssesorId: string): Promise<AssesmentImpl> {
        const id = `assesmentImpl-${this.idGenerator()}`;
        const result = await this.db.assesmentImplementation.findFirst({
            where: { idSptAssesor: sptAssesorId },
        });

        if (result === null) {
            await this.db.assesmentImplementation.create({
                data: {
                    id: id,
                    idSptAssesor: sptAssesorId,
                },
            });
            return await this.getAssesmentImplById(id);
        } else {
            return await this.getAssesmentImplById(result.id);
        }
    }

    async editAssesmentImpl(
        id: string,
        isProcessed: boolean | undefined = undefined
    ): Promise<AssesmentImpl> {
        await this.db.assesmentImplementation.update({
            where: { id },
            data: {
                isProcessed,
            },
        });
        return await this.getAssesmentImplById(id);
    }
}

export default AssesmentImplRepositoryMySql;
