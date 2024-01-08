import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import SendCommandRepository from '../../Domains/send_commands/SendCommanRepository';
import SendCommand from '../../Domains/send_commands/entities/SendCommand';

@injectable()
class SendCommandRepositoryMySql implements SendCommandRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableSendCommand(id: string): Promise<void> {
        const result = await this.db.sendCommand.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Data Perintah Kirim tidak ditemukan');
        }
    }

    async addSendCommand(systemMinersId: string): Promise<SendCommand> {
        const id = `sendCommand-${this.idGenerator()}`;
        const result = await this.db.sendCommand.findFirst({
            where: {
                idSystemMiners: systemMinersId,
            },
        });

        if (result === null) {
            await this.db.sendCommand.create({
                data: {
                    id,
                    idSystemMiners: systemMinersId,
                },
            });
            return await this.getSendCommandById(id);
        } else {
            return await this.getSendCommandById(result.id);
        }
    }

    async getSendCommands(
        isProcessed: boolean | undefined
    ): Promise<SendCommand[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.sendCommand.findMany({
            where,
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
                                                        assesmentSchedule: {
                                                            include: {
                                                                assesion: {
                                                                    include: {
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
        });

        const certManagers = result.map(
            (sendCommand) => new SendCommand(sendCommand)
        );

        return certManagers;
    }

    async getSendCommandById(id: string): Promise<SendCommand> {
        const result = await this.db.sendCommand.findFirst({
            where: { id },
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
                                                        assesmentSchedule: {
                                                            include: {
                                                                assesion: {
                                                                    include: {
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
        });

        if (result === null) {
            throw new InvariantError('Data Perintah Kirim tidak ditemukan');
        }

        return new SendCommand(result);
    }

    async editSendCommand(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<SendCommand> {
        try {
            await this.db.sendCommand.update({
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

        return await this.getSendCommandById(id);
    }

    async deleteSendCommandBySystemMinersId(
        systemMinersId: string
    ): Promise<void> {
        await this.db.sendCommand.deleteMany({
            where: { idSystemMiners: systemMinersId },
        });
    }
}

export default SendCommandRepositoryMySql;
