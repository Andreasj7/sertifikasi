import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditTestResultUseCase from '../../Applications/use_case/test_results/EditTestResultUseCase';
import GetTestResultByIdUseCase from '../../Applications/use_case/test_results/GetTestResultByIdUseCase';
import GetTestResultsUseCase from '../../Applications/use_case/test_results/GetTestResultsUseCase';

class TestResultsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getTestResults(req: Request, res: Response) {
        const getTestResultsUseCase = this.container.get(GetTestResultsUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const testResults = await getTestResultsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { testResults },
        });
    }

    @autobind
    async getTestResultById(req: Request, res: Response) {
        const getTestResultByIdUseCase = this.container.get(
            GetTestResultByIdUseCase
        );
        const testResult = await getTestResultByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { testResult },
        });
    }

    @autobind
    async putTestResult(req: Request, res: Response) {
        const editTestResultUseCase = this.container.get(EditTestResultUseCase);

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const testResult = await editTestResultUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { testResult },
        });
    }
}

export default TestResultsController;
