import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import CertScannerRepository from '../../Domains/cert_scanners/CertScannerRepository';
import CertScanner from '../../Domains/cert_scanners/entities/CertScanner';

@injectable()
class CertScannerRepositoryMySql implements CertScannerRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableCertScanner(id: string): Promise<void> {
        const result = await this.db.certScanner.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError(
                'Data Scanner Sertifikasi tidak ditemukan'
            );
        }
    }

    async addCertScanner(printBlankId: string): Promise<CertScanner> {
        const id = `certScanner-${this.idGenerator()}`;
        const result = await this.db.certScanner.findFirst({
            where: { idPrintBlank: printBlankId },
        });

        if (result === null) {
            await this.db.certScanner.create({
                data: {
                    id,
                    idPrintBlank: printBlankId,
                },
            });
            return await this.getCertScannerById(id);
        } else {
            return await this.getCertScannerById(result.id);
        }
    }

    async getCertScanners(
        isProcessed: boolean | undefined
    ): Promise<CertScanner[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.certScanner.findMany({
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
            (certScanner) => new CertScanner(certScanner)
        );

        return certManagers;
    }

    async getCertScannerById(id: string): Promise<CertScanner> {
        const result = await this.db.certScanner.findFirst({
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
                'Data Scanner Sertifikasi tidak ditemukan'
            );
        }

        return new CertScanner(result);
    }

    async editCertScanner(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertScanner> {
        await this.db.certScanner.update({
            where: { id },
            data: {
                id,
                date,
                isProcessed,
            },
        });

        return await this.getCertScannerById(id);
    }

    async deleteCertScannerByPrintBlankId(printBlankId: string): Promise<void> {
        await this.db.certScanner.deleteMany({
            where: { idPrintBlank: printBlankId },
        });
    }
}

export default CertScannerRepositoryMySql;
