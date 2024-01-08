import Schema from '../../Domains/schemas/entities/Schema';

export type RegisterUserPayload = {
    username: string;
    password: string;
    fullname: string;
    roleId: string;
};

export type AuthPayload = {
    id: string;
    username: string;
};

export type TokenPayload = {
    accessToken: string;
    refreshToken: string;
};

export type LoginPayload = {
    username: string;
    password: string;
};

export type RolePayload = {
    id: string;
    role: string;
};

export type EditUserPayload = {
    username: string;
    fullname: string;
    roleId: string;
};

export type UserPayload = {
    id: string;
    username: string;
    fullname: string;
    role: RolePayload | null;
};

export type SchemaPayload = {
    id: string;
    schema: string;
};

export type PurposePayload = {
    id: string;
    purpose: string;
};

export type CertApplicationPayload = {
    id: string;
    tukName: string;
    assesmentDate: string;
    referenceNumber: string;
    receiptDate: string;
    certPurpose: PurposePayload;
    isProcessed: boolean;
    approval: ApprovalPayload;
    minerbaData?: MinerbaDataPayload?;
    paymentConfirmation?: PaymentConfirmationPayload?;
    certHolder?: CertHolderPayload?;
    blankApplication?: BlankApplicationPayload?;
    invoiceDist?: InvoiceDistPayload?;
    sptAssesor?: SptAssesorPayload?;
};

export type NewCertApplicationPayload = {
    tukName: string;
    assesmentDate: string;
    referenceNumber: string;
    receiptDate: string;
    idCertPurpose: string;
    isProcessed: boolean;
    idApproval: string;
};

export type AddCertApplicationPayload = {
    tukName: string;
    assesmentDate: string;
    referenceNumber: string;
    receiptDate: string;
    idCertPurpose: string;
    isProcessed: boolean;
};

export type ApprovalPayload = {
    id: string;
    date: string | null;
    isApproved: boolean;
};

export type SptAssesorPayload = {
    id: string;
    noSptAssesor: string | null;
    assesorDate: string | null;
    isProcessed: boolean;
    certApplication?: CertApplicationPayload?;
};

export type NewSptAssesorPayload = {
    noSptAssesor: string;
    assesorDate: string;
    isProcessed: boolean;
    idCertApplication: string;
};

export type AssesmentImplPayload = {
    id: string;
    isProcessed: boolean;
    sptAssesor: SptAssesorPayload;
    assesions?: AssesionPayload[]?;
};

export type NewAssesmentImplPayload = {
    lspAdmin: string | null;
    assesorLead: string | null;
    assesorName: string | null;
    assesionNumber: number;
    asesorRecommendation: string | null;
    idSchema: string;
};

export type AssesionPayload = {
    id: string;
    lspAdmin: string | null;
    assesorLead: string | null;
    assesorName: string | null;
    assesionNumber: number;
    asesorRecommendation: string | null;
    date: string | null;
    isProcessed: boolean;
    assesmentImpl?: AssesmentImplPayload | null;
    schema: Schema?;
};

export type AssesmentSchedulePayload = {
    id: string;
    schedule: string | null;
    isProcessed: boolean;
    assesion: AssesionPayload?;
};

export type BaSkPayload = {
    id: string;
    noBaDate: string | null;
    noSkDate: string | null;
    plenoDate: string | null;
    baDate: string | null;
    skDate: string | null;
    isProcessed: boolean;
    assesmentSchedule: AssesmentSchedulePayload?;
};

export type NewBaSkPayload = {
    noBaDate: string | null;
    noSkDate: string | null;
    plenoDate: string | null;
    baDate: string | null;
    skDate: string | null;
    isProcessed: boolean;
};

export type TestResultPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    baSk: BaSkPayload?;
};

export type CertHolderPayload = {
    id: string;
    certHolder: stirng | null;
    isProcessed: boolean;
    certApplication?: CertApplicationPayload?;
};

export type BlankApplicationPayload = {
    id: string;
    noBlank: string | null;
    dateBlank: string | null;
    noHandover: string | null;
    dateHandover: string | null;
    blankReceiptDate: string | null;
    isProcessed: boolean;
    certApplication?: CertApplicationPayload?;
};

export type NewBlankApplicationPayload = {
    noBlank: string | null;
    dateBlank: string | null;
    noHandover: string | null;
    dateHandover: string | null;
    blankReceiptDate: string | null;
    isProcessed: boolean;
};

export type InvoiceDistPayload = {
    id: string;
    invoiceDate: string | null;
    isProcessed: boolean;
    certApplication?: CertApplicationPayload?;
};

export type PrintAssesionPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    assTestResult: TestResultPayload?;
};

export type PrintBlankPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    printAssesion?: PrintAssesion?;
};

export type PrintCompensationPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    printBlank: PrintBlankPayload?;
};

export type DirecturSignPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    printBlank: PrintBlankPayload?;
};

export type CertManagerPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    printBlank: PrintBlankPayload?;
};

export type CertStampPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    printBlank: PrintBlankPayload?;
};

export type CertScannerPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    printBlank: PrintBlankPayload?;
};

export type CertStoragePayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    printBlank: PrintBlankPayload?;
};

export type SystemMinersPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    printBlank?: PrintBlankPayload?;
};

export type PaymentConfirmationPayload = {
    id: string;
    date: string | null;
    proofUrl: string | null;
    isProcessed: boolean;
    certApplication?: CertApplicationPayload?;
};

export type SendCommandPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    systemMiners: SystemMinersPayload?;
};

export type PackingPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    sendCommand: SendCommandPayload?;
};

export type CardDistPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    packing: PackingPayload?;
};

export type CertDistPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    cardDist: CardDistPayload?;
};

export type ReceiptPayload = {
    id: string;
    date: string | null;
    isProcessed: boolean;
    certDist: CertDistPayload?;
};

export type TukConfirmationPayload = {
    id: string;
    date: string | null;
    description: string | null;
    isProcessed: boolean;
    receipt: ReceiptPayload?;
};
export type MinerbaDataPayload = {
    id: string;
    no: string | null;
    date: string | null;
    isProcessed: boolean;
    certApplication?: CertApplicationPayload?;
};

export type MinerbaDistPayload = {
    id: string;
    no: string | null;
    date: string | null;
    isProcessed: boolean;
    minerbaData?: MinerbaDataPayload?;
};
