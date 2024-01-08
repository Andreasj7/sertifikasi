import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import PrintCompensationRepository from '../../Domains/print_compensations/PrintCompensationRepository';
import PrintCompensation from '../../Domains/print_compensations/entities/PrintCompensation';

@injectable()
class PrintCompensationRepositoryMySql implements PrintCompensationRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailablePrintCompensation(id: string): Promise<void> {
        const result = await this.db.printCompensation.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Cetak Kartu Kompensasi tidak ditemukan');
        }
    }

    async addPrintCompensation(
        printBlankId: string
    ): Promise<PrintCompensation> {
        const id = `printCompensation-${this.idGenerator()}`;
        const result = await this.db.printCompensation.findFirst({
            where: { idPrintBlank: printBlankId },
        });

        if (result === null) {
            await this.db.printCompensation.create({
                data: {
                    id,
                    idPrintBlank: printBlankId,
                },
            });
            return await this.getPrintCompensationById(id);
        } else {
            return await this.getPrintCompensationById(result.id);
        }
    }

    async getPrintCompensations(
        isProcessed: boolean | undefined
    ): Promise<PrintCompensation[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.printCompensation.findMany({
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

        const printCompensations = result.map(
            (printCompensation) => new PrintCompensation(printCompensation)
        );

        return printCompensations;
    }

    async getPrintCompensationById(id: string): Promise<PrintCompensation> {
        const result = await this.db.printCompensation.findFirst({
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
            throw new InvariantError('Cetak Kartu Kompensasi tidak ditemukan');
        }

        return new PrintCompensation(result);
    }

    async editPrintCompensation(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PrintCompensation> {
        await this.db.printCompensation.update({
            where: { id },
            data: {
                id,
                date,
                isProcessed,
            },
        });

        return await this.getPrintCompensationById(id);
    }

    async deletePrintCompensationByPrintBlankId(
        printBlankId: string
    ): Promise<void> {
        await this.db.printCompensation.deleteMany({
            where: { idPrintBlank: printBlankId },
        });
    }
}

export default PrintCompensationRepositoryMySql;
