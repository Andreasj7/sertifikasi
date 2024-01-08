import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import CertStampRepository from '../../Domains/cert_stamps/CertStampRepository';
import CertStamp from '../../Domains/cert_stamps/entities/CertStamp';

@injectable()
class CertStampRepositoryMySql implements CertStampRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableCertStamp(id: string): Promise<void> {
        const result = await this.db.certStamp.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Data Stempel Sertifikat tidak ditemukan');
        }
    }

    async addCertStamp(printBlankId: string): Promise<CertStamp> {
        const id = `certStamp-${this.idGenerator()}`;
        const result = await this.db.certStamp.findFirst({
            where: { idPrintBlank: printBlankId },
        });

        if (result === null) {
            await this.db.certStamp.create({
                data: {
                    id,
                    idPrintBlank: printBlankId,
                },
            });
            return await this.getCertStampById(id);
        } else {
            return await this.getCertStampById(result.id);
        }
    }

    async getCertStamps(
        isProcessed: boolean | undefined
    ): Promise<CertStamp[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.certStamp.findMany({
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

        const certStamps = result.map((certStamp) => new CertStamp(certStamp));

        return certStamps;
    }

    async getCertStampById(id: string): Promise<CertStamp> {
        const result = await this.db.certStamp.findFirst({
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
            throw new InvariantError('Data Stempel Sertifikat tidak ditemukan');
        }

        return new CertStamp(result);
    }

    async editCertStamp(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertStamp> {
        await this.db.certStamp.update({
            where: { id },
            data: {
                id,
                date,
                isProcessed,
            },
        });

        return await this.getCertStampById(id);
    }

    async deleteCertStampByPrintBlankId(printBlankId: string): Promise<void> {
        await this.db.certStamp.deleteMany({
            where: { idPrintBlank: printBlankId },
        });
    }
}

export default CertStampRepositoryMySql;
