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

const getPacking = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/packings?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const packings = responseJson.data.packings;

    return packings;
};

const buildTable = () => {
    getPacking().then((packings) => {
        const dataTable = $('#dataTable').DataTable();
        packings.forEach((packing) => {
            const tukName =
                packing.sendCommand.systemMiners.printBlank.printAssesion
                    ?.assTestResult?.baSk?.assesmentSchedule?.assesion
                    ?.assesmentImpl?.sptAssesor?.certApplication?.tukName || '';
            const sertifikasi =
                packing.sendCommand.systemMiners.printBlank.printAssesion
                    .assTestResult?.baSk?.assesmentSchedule?.assesion
                    ?.assesmentImpl?.sptAssesor?.certApplication
                    ?.referenceNumber || '';
            const purpose =
                packing.sendCommand.systemMiners.printBlank.printAssesion
                    .assTestResult?.baSk?.assesmentSchedule?.assesion
                    ?.assesmentImpl?.sptAssesor?.certApplication?.certPurpose
                    ?.purpose || '';
            const schema =
                packing.sendCommand.systemMiners.printBlank.printAssesion
                    .assTestResult?.baSk?.assesmentSchedule?.assesion?.schema
                    ?.schema || '';
            const paymentisProcessed =
                packing.sendCommand.systemMiners.printBlank.printAssesion
                    ?.assTestResult?.baSk?.assesmentSchedule?.assesion
                    ?.assesmentImpl?.sptAssesor?.certApplication
                    ?.paymentConfirmation.isProcessed || false;
            const packingProcessed = packing?.isProcessed || false;

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
                        href="#inputpacking?id=${packing.id || ''}"
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
                packings[rowData]?.sendCommand.systemMiners.printBlank
                    .printAssesion?.assTestResult?.baSk?.assesmentSchedule
                    ?.assesion?.assesmentImpl?.sptAssesor?.certApplication?.id;

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
