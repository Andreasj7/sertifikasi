import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import ReceiptRepository from '../../Domains/receipts/ReceiptRepository';
import Receipt from '../../Domains/receipts/entities/Receipt';

@injectable()
class ReceiptRepositoryMySql implements ReceiptRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableReceipt(id: string): Promise<void> {
        const result = await this.db.receipt.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Data Resi Pengiriman tidak ditemukan');
        }
    }

    async addReceipt(certDistId: string): Promise<Receipt> {
        const id = `receipt-${this.idGenerator()}`;
        const result = await this.db.receipt.findFirst({
            where: { idCertDist: certDistId },
        });

        if (result === null) {
            await this.db.receipt.create({
                data: {
                    id,
                    idCertDist: certDistId,
                },
            });
            return await this.getReceiptById(id);
        } else {
            return await this.getReceiptById(result.id);
        }
    }

    async getReceipts(isProcessed: boolean | undefined): Promise<Receipt[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.receipt.findMany({
            where,
            include: {
                certDist: {
                    include: {
                        cardDist: {
                            include: {
                                packing: {
                                    include: {
                                        sendCommand: {
                                            include: {
                                                systemMiners: {
                                                    include: {
                                                        printBlank: {
                                                            include: {
                                                                printAssesion: {
                                                                    include: {
                                                                        assTestResult:
                                                                            {
                                                                                include:
                                                                                    {
                                                                                        baSk: {
                                                                                            include:
                                                                                                {
                                                                                                    assesmentSchedule:
                                                                                                        {
                                                                                                            include:
                                                                                                                {
                                                                                                                    assesion:
                                                                                                                        {
                                                                                                                            include:
                                                                                                                                {
                                                                                                                                    schema: true,
                                                                                                                                    assesmentImpl:
                                                                                                                                        {
                                                                                                                                            include:
                                                                                                                                                {
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

        const certManagers = result.map((receipt) => new Receipt(receipt));

        return certManagers;
    }

    async getReceiptById(id: string): Promise<Receipt> {
        const result = await this.db.receipt.findFirst({
            where: { id },
            include: {
                certDist: {
                    include: {
                        cardDist: {
                            include: {
                                packing: {
                                    include: {
                                        sendCommand: {
                                            include: {
                                                systemMiners: {
                                                    include: {
                                                        printBlank: {
                                                            include: {
                                                                printAssesion: {
                                                                    include: {
                                                                        assTestResult:
                                                                            {
                                                                                include:
                                                                                    {
                                                                                        baSk: {
                                                                                            include:
                                                                                                {
                                                                                                    assesmentSchedule:
                                                                                                        {
                                                                                                            include:
                                                                                                                {
                                                                                                                    assesion:
                                                                                                                        {
                                                                                                                            include:
                                                                                                                                {
                                                                                                                                    schema: true,
                                                                                                                                    assesmentImpl:
                                                                                                                                        {
                                                                                                                                            include:
                                                                                                                                                {
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
            throw new InvariantError('Data Resi Pengiriman tidak ditemukan');
        }

        return new Receipt(result);
    }

    async editReceipt(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<Receipt> {
        try {
            await this.db.receipt.update({
                where: { id },
                data: {
                    id,
                    date,
                    isProcessed,
                },
            });
        } catch (error) {
            console.log(error);
        }

        return await this.getReceiptById(id);
    }

    async deleteReceiptByCertDistId(certDistId: string): Promise<void> {
        await this.db.receipt.deleteMany({
            where: { idCertDist: certDistId },
        });
    }
}

export default ReceiptRepositoryMySql;
