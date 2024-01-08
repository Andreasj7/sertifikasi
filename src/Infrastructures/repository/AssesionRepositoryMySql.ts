import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import { NewAssesmentImplPayload } from '../../Commons/types';
import AssesionRepository from '../../Domains/assesions/AssesionRepository';
import Assesion from '../../Domains/assesions/entities/Assesions';
import AssesmentImpl from '../../Domains/assesment_impl/entities/AssesmentImpl';

@injectable()
class AssesionRepositoryMySql implements AssesionRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async deleteAssesionByAssesmentImplId(
        assesmentImplId: string
    ): Promise<void> {
        await this.db.assesion.deleteMany({
            where: {
                idAssesmentImpl: assesmentImplId,
            },
        });
    }

    async verifyAvailableAssesion(id: string): Promise<void> {
        const result = await this.db.assesion.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Data Assesi tidak ditemukan');
        }
    }

    async addAssesion(
        assesmentImplId: string,
        payload: NewAssesmentImplPayload
    ): Promise<Assesion> {
        const id = `assesion-${this.idGenerator()}`;
        await this.db.assesion.create({
            data: {
                id,
                idAssesmentImpl: assesmentImplId,
                ...payload,
            },
            select: { id: true },
        });
        return await this.getAssesionById(id);
    }

    async getAssesions(
        isProcessed: boolean | undefined = undefined
    ): Promise<Assesion[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = {
                ...where,
                isProcessed,
            };
        }

        const result = await this.db.assesion.findMany({
            where,
            include: {
                schema: true,
                assesmentImpl: {
                    include: {
                        sptAssesor: {
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
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const assesions = result.map((assesionAssesmentImpl) => {
            return new Assesion({
                id: assesionAssesmentImpl?.id ?? '',
                isProcessed: assesionAssesmentImpl?.isProcessed ?? false,
                date: assesionAssesmentImpl.date ?? null,
                lspAdmin: assesionAssesmentImpl?.lspAdmin ?? null,
                assesorLead: assesionAssesmentImpl?.assesorLead ?? null,
                assesorName: assesionAssesmentImpl?.assesorName ?? null,
                assesionNumber: assesionAssesmentImpl?.assesionNumber ?? 0,
                asesorRecommendation:
                    assesionAssesmentImpl?.asesorRecommendation ?? null,
                schema: assesionAssesmentImpl?.schema ?? null,
                assesmentImpl: new AssesmentImpl({
                    id: assesionAssesmentImpl?.assesmentImpl?.id ?? '',
                    isProcessed:
                        assesionAssesmentImpl?.assesmentImpl?.isProcessed ??
                        false,
                    sptAssesor:
                        assesionAssesmentImpl?.assesmentImpl!.sptAssesor,
                }),
            });
        });
        const filteredAssesions = assesions.filter(
            (assesion) => assesion.id !== ''
        );
        return filteredAssesions;
    }

    async getAssesionById(id: string): Promise<Assesion> {
        const result = await this.db.assesion.findFirst({
            where: { id },
            include: {
                schema: true,
                assesmentImpl: {
                    include: {
                        sptAssesor: {
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
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (result === null) {
            throw new InvariantError('Data Assesi tidak ditemukan');
        }

        return new Assesion({
            id: result?.id ?? '',
            isProcessed: result?.isProcessed ?? false,
            date: result.date ?? null,
            lspAdmin: result?.lspAdmin ?? null,
            assesorLead: result?.assesorLead ?? null,
            assesorName: result?.assesorName ?? null,
            assesionNumber: result?.assesionNumber ?? 0,
            asesorRecommendation: result?.asesorRecommendation ?? null,
            schema: result?.schema ?? null,
            assesmentImpl: new AssesmentImpl({
                id: result?.assesmentImpl?.id ?? '',
                isProcessed: result?.assesmentImpl?.isProcessed ?? false,
                sptAssesor: result?.assesmentImpl!.sptAssesor,
            }),
        });
    }

    async editAssesion(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<Assesion> {
        const result = await this.db.assesion.update({
            where: { id },
            select: { id: true },
            data: {
                date,
                isProcessed,
            },
        });
        return await this.getAssesionById(result.id);
    }
}

export default AssesionRepositoryMySql;
