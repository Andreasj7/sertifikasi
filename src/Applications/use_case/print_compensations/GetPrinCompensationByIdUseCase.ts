import { inject, injectable } from 'inversify';
import PrintCompensationRepository from '../../../Domains/print_compensations/PrintCompensationRepository';
import PrintCompensation from '../../../Domains/print_compensations/entities/PrintCompensation';
import PrintCompensationRepositoryMySql from '../../../Infrastructures/repository/PrintCompensationRepositoryMySql';

@injectable()
class GetPrintCompensationByIdUseCase {
    constructor(
        @inject(PrintCompensationRepositoryMySql)
        private readonly printCompensationRepository: PrintCompensationRepository
    ) {}

    async execute(id: string): Promise<PrintCompensation> {
        return await this.printCompensationRepository.getPrintCompensationById(
            id
        );
    }
}

export default GetPrintCompensationByIdUseCase;
