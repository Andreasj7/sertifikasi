import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import CertHolderRepository from '../../Domains/cert_holders/CertHolderRepository';
import CertHolder from '../../Domains/cert_holders/entities/CertHolder';

@injectable()
class CertHolderRepositoryMySql implements CertHolderRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableCertHolder(id: string): Promise<void> {
        const result = await this.db.certHolder.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Data Pemegang Sertifikat tidak ada');
        }
    }

    async addCertHolder(certApplicationId: string): Promise<CertHolder> {
        const id = `certHolder-${this.idGenerator()}`;
        const result = await this.db.certHolder.findFirst({
            where: { idCertApplication: certApplicationId },
        });

        if (result === null) {
            await this.db.certHolder.create({
                data: {
                    id,
                    idCertApplication: certApplicationId,
                },
            });
            return await this.getCertHolderById(id);
        } else {
            return await this.getCertHolderById(result.id);
        }
    }

    async getCertHolders(
        isProcessed: boolean | undefined
    ): Promise<CertHolder[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.certHolder.findMany({
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

        const certHolders = result.map((holder) => new CertHolder(holder));
        return certHolders;
    }

    async getCertHolderById(id: string): Promise<CertHolder> {
        const result = await this.db.certHolder.findFirst({
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
            throw new InvariantError('Data Pemegang Sertifikat tidak ada');
        }

        return new CertHolder(result);
    }

    async editCertHolder(
        id: string,
        certHolder: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertHolder> {
        await this.db.certHolder.update({
            where: { id },
            data: {
                certHolder,
                isProcessed,
            },
        });
        return await this.getCertHolderById(id);
    }

    async deleteCertHolderBycertApplicationId(
        certApplicationId: string
    ): Promise<void> {
        await this.db.certHolder.deleteMany({
            where: { idCertApplication: certApplicationId },
        });
    }
}

export default CertHolderRepositoryMySql;
