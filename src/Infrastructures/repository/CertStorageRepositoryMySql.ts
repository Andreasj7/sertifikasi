import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import CertStorageRepository from '../../Domains/cert_storages/CertStorageRepository';
import CertStorage from '../../Domains/cert_storages/entities/CertStorage';

@injectable()
class CertStorageRepositoryMySql implements CertStorageRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableCertStorage(id: string): Promise<void> {
        const result = await this.db.certStorage.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError(
                'Data Scanner Sertifikasi tidak ditemukan'
            );
        }
    }

    async addCertStorage(printBlankId: string): Promise<CertStorage> {
        const id = `certStorage-${this.idGenerator()}`;
        const result = await this.db.certStorage.findFirst({
            where: { idPrintBlank: printBlankId },
        });

        if (result === null) {
            await this.db.certStorage.create({
                data: {
                    id,
                    idPrintBlank: printBlankId,
                },
            });
            return await this.getCertStorageById(id);
        } else {
            return await this.getCertStorageById(result.id);
        }
    }

    async getCertStorages(
        isProcessed: boolean | undefined
    ): Promise<CertStorage[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.certStorage.findMany({
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
            (certStorage) => new CertStorage(certStorage)
        );

        return certManagers;
    }

    async getCertStorageById(id: string): Promise<CertStorage> {
        const result = await this.db.certStorage.findFirst({
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

        return new CertStorage(result);
    }

    async editCertStorage(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertStorage> {
        await this.db.certStorage.update({
            where: { id },
            data: {
                id,
                date,
                isProcessed,
            },
        });

        return await this.getCertStorageById(id);
    }

    async deleteCertStorageByPrintBlankId(printBlankId: string): Promise<void> {
        await this.db.certStorage.deleteMany({
            where: { idPrintBlank: printBlankId },
        });
    }
}

export default CertStorageRepositoryMySql;
