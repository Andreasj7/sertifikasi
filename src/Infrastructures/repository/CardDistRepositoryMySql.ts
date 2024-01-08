import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import CardDistRepository from '../../Domains/card_dists/CardDistRepository';
import CardDist from '../../Domains/card_dists/entities/CardDist';

@injectable()
class CardDistRepositoryMySql implements CardDistRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableCardDist(id: string): Promise<void> {
        const result = await this.db.cardDist.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError(
                'Data Pendistribusian Kartu tidak ditemukan'
            );
        }
    }

    async addCardDist(packingId: string): Promise<CardDist> {
        const id = `cardDist-${this.idGenerator()}`;
        const result = await this.db.cardDist.findFirst({
            where: { idPacking: packingId },
        });

        if (result === null) {
            await this.db.cardDist.create({
                data: {
                    id,
                    idPacking: packingId,
                },
            });
            return await this.getCardDistById(id);
        } else {
            return await this.getCardDistById(result.id);
        }
    }

    async getCardDists(isProcessed: boolean | undefined): Promise<CardDist[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.cardDist.findMany({
            where,
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
                                                        assTestResult: {
                                                            include: {
                                                                baSk: {
                                                                    include: {
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
        });

        const certManagers = result.map((cardDist) => new CardDist(cardDist));

        return certManagers;
    }

    async getCardDistById(id: string): Promise<CardDist> {
        const result = await this.db.cardDist.findFirst({
            where: { id },
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
                                                        assTestResult: {
                                                            include: {
                                                                baSk: {
                                                                    include: {
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
        });

        if (result === null) {
            throw new InvariantError(
                'Data Pendistribusian Kartu tidak ditemukan'
            );
        }

        return new CardDist(result);
    }

    async editCardDist(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CardDist> {
        try {
            await this.db.cardDist.update({
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

        return await this.getCardDistById(id);
    }

    async deleteCardDistByPackingId(packingId: string): Promise<void> {
        await this.db.cardDist.deleteMany({
            where: { idPacking: packingId },
        });
    }
}

export default CardDistRepositoryMySql;
