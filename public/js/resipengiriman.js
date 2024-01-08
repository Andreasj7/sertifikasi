/* eslint-disable no-undef */
import { UserRole, closePopup, showPopupOnClick } from './utils.js';

const getPermohonanSertifikasiById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/cert-applications/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonanSertifikasi = responseJson.data.certApplication;

    return permohonanSertifikasi;
};

const getResi = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/receipts?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const receipts = responseJson.data.receipts;

    return receipts;
};

const buildTable = () => {
    getResi().then((receipts) => {
        const dataTable = $('#dataTable').DataTable();
        receipts.forEach((receipt) => {
            const tukName =
                receipt.certDist.cardDist.packing.sendCommand.systemMiners
                    .printBlank.printAssesion?.assTestResult?.baSk
                    ?.assesmentSchedule?.assesion?.assesmentImpl?.sptAssesor
                    ?.certApplication?.tukName || '';
            const sertifikasi =
                receipt.certDist.cardDist.packing.sendCommand.systemMiners
                    .printBlank.printAssesion.assTestResult?.baSk
                    ?.assesmentSchedule?.assesion?.assesmentImpl?.sptAssesor
                    ?.certApplication?.referenceNumber || '';
            const purpose =
                receipt.certDist.cardDist.packing.sendCommand.systemMiners
                    .printBlank.printAssesion.assTestResult?.baSk
                    ?.assesmentSchedule?.assesion?.assesmentImpl?.sptAssesor
                    ?.certApplication?.certPurpose?.purpose || '';
            const schema =
                receipt.certDist.cardDist.packing.sendCommand.systemMiners
                    .printBlank.printAssesion.assTestResult?.baSk
                    ?.assesmentSchedule?.assesion?.schema?.schema || '';
            const paymentisProcessed =
                receipt.certDist.cardDist.packing.sendCommand.systemMiners
                    .printBlank.printAssesion?.assTestResult?.baSk
                    ?.assesmentSchedule?.assesion?.assesmentImpl?.sptAssesor
                    ?.certApplication?.paymentConfirmation.isProcessed || false;
            const packingProcessed = receipt?.isProcessed || false;

            const data = {
                tukName,
                sertifikasi,
                purpose,
                schema,
                paymentisProcessed:
                    paymentisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                packingProcessed:
                    packingProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                    <a
                        href="#inputresipengiriman?id=${receipt.id || ''}"
                        class="btn btn-warning btn-sm btn-edit"
                    >Edit</a>`,
            };

            dataTable.row.add(Object.values(data));
        });

        dataTable.draw();

        const firstColumnNodes = dataTable.column(0).nodes();
        $(firstColumnNodes).addClass('expandable');
        $(firstColumnNodes).addClass('link-style');
        $('#dataTable tbody').on('click', 'tr', async function () {
            const rowData = dataTable.row(this).index();
            const id =
                receipts[rowData]?.certDist.cardDist.packing.sendCommand
                    .systemMiners.printBlank.printAssesion?.assTestResult?.baSk
                    ?.assesmentSchedule?.assesion?.assesmentImpl?.sptAssesor
                    ?.certApplication?.id;

            if (id) {
                const data = await getPermohonanSertifikasiById(id);
                await showPopupOnClick(data);
            }
        });
        const user = JSON.parse(localStorage.getItem('user'));
        const role = user.role.role;

        $('#dataTable tbody').ready(function () {
            const lastColumnIndex = dataTable.columns().indexes().length - 1;
            dataTable
                .columns(lastColumnIndex)
                .visible(
                    role === UserRole.ADMINISTRASI || role === UserRole.ADMIN
                );
        });
    });
};

closePopup();
buildTable();
