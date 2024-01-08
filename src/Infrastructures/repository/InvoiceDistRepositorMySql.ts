import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import InvoiceDistRepository from '../../Domains/invoice_dists/InvoceDistRepository';
import InvoiceDist from '../../Domains/invoice_dists/entities/InvoiceDist';

@injectable()
class InvoiceDistRepositoryMySql implements InvoiceDistRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableInvoiceDist(id: string): Promise<void> {
        const result = await this.db.invoiceDist.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Pendistribusian Invoice tidak ditemukan');
        }
    }

    async addInvoiceDist(certApplicationId: string): Promise<InvoiceDist> {
        const id = `invoiceDist-${this.idGenerator()}`;
        const result = await this.db.invoiceDist.findFirst({
            where: { idCertApplication: certApplicationId },
        });

        if (result === null) {
            await this.db.invoiceDist.create({
                data: {
                    id,
                    idCertApplication: certApplicationId,
                },
            });
            return await this.getInvoiceDistById(id);
        } else {
            return await this.getInvoiceDistById(result.id);
        }
    }

    async getInvoiceDists(
        isProcessed: boolean | undefined
    ): Promise<InvoiceDist[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.invoiceDist.findMany({
            where,
            include: {
                certApplication: {
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
                                                                        printAssesion:
                                                                            {
                                                                                include:
                                                                                    {
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
                },
            },
        });

        const invoiceDists = result.map(
            (invoiceDist) => new InvoiceDist(invoiceDist)
        );
        return invoiceDists;
    }

    async getInvoiceDistById(id: string): Promise<InvoiceDist> {
        const result = await this.db.invoiceDist.findFirst({
            where: { id },
            include: {
                certApplication: {
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
                                                                        printAssesion:
                                                                            {
                                                                                include:
                                                                                    {
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
                },
            },
        });

        if (result === null) {
            throw new InvariantError('Pendistribusian Invoice tidak ditemukan');
        }

        return new InvoiceDist(result);
    }

    async editInvoiceDist(
        id: string,
        invoiceDate: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<InvoiceDist> {
        await this.db.invoiceDist.update({
            where: { id },
            data: {
                invoiceDate,
                isProcessed,
            },
        });
        return this.getInvoiceDistById(id);
    }

    async deleteInvoiceDistByCertApplicationId(
        certApplicationId: string
    ): Promise<void> {
        await this.db.invoiceDist.deleteMany({
            where: { idCertApplication: certApplicationId },
        });
    }
}

export default InvoiceDistRepositoryMySql;
