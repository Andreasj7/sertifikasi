import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditSptAssesorUseCase from '../../Applications/use_case/spt_assesors/EditSptAssesorUseCase';
import GetSptAssesorByIdUseCase from '../../Applications/use_case/spt_assesors/GetSptAssesorByIdUseCase';
import GetSptAssesorsUseCase from '../../Applications/use_case/spt_assesors/GetSptAssesorsUseCase';

class SptAssesorsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getSptAssesors(req: Request, res: Response) {
        const getSptAssesors = this.container.get(GetSptAssesorsUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const sptAssesors = await getSptAssesors.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { sptAssesors },
        });
    }

    @autobind
    async getSptAssesorById(req: Request, res: Response) {
        const getSptAssesorById = this.container.get(GetSptAssesorByIdUseCase);
        const sptAssesor = await getSptAssesorById.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { sptAssesor },
        });
    }

    @autobind
    async putSptAssesor(req: Request, res: Response) {
        const editSptAssesorUseCase = this.container.get(EditSptAssesorUseCase);

        const { id } = req.params;
        const { noSptAssesor, assesorDate, isProcessed } = req.body;
        const sptAssesor = await editSptAssesorUseCase.execute(
            id,
            noSptAssesor,
            assesorDate,
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            message: 'Spt Assesor berhasil diubah',
            data: { sptAssesor },
        });
    }
}

export default SptAssesorsController;
