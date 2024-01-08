import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import { NewCertApplicationPayload } from '../../Commons/types';
import CertApplicationRepository from '../../Domains/cert_applications/CertApplicationRepository';
import CertApplication from '../../Domains/cert_applications/entities/CertApplication';

@injectable()
class CertApplicationRepositoryMySql implements CertApplicationRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableCertApplication(id: string): Promise<void> {
        const result = await this.db.certApplication.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Permohonan Sertifikasi tidak ditemukan');
        }
    }

    async getCertApplications(
        isApproved: boolean | undefined = undefined,
        isProcessed: boolean | undefined = undefined,
        isThreeMonth: boolean | undefined = undefined
    ): Promise<CertApplication[]> {
        const currentDate = new Date();

        const threeMonthsAgo = new Date(currentDate);
        threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

        const where = {
            approval: isApproved !== undefined ? { isApproved } : undefined,
            isProcessed: isProcessed !== undefined ? isProcessed : undefined,
            receiptDate:
                isThreeMonth !== undefined && isThreeMonth !== false
                    ? {
                          gte: threeMonthsAgo.toISOString().split('T')[0],
                      }
                    : undefined,
        };

        const result = await this.db.certApplication.findMany({
            where,
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

        return result.map(
            (certApplication) => new CertApplication(certApplication)
        );
    }

    async getCertApplicationById(id: string): Promise<CertApplication> {
        const result = await this.db.certApplication.findFirst({
            where: { id },
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
            throw new InvariantError('Permohonan Sertifikasi tidak ditemukan');
        }

        return new CertApplication(result);
    }

    async addCertApplication(
        payload: NewCertApplicationPayload
    ): Promise<CertApplication> {
        const id = `certApplication-${this.idGenerator()}`;
        await this.db.certApplication.create({
            data: {
                id,
                ...payload,
                isProcessed: false,
            },
        });
        return await this.getCertApplicationById(id);
    }

    async approveCertApplication(
        id: string,
        isApproved: boolean
    ): Promise<CertApplication> {
        await this.db.certApplication.update({
            where: { id },
            data: {
                approval: {
                    update: {
                        date: isApproved ? new Date().toISOString() : null,
                        isApproved,
                    },
                },
            },
        });
        return await this.getCertApplicationById(id);
    }

    async editCertApplicationProcessed(
        id: string,
        isProcessed: boolean | undefined
    ): Promise<CertApplication> {
        await this.db.certApplication.update({
            where: { id },
            data: {
                isProcessed,
            },
        });
        return await this.getCertApplicationById(id);
    }
}

export default CertApplicationRepositoryMySql;
