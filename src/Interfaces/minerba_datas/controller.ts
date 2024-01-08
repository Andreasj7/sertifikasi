import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditMinerbaDataUseCase from '../../Applications/use_case/minerba_datas/EditMinerbaDataUseCase';
import GetMinerbaDataByIdUseCase from '../../Applications/use_case/minerba_datas/GetMinerbaDataByIdUseCase';
import GetMinerbaDatasUseCase from '../../Applications/use_case/minerba_datas/GetMinerbaDatasUseCase';

class MinerbaDatasController {
    constructor(private readonly container: Container) {}

    @autobind
    async getMinerbaDatas(req: Request, res: Response) {
        const getMinerbaDatasUseCase = this.container.get(
            GetMinerbaDatasUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const minerbaDatas = await getMinerbaDatasUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { minerbaDatas },
        });
    }

    @autobind
    async getMinerbaDataById(req: Request, res: Response) {
        const getMinerbaDataByIdUseCase = this.container.get(
            GetMinerbaDataByIdUseCase
        );
        const minerbaData = await getMinerbaDataByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { minerbaData },
        });
    }

    @autobind
    async putMinerbaData(req: Request, res: Response) {
        try {
            const editMinerbaDataUseCase = this.container.get(
                EditMinerbaDataUseCase
            );

            const { id } = req.params;
            const { no, date, isProcessed } = req.body;
            const minerbaData = await editMinerbaDataUseCase.execute(
                id,
                no,
                date,
                isProcessed
            );

            res.status(200).json({
                status: 'success',
                data: { minerbaData },
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default MinerbaDatasController;
