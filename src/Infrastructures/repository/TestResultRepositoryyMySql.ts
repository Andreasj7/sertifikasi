import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import TestResultRepository from '../../Domains/test_results/TestResultRepository';
import TestResult from '../../Domains/test_results/entities/TestResult';

@injectable()
class TestResultRepositoryMySql implements TestResultRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyAvailableTestResult(id: string): Promise<void> {
        const result = await this.db.assTestResult.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Hasil Uji tidak ditemukan');
        }
    }

    async addTestResult(baSkId: string): Promise<TestResult> {
        const id = `tr-${this.idGenerator()}`;
        const result = await this.db.assTestResult.findFirst({
            where: { idBaSk: baSkId },
        });

        if (result === null) {
            await this.db.assTestResult.create({
                data: {
                    id,
                    idBaSk: baSkId,
                },
            });
            return await this.getTestResultById(id);
        } else {
            return await this.getTestResultById(result.id);
        }
    }

    async getTestResults(
        isProcessed: boolean | undefined
    ): Promise<TestResult[]> {
        let where = {};

        if (isProcessed !== undefined) {
            where = { ...where, isProcessed };
        }

        const result = await this.db.assTestResult.findMany({
            where,
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
                                                        certApplication: {
                                                            include: {
                                                                certPurpose:
                                                                    true,
                                                                approval: true,
                                                                blankApplication:
                                                                    true,
                                                                certHolder:
                                                                    true,
                                                                invoiceDist:
                                                                    true,
                                                                paymentConfirmation:
                                                                    true,
                                                                minerbaData: {
                                                                    include: {
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
        });

        const testResults = result.map((tr) => new TestResult(tr));
        return testResults;
    }

    async getTestResultById(id: string): Promise<TestResult> {
        const result = await this.db.assTestResult.findFirst({
            where: { id },
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
                                                        certApplication: {
                                                            include: {
                                                                certPurpose:
                                                                    true,
                                                                approval: true,
                                                                blankApplication:
                                                                    true,
                                                                certHolder:
                                                                    true,
                                                                invoiceDist:
                                                                    true,
                                                                paymentConfirmation:
                                                                    true,
                                                                minerbaData: {
                                                                    include: {
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
        });

        if (result === null) {
            throw new InvariantError('Hasil Uji tidak ditemukan');
        }

        return new TestResult(result);
    }

    async editTestResult(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<TestResult> {
        await this.db.assTestResult.update({
            where: { id },
            data: {
                date,
                isProcessed,
            },
        });
        return await this.getTestResultById(id);
    }

    async deleteTestResultByBaSkId(baSkId: string): Promise<void> {
        await this.db.assTestResult.deleteMany({
            where: { idBaSk: baSkId },
        });
    }
}

export default TestResultRepositoryMySql;
