import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import TukConfirmationRepository from '../../Domains/tuk_confirmations/TukConfirmationRepository';
import TukConfirmation from '../../Domains/tuk_confirmations/entities/TukConfirmation';

@injectable()
class TukConfirmationRepositoryMySql implements TukConfirmationRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableTukConfirmation(id: string): Promise<void> {
        const result = await this.db.tukConfirmation.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError(
                'Data Konfirmasi Penerima ke TUK tidak ditemukan'
            );
        }
    }

    async addTukConfirmation(receiptId: string): Promise<TukConfirmation> {
        const id = `tukConfirmation-${this.idGenerator()}`;
        const result = await this.db.tukConfirmation.findFirst({
            where: { idReceipt: receiptId },
        });

        if (result === null) {
            await this.db.tukConfirmation.create({
                data: {
                    id,
                    idReceipt: receiptId,
                },
            });
            return await this.getTukConfirmationById(id);
        } else {
            return await this.getTukConfirmationById(result.id);
        }
    }

    async getTukConfirmations(
        isProcessed: boolean | undefined
    ): Promise<TukConfirmation[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.tukConfirmation.findMany({
            where,
            include: {
                receipt: {
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
                                                                        printAssesion:
                                                                            {
                                                                                include:
                                                                                    {
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
                },
            },
        });

        const certManagers = result.map(
            (tukConfirmation) => new TukConfirmation(tukConfirmation)
        );

        return certManagers;
    }

    async getTukConfirmationById(id: string): Promise<TukConfirmation> {
        const result = await this.db.tukConfirmation.findFirst({
            where: { id },
            include: {
                receipt: {
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
                                                                        printAssesion:
                                                                            {
                                                                                include:
                                                                                    {
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
                },
            },
        });

        if (result === null) {
            throw new InvariantError(
                'Data Konfirmasi Penerima ke TUK tidak ditemukan'
            );
        }

        return new TukConfirmation(result);
    }

    async editTukConfirmation(
        id: string,
        date: string | undefined,
        description: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<TukConfirmation> {
        try {
            await this.db.tukConfirmation.update({
                where: { id },
                data: {
                    date,
                    description,
                    isProcessed,
                },
            });
        } catch (error) {
            console.log(error);
        }

        return await this.getTukConfirmationById(id);
    }

    async deleteTukConfirmationByReceiptId(receiptId: string): Promise<void> {
        await this.db.tukConfirmation.deleteMany({
            where: { idReceipt: receiptId },
        });
    }
}

export default TukConfirmationRepositoryMySql;
