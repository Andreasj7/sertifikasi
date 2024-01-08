import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import SystemMinersRepository from '../../Domains/system_miners/SystemMinersRepository';
import SystemMiners from '../../Domains/system_miners/entities/SystemMiners';

@injectable()
class SystemMinersRepositoryMySql implements SystemMinersRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableSystemMiners(id: string): Promise<void> {
        const result = await this.db.systemMiners.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError(
                'Laporan Hasil Uji Sistem Miners tidak ditemukan'
            );
        }
    }

    async addSystemMiners(printBlankId: string): Promise<SystemMiners> {
        const id = `systemMiners-${this.idGenerator()}`;
        const result = await this.db.systemMiners.findFirst({
            where: { idPrintBlank: printBlankId },
        });

        if (result === null) {
            await this.db.systemMiners.create({
                data: {
                    id,
                    idPrintBlank: printBlankId,
                },
            });
            return await this.getSystemMinersById(id);
        } else {
            return await this.getSystemMinersById(result.id);
        }
    }

    async getSystemMinerss(
        isProcessed: boolean | undefined
    ): Promise<SystemMiners[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.systemMiners.findMany({
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
            (systemMiners) => new SystemMiners(systemMiners)
        );

        return certManagers;
    }

    async getSystemMinersById(id: string): Promise<SystemMiners> {
        const result = await this.db.systemMiners.findFirst({
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
                'Laporan Hasil Uji Sistem Miners tidak ditemukan'
            );
        }

        return new SystemMiners(result);
    }

    async editSystemMiners(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<SystemMiners> {
        await this.db.systemMiners.update({
            where: { id },
            data: {
                id,
                date,
                isProcessed,
            },
        });

        return await this.getSystemMinersById(id);
    }

    async deleteSystemMinersByPrintBlankId(
        printBlankId: string
    ): Promise<void> {
        await this.db.systemMiners.deleteMany({
            where: { idPrintBlank: printBlankId },
        });
    }
}

export default SystemMinersRepositoryMySql;
