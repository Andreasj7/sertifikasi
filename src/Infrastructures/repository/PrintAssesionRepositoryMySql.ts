import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import PrintAssesionRepository from '../../Domains/print_assesions/PrintAssesionRepository';
import PrintAssesion from '../../Domains/print_assesions/entities/PrintAssesion';

@injectable()
class PrintAssesionRepositoryMySql implements PrintAssesionRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailablePrintAssesion(id: string): Promise<void> {
        const result = await this.db.printAssesion.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Cetak Foto Assesi tidak ditemukan');
        }
    }

    async addPrintAssesion(testResultId: string): Promise<PrintAssesion> {
        const id = `printAssesion-${this.idGenerator()}`;
        const result = await this.db.printAssesion.findFirst({
            where: { idAssTestResult: testResultId },
        });

        if (result === null) {
            await this.db.printAssesion.create({
                data: {
                    id,
                    idAssTestResult: testResultId,
                },
            });
            return await this.getPrintAssesionById(id);
        } else {
            return await this.getPrintAssesionById(result.id);
        }
    }

    async getPrintAssesions(
        isProcessed: boolean | undefined
    ): Promise<PrintAssesion[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.printAssesion.findMany({
            where,
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
        });

        const printAssesions = result.map(
            (printAssesion) => new PrintAssesion(printAssesion)
        );

        return printAssesions;
    }

    async getPrintAssesionById(id: string): Promise<PrintAssesion> {
        const result = await this.db.printAssesion.findFirst({
            where: { id },
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
        });

        if (result === null) {
            throw new InvariantError('Cetak Foto Asesi tidak ditemukan');
        }

        return new PrintAssesion(result);
    }

    async editPrintAssesion(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PrintAssesion> {
        await this.db.printAssesion.update({
            where: { id },
            data: {
                id,
                date,
                isProcessed,
            },
        });

        return await this.getPrintAssesionById(id);
    }

    async deletePrintAssesionByTestResultId(
        testResultId: string
    ): Promise<void> {
        await this.db.printAssesion.deleteMany({
            where: { idAssTestResult: testResultId },
        });
    }
}

export default PrintAssesionRepositoryMySql;
