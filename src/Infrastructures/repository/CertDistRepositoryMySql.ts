import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import CertDistRepository from '../../Domains/cert_dists/CertDistRepository';
import CertDist from '../../Domains/cert_dists/entities/CertDist';

@injectable()
class CertDistRepositoryMySql implements CertDistRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableCertDist(id: string): Promise<void> {
        const result = await this.db.certDist.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError(
                'Data Pendistribusian Sertifikat tidak ditemukan'
            );
        }
    }

    async addCertDist(cardDistId: string): Promise<CertDist> {
        const id = `certDist-${this.idGenerator()}`;
        const result = await this.db.certDist.findFirst({
            where: { idCardDist: cardDistId },
        });

        if (result === null) {
            await this.db.certDist.create({
                data: {
                    id,
                    idCardDist: cardDistId,
                },
            });
            return await this.getCertDistById(id);
        } else {
            return await this.getCertDistById(result.id);
        }
    }

    async getCertDists(isProcessed: boolean | undefined): Promise<CertDist[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.certDist.findMany({
            where,
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
                                                                assTestResult: {
                                                                    include: {
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
        });

        const certManagers = result.map((certDist) => new CertDist(certDist));

        return certManagers;
    }

    async getCertDistById(id: string): Promise<CertDist> {
        const result = await this.db.certDist.findFirst({
            where: { id },
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
                                                                assTestResult: {
                                                                    include: {
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
        });

        if (result === null) {
            throw new InvariantError(
                'Data Pendistribusian Sertifikat tidak ditemukan'
            );
        }

        return new CertDist(result);
    }

    async editCertDist(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertDist> {
        try {
            await this.db.certDist.update({
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

        return await this.getCertDistById(id);
    }

    async deleteCertDistByCardDistId(cardDistId: string): Promise<void> {
        await this.db.certDist.deleteMany({
            where: { idCardDist: cardDistId },
        });
    }
}

export default CertDistRepositoryMySql;
