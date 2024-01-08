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

const gePerintahKirim = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/send-commands?isProcessed=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const sendCommands = responseJson.data.sendCommands;

    return sendCommands;
};

const buildTable = () => {
    gePerintahKirim().then((sendCommands) => {
        const dataTable = $('#dataTable').DataTable();
        sendCommands.forEach((sendCommand) => {
            const tukName =
                sendCommand.systemMiners.printBlank.printAssesion?.assTestResult
                    ?.baSk?.assesmentSchedule?.assesion?.assesmentImpl
                    ?.sptAssesor?.certApplication?.tukName || '';
            const sertifikasi =
                sendCommand.systemMiners.printBlank.printAssesion.assTestResult
                    ?.baSk?.assesmentSchedule?.assesion?.assesmentImpl
                    ?.sptAssesor?.certApplication?.referenceNumber || '';
            const purpose =
                sendCommand.systemMiners.printBlank.printAssesion.assTestResult
                    ?.baSk?.assesmentSchedule?.assesion?.assesmentImpl
                    ?.sptAssesor?.certApplication?.certPurpose?.purpose || '';
            const schema =
                sendCommand.systemMiners.printBlank.printAssesion.assTestResult
                    ?.baSk?.assesmentSchedule?.assesion?.schema?.schema || '';
            const paymentisProcessed =
                sendCommand.systemMiners.printBlank.printAssesion?.assTestResult
                    ?.baSk?.assesmentSchedule?.assesion?.assesmentImpl
                    ?.sptAssesor?.certApplication?.paymentConfirmation
                    .isProcessed || false;
            const kirimProcessed = sendCommand?.isProcessed || false;

            const data = {
                tukName,
                sertifikasi,
                purpose,
                schema,
                paymentisProcessed:
                    paymentisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                kirimProcessed:
                    kirimProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                    <a
                        href="#inputperintahkirim?id=${sendCommand.id || ''}"
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
                sendCommands[rowData]?.systemMiners.printBlank.printAssesion
                    ?.assTestResult?.baSk?.assesmentSchedule?.assesion
                    ?.assesmentImpl?.sptAssesor?.certApplication?.id;

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
                    role === UserRole.SEKRETARIS || role === UserRole.ADMIN
                );
        });
    });
};

closePopup();
buildTable();
