import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import GetSystemMinerssUseCase from '../../Applications/use_case/system_miners/GetSystemMinerssUseCase';
import GetSystemMinersByIdUseCase from '../../Applications/use_case/system_miners/GetSystemMinersByIdUseCase';
import EditSystemMinersUseCase from '../../Applications/use_case/system_miners/EditSystemMinersUseCase';

class SystemMinerssController {
    constructor(private readonly container: Container) {}

    @autobind
    async getSystemMinerss(req: Request, res: Response) {
        const getSystemMinerssUseCase = this.container.get(
            GetSystemMinerssUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const systemMinerss = await getSystemMinerssUseCase.execute(
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            data: { systemMinerss },
        });
    }

    @autobind
    async getSystemMinersById(req: Request, res: Response) {
        const getSystemMinersByIdUseCase = this.container.get(
            GetSystemMinersByIdUseCase
        );
        const systemMiners = await getSystemMinersByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { systemMiners },
        });
    }

    @autobind
    async putSystemMiners(req: Request, res: Response) {
        const editSystemMinersUseCase = this.container.get(
            EditSystemMinersUseCase
        );

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const systemMiners = await editSystemMinersUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { systemMiners },
        });
    }
}

export default SystemMinerssController;
