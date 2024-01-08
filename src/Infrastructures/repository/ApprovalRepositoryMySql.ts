import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import ApprovalRepository from '../../Domains/approvals/ApprovalRepository';
import Approval from '../../Domains/approvals/entities/Approval';

@injectable()
class ApprovalRepositoryMySql implements ApprovalRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async getApprovalById(id: string): Promise<Approval> {
        const result = await this.db.approval.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Approval tidak ditemukan');
        }

        return new Approval(result);
    }

    async verifyAvailableApproval(id: string): Promise<void> {
        const result = await this.db.approval.findFirst({
            where: { id },
        });
        if (result === null) {
            throw new InvariantError('Approval tidak ditemukan');
        }
    }

    async addApproval(isApproved: boolean): Promise<Approval> {
        const id = `approval-${this.idGenerator()}`;
        await this.db.approval.create({
            data: {
                id,
                isApproved: isApproved,
            },
        });
        return this.getApprovalById(id);
    }

    async editApproval(id: string, isApproved: boolean): Promise<Approval> {
        await this.db.approval.update({
            where: { id },
            data: {
                date: new Date().toISOString(),
                isApproved: isApproved,
            },
        });
        return this.getApprovalById(id);
    }

    async deleteApproval(id: string): Promise<void> {
        await this.db.approval.delete({
            where: { id },
        });
    }
}

export default ApprovalRepositoryMySql;
