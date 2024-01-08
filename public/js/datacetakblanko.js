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

const getBlankoSertifikasi = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/print-blanks?isProcessed=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const printBlanks = responseJson.data.printBlanks;

    return printBlanks;
};

const buildTable = () => {
    getBlankoSertifikasi().then((printBlanks) => {
        const dataTable = $('#dataTable').DataTable();
        printBlanks.forEach((printBlank) => {
            const tukName =
                printBlank.printAssesion?.assTestResult?.baSk?.assesmentSchedule
                    ?.assesion?.assesmentImpl?.sptAssesor?.certApplication
                    ?.tukName || '';
            const sertifikasi =
                printBlank.printAssesion.assTestResult?.baSk?.assesmentSchedule
                    ?.assesion?.assesmentImpl?.sptAssesor?.certApplication
                    ?.referenceNumber || '';
            const purpose =
                printBlank.printAssesion.assTestResult?.baSk?.assesmentSchedule
                    ?.assesion?.assesmentImpl?.sptAssesor?.certApplication
                    ?.certPurpose?.purpose || '';
            const schema =
                printBlank.printAssesion.assTestResult?.baSk?.assesmentSchedule
                    ?.assesion?.schema?.schema || '';
            const paymentProcessed =
                printBlank?.printAssesion?.assTestResult?.baSk.assesmentSchedule
                    .assesion.assesmentImpl.sptAssesor.certApplication
                    .paymentConfirmation.isProcessed || false;
            const cetakProcessed = printBlank?.isProcessed || false;

            const data = {
                tukName,
                sertifikasi,
                purpose,
                schema,
                paymentProcessed:
                    paymentProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                cetakProcessed:
                    cetakProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                    <a
                        href="#inputcetakblanko?id=${printBlank.id || ''}"
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
                printBlanks[rowData].printAssesion.assTestResult.baSk
                    .assesmentSchedule.assesion.assesmentImpl.sptAssesor
                    .certApplication.id;

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
