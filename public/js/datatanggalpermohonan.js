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
    const responsJson = await response.json();
    const permohonanSertifikasi = responsJson.data.certApplication;

    return permohonanSertifikasi;
};

const getTanggalPermohonanSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/blank-applications?isProcessed=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const blankApplications = responsJson.data.blankApplications;

    return blankApplications;
};

const buildTable = () => {
    getTanggalPermohonanSertif().then((blankApplications) => {
        const values = blankApplications.map((blankApplication) => {
            const tukName = blankApplication.certApplication?.tukName || '';
            const permohonan =
                blankApplication.certApplication?.referenceNumber || '';
            const purpose =
                blankApplication.certApplication?.certPurpose?.purpose || '';
            const date = blankApplication.certApplication?.receiptDate || '';
            const paymentisProcessed =
                blankApplication.certApplication.paymentConfirmation
                    .isProcessed || false;
            const certHolderisProcessed = blankApplication.isProcessed || false;

            return {
                id:
                    blankApplication.certApplication?.certPurpose?.approval
                        ?.SptAssesor?.AssesmentImplementation?.schema?.Assesion
                        ?.AssesmentSchedule?.assesion?.id || '',
                tukName,
                permohonan,
                purpose,
                date,
                paymentisProcessed: paymentisProcessed
                    ? '<span style="color: green;">Berhasil</span>'
                    : '<span style="color: red;">Pending</span>',
                assesprocessed: certHolderisProcessed
                    ? '<span style="color: green;">Berhasil</span>'
                    : '<span style="color: red;">Pending</span>',
                Action: `
                <a
                    href="#edittanggalpermohonan?id=${
                        blankApplication.id || ''
                    }"
                    class="btn btn-warning btn-sm btn-edit"
                    >Edit</a
                >`,
            };
        });

        const dataTable = $('#dataTable').DataTable();
        values.forEach((value) => {
            const data = Object.entries(value)
                .filter(([key]) => key !== 'id')
                .map(([, val]) => val);
            dataTable.row.add(data);
        });

        dataTable.draw();

        const firstColumnNodes = dataTable.column(0).nodes();
        $(firstColumnNodes).addClass('expandable');
        $(firstColumnNodes).addClass('link-style');
        $('#dataTable tbody').on('click', 'tr', async function () {
            const rowData = dataTable.row(this).index();
            const id = blankApplications[rowData].certApplication.id;

            const data = await getPermohonanSertifikasiById(id);
            await showPopupOnClick(data);
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
