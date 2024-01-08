import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import SptAssesorRepository from '../../Domains/spt_assesors/SptAssesorRepository';
import SptAssesor from '../../Domains/spt_assesors/enitties/SptAssesor';

@injectable()
class SptAssesorRepositoryMySql implements SptAssesorRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifySptAssesorAvailable(id: string): Promise<void> {
        const result = await this.db.sptAssesor.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Spt Assesor tidak ditemukan');
        }
    }

    async getSptAssesors(
        isProcessed: boolean | undefined = undefined
    ): Promise<SptAssesor[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.sptAssesor.findMany({
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
                                                                printBlank: {
                                                                    include: {
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
        });
        const sptAssesors = result.map((assesor) => new SptAssesor(assesor));
        return sptAssesors;
    }

    async getSptAssesorById(id: string): Promise<SptAssesor> {
        const result = await this.db.sptAssesor.findFirst({
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
                                                                printBlank: {
                                                                    include: {
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
        });

        if (result === null) {
            throw new InvariantError('Spt Assesor tidak ditemukan');
        }

        return new SptAssesor(result);
    }

    async addSptAssesor(certApplicationId: string): Promise<SptAssesor> {
        const id = `sptAssesor-${this.idGenerator()}`;
        const result = await this.db.sptAssesor.findFirst({
            where: { idCertApplication: certApplicationId },
        });

        if (result === null) {
            await this.db.sptAssesor.create({
                data: {
                    id,
                    idCertApplication: certApplicationId,
                    isProcessed: false,
                },
            });
            return await this.getSptAssesorById(id);
        } else {
            return await this.getSptAssesorById(result.id);
        }
    }

    async editSptAssesor(
        id: string,
        noSptAssesor: string | undefined,
        assesorDate: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<SptAssesor> {
        await this.db.sptAssesor.update({
            where: { id },
            data: {
                noSptAssesor,
                assesorDate,
                isProcessed,
            },
        });
        return await this.getSptAssesorById(id);
    }

    async deleteSptAssesorByCertApplicatonId(
        certApplicatonId: string
    ): Promise<void> {
        await this.db.sptAssesor.delete({
            where: { idCertApplication: certApplicatonId },
        });
    }
}

export default SptAssesorRepositoryMySql;
