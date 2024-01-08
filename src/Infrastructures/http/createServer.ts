import express, { Express } from 'express';
import { Container } from 'inversify';
import path from 'path';
import authenticateJwt from '../../Commons/middlewares/authenticateJwt';
import errorHandler from '../../Commons/middlewares/errorHandler';
import AdminsRouter from '../../Interfaces/admins/router';
import AssesionsRouter from '../../Interfaces/assesions/router';
import AssesmentImplsRouter from '../../Interfaces/assesment_impls/routes';
import AssesmentSchedulesRouter from '../../Interfaces/assesment_schedules/router';
import AuthenticationsRouter from '../../Interfaces/authentications/router';
import BaSksRouter from '../../Interfaces/ba_sk/router';
import BlankApplicationsRouter from '../../Interfaces/blank_applications/router';
import CardDistsRouter from '../../Interfaces/card_dists/router';
import CertApplicationsRouter from '../../Interfaces/cert_applications/routes';
import CertDistsRouter from '../../Interfaces/cert_dists/router';
import CertHoldersRouter from '../../Interfaces/cert_holders/router';
import CertManagersRouter from '../../Interfaces/cert_managers/router';
import CertPurposesRouter from '../../Interfaces/cert_purposes/routes';
import CertScannersRouter from '../../Interfaces/cert_scanners/router';
import CertStampsRouter from '../../Interfaces/cert_stamps/router';
import CertStoragesRouter from '../../Interfaces/cert_storages/router';
import DirecturSignsRouter from '../../Interfaces/directur_signs/router';
import InvoiceDistsRouter from '../../Interfaces/invoice_dists/router';
import MinerbaDatasRouter from '../../Interfaces/minerba_datas/router';
import MinerbaDistsRouter from '../../Interfaces/minerba_dists/router';
import PackingsRouter from '../../Interfaces/packings/router';
import PaymentConfirmationsRouter from '../../Interfaces/payment_confirmations/router';
import PrintAssesionsRouter from '../../Interfaces/print_assesions/router';
import PrintBlanksRouter from '../../Interfaces/print_blanks/router';
import PrintCompensationsRouter from '../../Interfaces/print_compensations/router';
import ReceiptsRouter from '../../Interfaces/receipts/router';
import RolesRouter from '../../Interfaces/roles/routes';
import SchemasRouter from '../../Interfaces/schemas/routes';
import SendCommandsRouter from '../../Interfaces/send_commands/router';
import SptAssesorsRouter from '../../Interfaces/spt_assesors/routes';
import SystemMinerssRouter from '../../Interfaces/system_miners/router';
import TestResultsRouter from '../../Interfaces/test_results/router';
import TukConfirmationsRouter from '../../Interfaces/tuk_confirmations/router';
import UsersRouter from '../../Interfaces/users/routes';

const createServer = (container: Container): Express => {
    const publicPath = path.join(__dirname, '..', '..', '..', 'public');
    const server = express();

    server.use(express.json());

    // WEB
    server.use(express.static(publicPath));

    // API
    server.use('/api/admin', AdminsRouter(container));
    server.use('/api/auth', AuthenticationsRouter(container));
    server.use('/api/roles', authenticateJwt, RolesRouter(container));
    server.use('/api/users', authenticateJwt, UsersRouter(container));
    server.use('/api/schemas', authenticateJwt, SchemasRouter(container));
    server.use(
        '/api/cert-purposes',
        authenticateJwt,
        CertPurposesRouter(container)
    );
    server.use(
        '/api/cert-applications',
        authenticateJwt,
        CertApplicationsRouter(container)
    );
    server.use(
        '/api/spt-assesors',
        authenticateJwt,
        SptAssesorsRouter(container)
    );
    server.use(
        '/api/assesment-impls',
        authenticateJwt,
        AssesmentImplsRouter(container)
    );
    server.use('/api/assesions', authenticateJwt, AssesionsRouter(container));
    server.use(
        '/api/assesment-schedules',
        authenticateJwt,
        AssesmentSchedulesRouter(container)
    );
    server.use('/api/ba-sk', authenticateJwt, BaSksRouter(container));
    server.use(
        '/api/test-results',
        authenticateJwt,
        TestResultsRouter(container)
    );
    server.use(
        '/api/cert-holders',
        authenticateJwt,
        CertHoldersRouter(container)
    );
    server.use(
        '/api/blank-applications',
        authenticateJwt,
        BlankApplicationsRouter(container)
    );
    server.use(
        '/api/invoice-dists',
        authenticateJwt,
        InvoiceDistsRouter(container)
    );
    server.use(
        '/api/print-assesions',
        authenticateJwt,
        PrintAssesionsRouter(container)
    );
    server.use(
        '/api/print-blanks',
        authenticateJwt,
        PrintBlanksRouter(container)
    );
    server.use(
        '/api/print-compensations',
        authenticateJwt,
        PrintCompensationsRouter(container)
    );
    server.use(
        '/api/directur-signs',
        authenticateJwt,
        DirecturSignsRouter(container)
    );
    server.use(
        '/api/cert-managers',
        authenticateJwt,
        CertManagersRouter(container)
    );
    server.use(
        '/api/cert-stamps',
        authenticateJwt,
        CertStampsRouter(container)
    );
    server.use(
        '/api/cert-scanners',
        authenticateJwt,
        CertScannersRouter(container)
    );
    server.use(
        '/api/cert-storages',
        authenticateJwt,
        CertStoragesRouter(container)
    );
    server.use(
        '/api/system-miners',
        authenticateJwt,
        SystemMinerssRouter(container)
    );
    server.use(
        '/api/payment-confirmations',
        authenticateJwt,
        PaymentConfirmationsRouter(container)
    );
    server.use(
        '/api/send-commands',
        authenticateJwt,
        SendCommandsRouter(container)
    );
    server.use('/api/packings', authenticateJwt, PackingsRouter(container));
    server.use('/api/card-dists', authenticateJwt, CardDistsRouter(container));
    server.use('/api/cert-dists', authenticateJwt, CertDistsRouter(container));
    server.use('/api/receipts', authenticateJwt, ReceiptsRouter(container));
    server.use(
        '/api/tuk-confirmations',
        authenticateJwt,
        TukConfirmationsRouter(container)
    );
    server.use(
        '/api/register-minerbas',
        authenticateJwt,
        MinerbaDatasRouter(container)
    );
    server.use(
        '/api/minerba-dists',
        authenticateJwt,
        MinerbaDistsRouter(container)
    );

    server.use(errorHandler);
    return server;
};

export default createServer;
