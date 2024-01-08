import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import PaymentConfirmationRepository from '../../Domains/payment_confirmations/PaymentConfirmationsRepository';
import PaymentConfirmation from '../../Domains/payment_confirmations/entities/PaymentConfirmation';

@injectable()
class PaymentConfirmationRepositoryMySql
    implements PaymentConfirmationRepository
{
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailablePaymentConfirmation(id: string): Promise<void> {
        const result = await this.db.paymentConfirmation.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Bukti Pembayaran tidak ditemukan');
        }
    }

    async addPaymentConfirmation(
        certApplicationId: string
    ): Promise<PaymentConfirmation> {
        const id = `paymentConfirmation-${this.idGenerator()}`;
        const result = await this.db.paymentConfirmation.findFirst({
            where: {
                id,
                idCertApplication: certApplicationId,
            },
        });

        if (result === null) {
            await this.db.paymentConfirmation.create({
                data: {
                    id,
                    idCertApplication: certApplicationId,
                },
            });
            return await this.getPaymentConfirmationById(id);
        } else {
            return await this.getPaymentConfirmationById(result.id);
        }
    }

    async getPaymentConfirmations(
        isProcessed: boolean | undefined
    ): Promise<PaymentConfirmation[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.paymentConfirmation.findMany({
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

        const certManagers = result.map(
            (paymentConfirmation) =>
                new PaymentConfirmation(paymentConfirmation)
        );

        return certManagers;
    }

    async getPaymentConfirmationById(id: string): Promise<PaymentConfirmation> {
        const result = await this.db.paymentConfirmation.findFirst({
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
            throw new InvariantError('Bukti Pembayaran tidak ditemukan');
        }

        return new PaymentConfirmation(result);
    }

    async editPaymentConfirmation(
        id: string,
        date: string | undefined,
        fileLocation: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PaymentConfirmation> {
        await this.db.paymentConfirmation.update({
            where: { id },
            data: {
                id,
                date,
                proofUrl: fileLocation,
                isProcessed,
            },
        });

        return await this.getPaymentConfirmationById(id);
    }

    async deletePaymentConfirmationByCertApplicationId(
        certApplicationId: string
    ): Promise<void> {
        await this.db.paymentConfirmation.deleteMany({
            where: { idCertApplication: certApplicationId },
        });
    }
}

export default PaymentConfirmationRepositoryMySql;
