import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import PrintBlankRepository from '../../Domains/print_blanks/PrintBlankRepository';
import PrintBlank from '../../Domains/print_blanks/entities/PrintBlank';

@injectable()
class PrintBlankRepositoryMySql implements PrintBlankRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailablePrintBlank(id: string): Promise<void> {
        const result = await this.db.printBlank.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Cetak Blanko tidak ditemukan');
        }
    }

    async addPrintBlank(printAssesionId: string): Promise<PrintBlank> {
        const id = `printBlank-${this.idGenerator()}`;
        const result = await this.db.printBlank.findFirst({
            where: { idPrintAssesion: printAssesionId },
        });

        if (result === null) {
            await this.db.printBlank.create({
                data: {
                    id,
                    idPrintAssesion: printAssesionId,
                },
            });
            return await this.getPrintBlankById(id);
        } else {
            return await this.getPrintBlankById(result.id);
        }
    }

    async getPrintBlanks(
        isProcessed: boolean | undefined
    ): Promise<PrintBlank[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.printBlank.findMany({
            where,
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
                                                                sptAssesor: {
                                                                    include: {
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
        });

        const printBlanks = result.map(
            (printBlank) => new PrintBlank(printBlank)
        );

        return printBlanks;
    }

    async getPrintBlankById(id: string): Promise<PrintBlank> {
        const result = await this.db.printBlank.findFirst({
            where: { id },
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
                                                                sptAssesor: {
                                                                    include: {
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
        });

        if (result === null) {
            throw new InvariantError('Cetak Blanko tidak ditemukan');
        }

        return new PrintBlank(result);
    }

    async editPrintBlank(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PrintBlank> {
        await this.db.printBlank.update({
            where: { id },
            data: {
                id,
                date,
                isProcessed,
            },
        });

        return await this.getPrintBlankById(id);
    }

    async deletePrintBlankByPrintAssesionId(
        printAssesionId: string
    ): Promise<void> {
        await this.db.printBlank.deleteMany({
            where: { idPrintAssesion: printAssesionId },
        });
    }
}

export default PrintBlankRepositoryMySql;
