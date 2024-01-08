/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Container } from 'inversify';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import PasswordHash from '../Applications/security/PasswordHash';
import TokenManager from '../Applications/security/TokenManager';
import EditAssesionUseCase from '../Applications/use_case/assesions/EditAssesionUseCase';
import GetAssesionByIdUseCase from '../Applications/use_case/assesions/GetAssesionByIdUseCase';
import GetAssesionsUseCase from '../Applications/use_case/assesions/GetAssesionsUseCase';
import EditAssesmentImplUseCase from '../Applications/use_case/assesment_impls/EditAssesmentImplUseCase';
import GetAssesmentImplByIdUseCase from '../Applications/use_case/assesment_impls/GetAssesmentImplByIdUseCase';
import GetAssesmentImplsUseCase from '../Applications/use_case/assesment_impls/GetAssesmentImplsUseCase';
import EditAssesmentScheduleUseCase from '../Applications/use_case/assesment_schedules/EditAssesmentScheduleUseCase';
import GetAssesmentScheduleByIdUseCase from '../Applications/use_case/assesment_schedules/GetAssesmentScheduleByIdUseCase';
import GetAssesmentSchedulesUseCase from '../Applications/use_case/assesment_schedules/GetAssesmentSchedulesUseCase';
import ChangePasswordUseCase from '../Applications/use_case/authentications/ChangePasswordUseCase';
import LoginUserUseCase from '../Applications/use_case/authentications/LoginUserUseCase';
import LogoutUserUseCase from '../Applications/use_case/authentications/LogoutUserUseCase';
import EditBaSkUseCase from '../Applications/use_case/ba_sk/EditBaSkUseCase';
import GetBaSkByIdUseCase from '../Applications/use_case/ba_sk/GetBaSkByIdUseCase';
import GetBaSkListUseCase from '../Applications/use_case/ba_sk/GetBaSkListUseCase';
import EditBlankApplicationUseCase from '../Applications/use_case/blank_applications/EditBlankApplicationUseCase';
import GetBlankApplicationByIdUseCase from '../Applications/use_case/blank_applications/GetBlankApplicationByIdUseCase';
import GetBlankApplicationsUseCase from '../Applications/use_case/blank_applications/GetBlankApplicationsUseCase';
import EditCardDistUseCase from '../Applications/use_case/card_dists/EditCardDistUseCase';
import GetCardDistByIdUseCase from '../Applications/use_case/card_dists/GetCardDistByIdUseCase';
import GetCardDistsUseCase from '../Applications/use_case/card_dists/GetCardDistsUseCase';
import AddCertApplicationUseCase from '../Applications/use_case/cert_applications/AddCertApplicationUseCase';
import ApproveCertApplicationUseCase from '../Applications/use_case/cert_applications/ApproveCertApplicationUseCase';
import EditCertApplicationProcessedUseCase from '../Applications/use_case/cert_applications/EditCertApplicationProcessedUseCase';
import GetCertApplicationByIdUseCase from '../Applications/use_case/cert_applications/GetCertApplicationByIdUseCase';
import GetCertApplicationsUseCase from '../Applications/use_case/cert_applications/GetCertApplicationsUseCase';
import EditCertDistUseCase from '../Applications/use_case/cert_dists/EditCertDistUseCase';
import GetCertDistByIdUseCase from '../Applications/use_case/cert_dists/GetCertDistByIdUseCase';
import GetCertDistsUseCase from '../Applications/use_case/cert_dists/GetCertDistsUseCase';
import EditCertHolderUseCase from '../Applications/use_case/cert_holders/EditCertHolderUseCase';
import GetCertHolderByIdUseCase from '../Applications/use_case/cert_holders/GetCertHolderByIdUseCase';
import GetCertHoldersUseCase from '../Applications/use_case/cert_holders/GetCertHoldersUseCase';
import EditCertManagerUseCase from '../Applications/use_case/cert_managers/EditCertManagerUseCase';
import GetCertManagerByIdUseCase from '../Applications/use_case/cert_managers/GetCertManagerByIdUseCase';
import GetCertManagersUseCase from '../Applications/use_case/cert_managers/GetCertManagersUseCase';
import AddCertPurposeUseCase from '../Applications/use_case/cert_purposes/AddCertPurposeUseCase';
import DeleteCertPurposeUseCase from '../Applications/use_case/cert_purposes/DeleteCertPurposeUseCase';
import EditCertPurposeUseCase from '../Applications/use_case/cert_purposes/EditCertPurposeUseCase';
import GetCertPurposeByIdUseCase from '../Applications/use_case/cert_purposes/GetCertPurposeByIdUseCase';
import GetCertPurposesUseCase from '../Applications/use_case/cert_purposes/GetCertPurposesUseCase';
import EditCertScannerUseCase from '../Applications/use_case/cert_scanners/EditCertScannerUseCase';
import GetCertScannerByIdUseCase from '../Applications/use_case/cert_scanners/GetCertScannerByIdUseCase';
import GetCertScannersUseCase from '../Applications/use_case/cert_scanners/GetCertScannersUseCase';
import EditCertStampUseCase from '../Applications/use_case/cert_stamps/EditCertStampUseCase';
import GetCertStampByIdUseCase from '../Applications/use_case/cert_stamps/GetCertStampByIdUseCase';
import GetCertStampsUseCase from '../Applications/use_case/cert_stamps/GetCertStampsUseCase';
import EditCertStorageUseCase from '../Applications/use_case/cert_storages/EditCertScannerUseCase';
import GetCertStorageByIdUseCase from '../Applications/use_case/cert_storages/GetCertStorageByIdUseCase';
import GetCertStoragesUseCase from '../Applications/use_case/cert_storages/GetCertStoragesUseCase';
import EditDirecturSignUseCase from '../Applications/use_case/directur_signs/EditDirecturSignUseCase';
import GetDirecturSignByIdUseCase from '../Applications/use_case/directur_signs/GetDirecturSignByIdUseCase';
import GetDirecturSignsUseCase from '../Applications/use_case/directur_signs/GetDirecturSignsUseCase';
import EditInvoiceDistUseCase from '../Applications/use_case/invoice_dists/EditInvoiceDistUseCase';
import GetInvoiceDistByIdUseCase from '../Applications/use_case/invoice_dists/GetInvoiceDistByIdUseCase';
import GetInvoiceDistsUseCase from '../Applications/use_case/invoice_dists/GetInvoiceDistsUseCase';
import EditMinerbaDataUseCase from '../Applications/use_case/minerba_datas/EditMinerbaDataUseCase';
import GetMinerbaDataByIdUseCase from '../Applications/use_case/minerba_datas/GetMinerbaDataByIdUseCase';
import GetMinerbaDatasUseCase from '../Applications/use_case/minerba_datas/GetMinerbaDatasUseCase';
import EditMinerbaDistUseCase from '../Applications/use_case/minerba_dists/EditMinerbaDistUseCase';
import GetMinerbaDistByIdUseCase from '../Applications/use_case/minerba_dists/GetMinerbaDistByIdUseCase';
import GetMinerbaDistsUseCase from '../Applications/use_case/minerba_dists/GetMinerbaDistsUseCase';
import EditPackingUseCase from '../Applications/use_case/packings/EditPackingUseCase';
import GetPackingByIdUseCase from '../Applications/use_case/packings/GetPackingByIdUseCase';
import GetPackingsUseCase from '../Applications/use_case/packings/GetPackingsUseCase';
import EditPaymentConfirmationUseCase from '../Applications/use_case/payment_confirmations/EditPaymentConfirmationUseCase';
import GetPaymentConfirmationByIdUseCase from '../Applications/use_case/payment_confirmations/GetPaymenrConfirmationByIdUseCase';
import GetPaymentConfirmationsUseCase from '../Applications/use_case/payment_confirmations/GetPaymentConfirmationsUseCase';
import EditPrintAssesionUseCase from '../Applications/use_case/print_assesions/EditPrintAssesionUseCase';
import GetPrintAssesionsUseCase from '../Applications/use_case/print_assesions/GetPrintAsesionsUseCase';
import GetPrintAssesionByIdUseCase from '../Applications/use_case/print_assesions/GetPrintAssesionByIdUseCase';
import EditPrintBlankUseCase from '../Applications/use_case/print_blanks/EditPrintBlankUseCase';
import GetPrintBlankByIdUseCase from '../Applications/use_case/print_blanks/GetPrintBlankByIdUseCase';
import GetPrintBlanksUseCase from '../Applications/use_case/print_blanks/GetPrintBlanksUseCase';
import EditPrintCompensationUseCase from '../Applications/use_case/print_compensations/EditPrintCompensationUseCase';
import GetPrintCompensationByIdUseCase from '../Applications/use_case/print_compensations/GetPrinCompensationByIdUseCase';
import GetPrintCompensationsUseCase from '../Applications/use_case/print_compensations/GetPrintCompensationsUseCase';
import EditReceiptUseCase from '../Applications/use_case/receipts/EditReceiptUseCase';
import GetReceiptByIdUseCase from '../Applications/use_case/receipts/GetReceiptByIdUseCase';
import GetReceiptsUseCase from '../Applications/use_case/receipts/GetReceiptsUseCase';
import AddRoleUseCase from '../Applications/use_case/roles/AddRoleUseCse';
import DeleteRoleUseCase from '../Applications/use_case/roles/DeleteRoleUseCase';
import EditRoleUseCase from '../Applications/use_case/roles/EditRoleUseCase';
import GetRoleByIdUseCase from '../Applications/use_case/roles/GetRoleByIdUseCase';
import GetRolesUseCase from '../Applications/use_case/roles/GetRolesUseCase';
import AddSchemaUseCase from '../Applications/use_case/schemas/AddSchemaUseCase';
import DeleteSchemaUseCase from '../Applications/use_case/schemas/DeleteSchemaUseCase';
import EditSchemaUseCase from '../Applications/use_case/schemas/EditSchemaUseCase';
import GetSchemaByIdUseCase from '../Applications/use_case/schemas/GetSchemaByIdUseCase';
import GetSchemaUseCase from '../Applications/use_case/schemas/GetSchemasUseCase';
import EditSendCommandUseCase from '../Applications/use_case/send_commands/EditSendCommandUseCase';
import GetSendCommandByIdUseCase from '../Applications/use_case/send_commands/GetSendCommandByIdUseCase';
import GetSendCommandsUseCase from '../Applications/use_case/send_commands/GetSendCommandsUseCase';
import EditSptAssesorUseCase from '../Applications/use_case/spt_assesors/EditSptAssesorUseCase';
import GetSptAssesorByIdUseCase from '../Applications/use_case/spt_assesors/GetSptAssesorByIdUseCase';
import GetSptAssesorsUseCase from '../Applications/use_case/spt_assesors/GetSptAssesorsUseCase';
import EditSystemMinersUseCase from '../Applications/use_case/system_miners/EditSystemMinersUseCase';
import GetSystemMinersByIdUseCase from '../Applications/use_case/system_miners/GetSystemMinersByIdUseCase';
import GetSystemMinerssUseCase from '../Applications/use_case/system_miners/GetSystemMinerssUseCase';
import EditTestResultUseCase from '../Applications/use_case/test_results/EditTestResultUseCase';
import GetTestResultByIdUseCase from '../Applications/use_case/test_results/GetTestResultByIdUseCase';
import GetTestResultsUseCase from '../Applications/use_case/test_results/GetTestResultsUseCase';
import EditTukConfirmationUseCase from '../Applications/use_case/tuk_confirmations/EditTukConfirmationUseCase';
import GetTukConfirmationByIdUseCase from '../Applications/use_case/tuk_confirmations/GetTukConfirmationByIdUseCase';
import GetTukConfirmationsUseCase from '../Applications/use_case/tuk_confirmations/GetTukConfirmationsUseCase';
import AddUserUseCase from '../Applications/use_case/users/AddUserUseCase';
import DeleteUserUseCase from '../Applications/use_case/users/DeleteUserUseCase';
import EditUserUseCase from '../Applications/use_case/users/EditUserUseCase';
import GetUserByIdUseCase from '../Applications/use_case/users/GetUserByIdUseCase';
import GetUsersUseCase from '../Applications/use_case/users/GetUsersUseCase';
import ApprovalRepository from '../Domains/approvals/ApprovalRepository';
import AssesmentImplRepository from '../Domains/assesment_impl/AssmentImplRepository';
import AuthenticationRepository from '../Domains/authentications/AuthenticationRepository';
import CertApplicationRepository from '../Domains/cert_applications/CertApplicationRepository';
import CertPurposeRepository from '../Domains/cert_purposes/CertPurposeRepository';
import RoleRepository from '../Domains/roles/RoleRepository';
import SchemaRepository from '../Domains/schemas/SchemaRepository';
import SptAssesorRepository from '../Domains/spt_assesors/SptAssesorRepository';
import UserRepository from '../Domains/users/UserRepository';
import prisma from './database/mysql/connection';
import ApprovalRepositoryMySql from './repository/ApprovalRepositoryMySql';
import AssesionRepositoryMySql from './repository/AssesionRepositoryMySql';
import AssesmentImplRepositoryMySql from './repository/AssesmentImplRepositoryMySql';
import AssesmentScheduleRepositoryMySql from './repository/AssesmentScheduleRepositoryMySql';
import AuthenticationRepositoryMySql from './repository/AuthenticationRepositoryMySql';
import BaSkRepositoryMySql from './repository/BaSkRepositoryyMySql';
import BlankApplicationRepositoryMySql from './repository/BlankApplicationRepositoryMySql';
import CardDistRepositoryMySql from './repository/CardDistRepositoryMySql';
import CertApplicationRepositoryMySql from './repository/CertApplicationRepositoryMySql';
import CertDistRepositoryMySql from './repository/CertDistRepositoryMySql';
import CertHolderRepositoryMySql from './repository/CertHolderRepositoryMySql';
import CertManagerRepositoryMySql from './repository/CertManagerRepositoryMySql';
import CertPurposeRepositoryMySql from './repository/CertPurposeRepositoryMySql';
import CertScannerRepositoryMySql from './repository/CertScannerRepositoryMySql';
import CertStampRepositoryMySql from './repository/CertStampRepositoryMySql';
import CertStorageRepositoryMySql from './repository/CertStorageRepositoryMySql';
import DirecturSignRepositoryMySql from './repository/DirecturSignRepositoryMySql';
import InvoiceDistRepositoryMySql from './repository/InvoiceDistRepositorMySql';
import MinerbaDataRepositoryMySql from './repository/MinerbaDataRepositoryMySql';
import MinerbaDistRepositoryMySql from './repository/MinerbaDistRepositoryMySql';
import PackingRepositoryMySql from './repository/PackingRepositoryMySql';
import PaymentConfirmationRepositoryMySql from './repository/PaymentConfirmationsRepositoryMySql';
import PrintAssesionRepositoryMySql from './repository/PrintAssesionRepositoryMySql';
import PrintBlankRepositoryMySql from './repository/PrintBlankRepositoryMySql';
import PrintCompensationRepositoryMySql from './repository/PrintCompensationRepositoryMySql';
import ReceiptRepositoryMySql from './repository/ReceiptRepositoryMySql';
import RoleRepositoryMySql from './repository/RoleRepositoryMySql';
import SchemaRepositoryMySql from './repository/SchemaRepositoryMySql';
import SendCommandRepositoryMySql from './repository/SendCommandRepositoryMySql';
import SptAssesorRepositoryMySql from './repository/SptAssesorRepositoryMySql';
import SystemMinersRepositoryMySql from './repository/SystemMinersRepositoryMySql';
import TestResultRepositoryMySql from './repository/TestResultRepositoryyMySql';
import TukConfirmationRepositoryMySql from './repository/TukConfirmationRepositoryMySql';
import UserRepositoryMySql from './repository/UserRepositoryMySql';
import BcryptPasswordHash from './security/BcryptPasswordHash';
import JwtTokenManager from './security/JwtTokenManager';

const createContainer = (): Container => {
    const container = new Container();

    // use cases
    container.bind<AddRoleUseCase>(AddRoleUseCase).toSelf();
    container.bind<DeleteRoleUseCase>(DeleteRoleUseCase).toSelf();
    container.bind<GetRoleByIdUseCase>(GetRoleByIdUseCase).toSelf();
    container.bind<GetRolesUseCase>(GetRolesUseCase).toSelf();
    container.bind<EditRoleUseCase>(EditRoleUseCase).toSelf();

    container.bind<AddUserUseCase>(AddUserUseCase).toSelf();
    container.bind<ChangePasswordUseCase>(ChangePasswordUseCase).toSelf();
    container.bind<DeleteUserUseCase>(DeleteUserUseCase).toSelf();
    container.bind<EditUserUseCase>(EditUserUseCase).toSelf();
    container.bind<GetUserByIdUseCase>(GetUserByIdUseCase).toSelf();
    container.bind<GetUsersUseCase>(GetUsersUseCase).toSelf();

    container.bind<LoginUserUseCase>(LoginUserUseCase).toSelf();
    container.bind<LogoutUserUseCase>(LogoutUserUseCase).toSelf();

    container.bind<AddSchemaUseCase>(AddSchemaUseCase).toSelf();
    container.bind<DeleteSchemaUseCase>(DeleteSchemaUseCase).toSelf();
    container.bind<EditSchemaUseCase>(EditSchemaUseCase).toSelf();
    container.bind<GetSchemaUseCase>(GetSchemaUseCase).toSelf();
    container.bind<GetSchemaByIdUseCase>(GetSchemaByIdUseCase).toSelf();

    container.bind<AddCertPurposeUseCase>(AddCertPurposeUseCase).toSelf();
    container.bind<DeleteCertPurposeUseCase>(DeleteCertPurposeUseCase).toSelf();
    container.bind<EditCertPurposeUseCase>(EditCertPurposeUseCase).toSelf();
    container.bind<GetCertPurposesUseCase>(GetCertPurposesUseCase).toSelf();
    container
        .bind<GetCertPurposeByIdUseCase>(GetCertPurposeByIdUseCase)
        .toSelf();

    container
        .bind<AddCertApplicationUseCase>(AddCertApplicationUseCase)
        .toSelf();
    container
        .bind<ApproveCertApplicationUseCase>(ApproveCertApplicationUseCase)
        .toSelf();
    container
        .bind<GetCertApplicationsUseCase>(GetCertApplicationsUseCase)
        .toSelf();
    container
        .bind<GetCertApplicationByIdUseCase>(GetCertApplicationByIdUseCase)
        .toSelf();
    container
        .bind<EditCertApplicationProcessedUseCase>(
            EditCertApplicationProcessedUseCase
        )
        .toSelf();

    container.bind<GetSptAssesorsUseCase>(GetSptAssesorsUseCase).toSelf();
    container.bind<GetSptAssesorByIdUseCase>(GetSptAssesorByIdUseCase).toSelf();
    container.bind<EditSptAssesorUseCase>(EditSptAssesorUseCase).toSelf();

    container.bind<GetAssesmentImplsUseCase>(GetAssesmentImplsUseCase).toSelf();
    container
        .bind<GetAssesmentImplByIdUseCase>(GetAssesmentImplByIdUseCase)
        .toSelf();
    container.bind<EditAssesmentImplUseCase>(EditAssesmentImplUseCase).toSelf();

    container.bind<GetAssesionsUseCase>(GetAssesionsUseCase).toSelf();
    container.bind<GetAssesionByIdUseCase>(GetAssesionByIdUseCase).toSelf();
    container.bind<EditAssesionUseCase>(EditAssesionUseCase).toSelf();

    container
        .bind<GetAssesmentSchedulesUseCase>(GetAssesmentSchedulesUseCase)
        .toSelf();
    container
        .bind<GetAssesmentScheduleByIdUseCase>(GetAssesmentScheduleByIdUseCase)
        .toSelf();
    container
        .bind<EditAssesmentScheduleUseCase>(EditAssesmentScheduleUseCase)
        .toSelf();

    container.bind<GetBaSkListUseCase>(GetBaSkListUseCase).toSelf();
    container.bind<GetBaSkByIdUseCase>(GetBaSkByIdUseCase).toSelf();
    container.bind<EditBaSkUseCase>(EditBaSkUseCase).toSelf();

    container.bind<GetTestResultsUseCase>(GetTestResultsUseCase).toSelf();
    container.bind<GetTestResultByIdUseCase>(GetTestResultByIdUseCase).toSelf();
    container.bind<EditTestResultUseCase>(EditTestResultUseCase).toSelf();

    container.bind<GetCertHoldersUseCase>(GetCertHoldersUseCase).toSelf();
    container.bind<GetCertHolderByIdUseCase>(GetCertHolderByIdUseCase).toSelf();
    container.bind<EditCertHolderUseCase>(EditCertHolderUseCase).toSelf();

    container
        .bind<GetBlankApplicationsUseCase>(GetBlankApplicationsUseCase)
        .toSelf();
    container
        .bind<GetBlankApplicationByIdUseCase>(GetBlankApplicationByIdUseCase)
        .toSelf();
    container
        .bind<EditBlankApplicationUseCase>(EditBlankApplicationUseCase)
        .toSelf();

    container.bind<GetInvoiceDistsUseCase>(GetInvoiceDistsUseCase).toSelf();
    container
        .bind<GetInvoiceDistByIdUseCase>(GetInvoiceDistByIdUseCase)
        .toSelf();
    container.bind<EditInvoiceDistUseCase>(EditInvoiceDistUseCase).toSelf();

    container.bind<GetPrintAssesionsUseCase>(GetPrintAssesionsUseCase).toSelf();
    container
        .bind<GetPrintAssesionByIdUseCase>(GetPrintAssesionByIdUseCase)
        .toSelf();
    container.bind<EditPrintAssesionUseCase>(EditPrintAssesionUseCase).toSelf();

    container.bind<GetPrintBlanksUseCase>(GetPrintBlanksUseCase).toSelf();
    container.bind<GetPrintBlankByIdUseCase>(GetPrintBlankByIdUseCase).toSelf();
    container.bind<EditPrintBlankUseCase>(EditPrintBlankUseCase).toSelf();

    container
        .bind<GetPrintCompensationsUseCase>(GetPrintCompensationsUseCase)
        .toSelf();
    container
        .bind<GetPrintCompensationByIdUseCase>(GetPrintCompensationByIdUseCase)
        .toSelf();
    container
        .bind<EditPrintCompensationUseCase>(EditPrintCompensationUseCase)
        .toSelf();

    container.bind<GetDirecturSignsUseCase>(GetDirecturSignsUseCase).toSelf();
    container
        .bind<GetDirecturSignByIdUseCase>(GetDirecturSignByIdUseCase)
        .toSelf();
    container.bind<EditDirecturSignUseCase>(EditDirecturSignUseCase).toSelf();

    container.bind<GetCertManagersUseCase>(GetCertManagersUseCase).toSelf();
    container
        .bind<GetCertManagerByIdUseCase>(GetCertManagerByIdUseCase)
        .toSelf();
    container.bind<EditCertManagerUseCase>(EditCertManagerUseCase).toSelf();

    container.bind<GetCertStampsUseCase>(GetCertStampsUseCase).toSelf();
    container.bind<GetCertStampByIdUseCase>(GetCertStampByIdUseCase).toSelf();
    container.bind<EditCertStampUseCase>(EditCertStampUseCase).toSelf();

    container.bind<GetCertScannersUseCase>(GetCertScannersUseCase).toSelf();
    container
        .bind<GetCertScannerByIdUseCase>(GetCertScannerByIdUseCase)
        .toSelf();
    container.bind<EditCertScannerUseCase>(EditCertScannerUseCase).toSelf();

    container.bind<GetCertStoragesUseCase>(GetCertStoragesUseCase).toSelf();
    container
        .bind<GetCertStorageByIdUseCase>(GetCertStorageByIdUseCase)
        .toSelf();
    container.bind<EditCertStorageUseCase>(EditCertStorageUseCase).toSelf();

    container.bind<GetSystemMinerssUseCase>(GetSystemMinerssUseCase).toSelf();
    container
        .bind<GetSystemMinersByIdUseCase>(GetSystemMinersByIdUseCase)
        .toSelf();
    container.bind<EditSystemMinersUseCase>(EditSystemMinersUseCase).toSelf();

    container
        .bind<GetPaymentConfirmationsUseCase>(GetPaymentConfirmationsUseCase)
        .toSelf();
    container
        .bind<GetPaymentConfirmationByIdUseCase>(
            GetPaymentConfirmationByIdUseCase
        )
        .toSelf();
    container
        .bind<EditPaymentConfirmationUseCase>(EditPaymentConfirmationUseCase)
        .toSelf();

    container.bind<GetSendCommandsUseCase>(GetSendCommandsUseCase).toSelf();
    container
        .bind<GetSendCommandByIdUseCase>(GetSendCommandByIdUseCase)
        .toSelf();
    container.bind<EditSendCommandUseCase>(EditSendCommandUseCase).toSelf();

    container.bind<GetPackingsUseCase>(GetPackingsUseCase).toSelf();
    container.bind<GetPackingByIdUseCase>(GetPackingByIdUseCase).toSelf();
    container.bind<EditPackingUseCase>(EditPackingUseCase).toSelf();

    container.bind<GetCardDistsUseCase>(GetCardDistsUseCase).toSelf();
    container.bind<GetCardDistByIdUseCase>(GetCardDistByIdUseCase).toSelf();
    container.bind<EditCardDistUseCase>(EditCardDistUseCase).toSelf();

    container.bind<GetCertDistsUseCase>(GetCertDistsUseCase).toSelf();
    container.bind<GetCertDistByIdUseCase>(GetCertDistByIdUseCase).toSelf();
    container.bind<EditCertDistUseCase>(EditCertDistUseCase).toSelf();

    container.bind<GetReceiptsUseCase>(GetReceiptsUseCase).toSelf();
    container.bind<GetReceiptByIdUseCase>(GetReceiptByIdUseCase).toSelf();
    container.bind<EditReceiptUseCase>(EditReceiptUseCase).toSelf();

    container
        .bind<GetTukConfirmationsUseCase>(GetTukConfirmationsUseCase)
        .toSelf();
    container
        .bind<GetTukConfirmationByIdUseCase>(GetTukConfirmationByIdUseCase)
        .toSelf();
    container
        .bind<EditTukConfirmationUseCase>(EditTukConfirmationUseCase)
        .toSelf();

    container.bind<GetMinerbaDatasUseCase>(GetMinerbaDatasUseCase).toSelf();
    container
        .bind<GetMinerbaDataByIdUseCase>(GetMinerbaDataByIdUseCase)
        .toSelf();
    container.bind<EditMinerbaDataUseCase>(EditMinerbaDataUseCase).toSelf();

    container.bind<GetMinerbaDistsUseCase>(GetMinerbaDistsUseCase).toSelf();
    container
        .bind<GetMinerbaDistByIdUseCase>(GetMinerbaDistByIdUseCase)
        .toSelf();
    container.bind<EditMinerbaDistUseCase>(EditMinerbaDistUseCase).toSelf();

    // repositories
    container.bind<RoleRepository>(RoleRepositoryMySql).toSelf();
    container.bind<UserRepository>(UserRepositoryMySql).toSelf();
    container
        .bind<AuthenticationRepository>(AuthenticationRepositoryMySql)
        .toSelf();
    container.bind<SchemaRepository>(SchemaRepositoryMySql).toSelf();
    container.bind<CertPurposeRepository>(CertPurposeRepositoryMySql).toSelf();
    container.bind<ApprovalRepository>(ApprovalRepositoryMySql).toSelf();
    container
        .bind<CertApplicationRepository>(CertApplicationRepositoryMySql)
        .toSelf();
    container.bind<SptAssesorRepository>(SptAssesorRepositoryMySql).toSelf();
    container
        .bind<AssesmentImplRepository>(AssesmentImplRepositoryMySql)
        .toSelf();
    container.bind<AssesionRepositoryMySql>(AssesionRepositoryMySql).toSelf();
    container
        .bind<AssesmentScheduleRepositoryMySql>(
            AssesmentScheduleRepositoryMySql
        )
        .toSelf();
    container.bind<BaSkRepositoryMySql>(BaSkRepositoryMySql).toSelf();
    container
        .bind<TestResultRepositoryMySql>(TestResultRepositoryMySql)
        .toSelf();
    container
        .bind<CertHolderRepositoryMySql>(CertHolderRepositoryMySql)
        .toSelf();
    container
        .bind<BlankApplicationRepositoryMySql>(BlankApplicationRepositoryMySql)
        .toSelf();
    container
        .bind<InvoiceDistRepositoryMySql>(InvoiceDistRepositoryMySql)
        .toSelf();
    container
        .bind<PrintAssesionRepositoryMySql>(PrintAssesionRepositoryMySql)
        .toSelf();
    container
        .bind<PrintBlankRepositoryMySql>(PrintBlankRepositoryMySql)
        .toSelf();
    container
        .bind<PrintCompensationRepositoryMySql>(
            PrintCompensationRepositoryMySql
        )
        .toSelf();
    container
        .bind<DirecturSignRepositoryMySql>(DirecturSignRepositoryMySql)
        .toSelf();
    container
        .bind<CertManagerRepositoryMySql>(CertManagerRepositoryMySql)
        .toSelf();
    container.bind<CertStampRepositoryMySql>(CertStampRepositoryMySql).toSelf();
    container
        .bind<CertScannerRepositoryMySql>(CertScannerRepositoryMySql)
        .toSelf();
    container
        .bind<CertStorageRepositoryMySql>(CertStorageRepositoryMySql)
        .toSelf();
    container
        .bind<SystemMinersRepositoryMySql>(SystemMinersRepositoryMySql)
        .toSelf();
    container
        .bind<PaymentConfirmationRepositoryMySql>(
            PaymentConfirmationRepositoryMySql
        )
        .toSelf();
    container
        .bind<SendCommandRepositoryMySql>(SendCommandRepositoryMySql)
        .toSelf();
    container.bind<PackingRepositoryMySql>(PackingRepositoryMySql).toSelf();
    container.bind<CardDistRepositoryMySql>(CardDistRepositoryMySql).toSelf();
    container.bind<CertDistRepositoryMySql>(CertDistRepositoryMySql).toSelf();
    container.bind<ReceiptRepositoryMySql>(ReceiptRepositoryMySql).toSelf();
    container
        .bind<TukConfirmationRepositoryMySql>(TukConfirmationRepositoryMySql)
        .toSelf();
    container
        .bind<MinerbaDataRepositoryMySql>(MinerbaDataRepositoryMySql)
        .toSelf();
    container
        .bind<MinerbaDistRepositoryMySql>(MinerbaDistRepositoryMySql)
        .toSelf();

    // security
    container.bind<PasswordHash>(BcryptPasswordHash).toSelf();
    container.bind<TokenManager>(JwtTokenManager).toSelf();

    // externals
    container.bind('Bcrypt').toConstantValue(bcrypt);
    container.bind('Jwt').toConstantValue(jwt);
    container.bind<PrismaClient>(PrismaClient).toConstantValue(prisma);
    container
        .bind<() => string>('IdGenerator')
        .toConstantValue(shortid.generate);

    return container;
};

export default createContainer;
