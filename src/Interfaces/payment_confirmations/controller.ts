import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditPaymentConfirmationUseCase from '../../Applications/use_case/payment_confirmations/EditPaymentConfirmationUseCase';
import GetPaymentConfirmationByIdUseCase from '../../Applications/use_case/payment_confirmations/GetPaymenrConfirmationByIdUseCase';
import GetPaymentConfirmationsUseCase from '../../Applications/use_case/payment_confirmations/GetPaymentConfirmationsUseCase';

class PaymentConfirmationsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getPaymentConfirmations(req: Request, res: Response) {
        const getPaymentConfirmationsUseCase = this.container.get(
            GetPaymentConfirmationsUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const paymentConfirmations =
            await getPaymentConfirmationsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { paymentConfirmations },
        });
    }

    @autobind
    async getPaymentConfirmationById(req: Request, res: Response) {
        const getPaymentConfirmationByIdUseCase = this.container.get(
            GetPaymentConfirmationByIdUseCase
        );
        const paymentConfirmation =
            await getPaymentConfirmationByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { paymentConfirmation },
        });
    }

    @autobind
    async putPaymentConfirmation(req: Request, res: Response) {
        try {
            const editPaymentConfirmationUseCase = this.container.get(
                EditPaymentConfirmationUseCase
            );

            const { id } = req.params;
            const { date, isProcessed } = req.body;
            const filename = req.file?.filename;

            const fileLocation =
                filename !== undefined
                    ? `http://${process.env.HOST}:${process.env.PORT}/storages/images/${filename}`
                    : undefined;
            const paymentConfirmation =
                await editPaymentConfirmationUseCase.execute(
                    id,
                    date,
                    fileLocation,
                    isProcessed === 'true' || isProcessed === true
                );

            res.status(200).json({
                status: 'success',
                data: { paymentConfirmation },
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default PaymentConfirmationsController;
