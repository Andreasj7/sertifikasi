import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import CertManagerRepository from '../../Domains/cert_managers/CertManagerRepository';
import CertManager from '../../Domains/cert_managers/entities/CertManager';

@injectable()
class CertManagerRepositoryMySql implements CertManagerRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableCertManager(id: string): Promise<void> {
        const result = await this.db.certManager.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError(
                'Data Manager Sertifikasi tidak ditemukan'
            );
        }
    }

    async addCertManager(printBlankId: string): Promise<CertManager> {
        const id = `certManager-${this.idGenerator()}`;
        const result = await this.db.certManager.findFirst({
            where: { idPrintBlank: printBlankId },
        });

        if (result === null) {
            await this.db.certManager.create({
                data: {
                    id,
                    idPrintBlank: printBlankId,
                },
            });
            return await this.getCertManagerById(id);
        } else {
            return await this.getCertManagerById(result.id);
        }
    }

    async getCertManagers(
        isProcessed: boolean | undefined
    ): Promise<CertManager[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.certManager.findMany({
            where,
            include: {
                printBlank: {
                    include: {
                        printAssesion: {
                            include: {
                                assTestResult: {
                                    include: {
                                        baSk: {
                                            include: {
                                                assesmentSchedule: {
                                                    include: {
                                                        assesion: {
                                                            include: {
                                                                schema: true,
                                                                assesmentImpl: {
                                                                    include: {
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
        });

        const certManagers = result.map(
            (certManager) => new CertManager(certManager)
        );

        return certManagers;
    }

    async getCertManagerById(id: string): Promise<CertManager> {
        const result = await this.db.certManager.findFirst({
            where: { id },
            include: {
                printBlank: {
                    include: {
                        printAssesion: {
                            include: {
                                assTestResult: {
                                    include: {
                                        baSk: {
                                            include: {
                                                assesmentSchedule: {
                                                    include: {
                                                        assesion: {
                                                            include: {
                                                                schema: true,
                                                                assesmentImpl: {
                                                                    include: {
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
        });

        if (result === null) {
            throw new InvariantError(
                'Data Manager Sertifikasi tidak ditemukan'
            );
        }

        return new CertManager(result);
    }

    async editCertManager(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertManager> {
        await this.db.certManager.update({
            where: { id },
            data: {
                id,
                date,
                isProcessed,
            },
        });

        return await this.getCertManagerById(id);
    }

    async deleteCertManagerByPrintBlankId(printBlankId: string): Promise<void> {
        await this.db.certManager.deleteMany({
            where: { idPrintBlank: printBlankId },
        });
    }
}

export default CertManagerRepositoryMySql;
