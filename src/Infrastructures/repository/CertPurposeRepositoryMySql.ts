import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import CertPurposeRepository from '../../Domains/cert_purposes/CertPurposeRepository';
import CertPurpose from '../../Domains/cert_purposes/entities/CertPuspose';

@injectable()
class CertPurposeRepositoryMySql implements CertPurposeRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifyCertPurposeExists(purpose: string): Promise<void> {
        const result = await this.db.certPurpose.findFirst({
            where: { purpose },
        });

        if (result !== null) {
            throw new InvariantError('Tujuan Sertifikasi sudah ada');
        }
    }

    async verifyAvailableCertPurpose(id: string): Promise<void> {
        const result = await this.db.certPurpose.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Tujuan Sertifikasi tidak ditemukan');
        }
    }

    async addCertPurpose(purpose: string): Promise<CertPurpose> {
        const id = `purpose-${this.idGenerator()}`;
        await this.db.certPurpose.create({
            data: {
                id,
                purpose,
            },
        });
        return await this.getCertPurposeById(id);
    }

    async getCertPurposes(): Promise<CertPurpose[]> {
        const result = await this.db.certPurpose.findMany();
        const purposes = result.map((purpose) => new CertPurpose(purpose));
        return purposes;
    }

    async getCertPurposeById(id: string): Promise<CertPurpose> {
        const result = await this.db.certPurpose.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Tujuan Sertifikasi tidak ditemukan');
        }

        return new CertPurpose(result);
    }

    async editCertPurpose(
        id: string,
        purpose: string | undefined
    ): Promise<CertPurpose> {
        await this.db.certPurpose.update({
            where: { id },
            data: { purpose },
        });
        return this.getCertPurposeById(id);
    }

    async deleteCertPurpose(id: string): Promise<void> {
        await this.db.certPurpose.delete({
            where: { id },
        });
    }
}

export default CertPurposeRepositoryMySql;
