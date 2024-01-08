import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import DirecturSignRepository from '../../Domains/directur_signs/DirecturSignRepository';
import DirecturSign from '../../Domains/directur_signs/entities/DirecturSign';

@injectable()
class DirecturSignRepositoryMySql implements DirecturSignRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableDirecturSign(id: string): Promise<void> {
        const result = await this.db.directurSign.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError(
                'Data Tanda Tangan Direktur tidak ditemukan'
            );
        }
    }

    async addDirecturSign(printBlankId: string): Promise<DirecturSign> {
        const id = `directurSign-${this.idGenerator()}`;
        const result = await this.db.directurSign.findFirst({
            where: { idPrintBlank: printBlankId },
        });

        if (result === null) {
            await this.db.directurSign.create({
                data: {
                    id,
                    idPrintBlank: printBlankId,
                },
            });
            return await this.getDirecturSignById(id);
        } else {
            return await this.getDirecturSignById(result.id);
        }
    }

    async getDirecturSigns(
        isProcessed: boolean | undefined
    ): Promise<DirecturSign[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.directurSign.findMany({
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

        const directurSigns = result.map(
            (directurSign) => new DirecturSign(directurSign)
        );

        return directurSigns;
    }

    async getDirecturSignById(id: string): Promise<DirecturSign> {
        const result = await this.db.directurSign.findFirst({
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
                'Data Tanda Tangan Direktur tidak ditemukan'
            );
        }

        return new DirecturSign(result);
    }

    async editDirecturSign(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<DirecturSign> {
        await this.db.directurSign.update({
            where: { id },
            data: {
                id,
                date,
                isProcessed,
            },
        });

        return await this.getDirecturSignById(id);
    }

    async deleteDirecturSignByPrintBlankId(
        printBlankId: string
    ): Promise<void> {
        await this.db.directurSign.deleteMany({
            where: { idPrintBlank: printBlankId },
        });
    }
}

export default DirecturSignRepositoryMySql;
