/* eslint-disable no-undef */
import {
    UserRole,
    closePopup,
    formattedDate,
    showPopupOnClick,
} from './utils.js';

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

const getJadwalAssesment = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/assesment-schedules?isProcessed=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const assesmentSchedules = responsJson.data.assesmentSchedules;

    return assesmentSchedules;
};

const buildTable = () => {
    getJadwalAssesment().then((assesmentSchedules) => {
        const values = assesmentSchedules.map((assesmentSchedule) => {
            const {
                tukName,
                certPurpose: { purpose },
            } =
                assesmentSchedule.assesion.assesmentImpl.sptAssesor
                    .certApplication;
            const { schema } = assesmentSchedule.assesion.schema;
            const { isProcessed } = assesmentSchedule.assesion;
            const assesiDT = formattedDate(
                new Date(assesmentSchedule.assesion.date)
            );
            const { isProcessed: assesmentisProcessed } = assesmentSchedule;
            const { isProcessed: paymentisProcessed } =
                assesmentSchedule.assesion.assesmentImpl.sptAssesor
                    .certApplication.paymentConfirmation;

            const tanggalAssesiElement = document.createElement('div');
            tanggalAssesiElement.innerHTML = assesiDT;

            return {
                id: assesmentSchedule.assesion.id, // <-- Define id here
                tukName,
                purpose,
                schema,
                processed:
                    isProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                tanggalAssesi: tanggalAssesiElement.outerHTML, // Tambahkan property tanggalAssesi
                paymentisProcessed:
                    paymentisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                assesprocessed:
                    assesmentisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                <a
                    href="#inputjadwalasesmen?id=${assesmentSchedule.id}" // <-- Use assesion.id instead of assesmentImpl.id
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
            const id =
                assesmentSchedules[rowData].assesion.assesmentImpl.sptAssesor
                    .certApplication.id;

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
                    role === UserRole.SERTIFIKASI || role === UserRole.ADMIN
                );
        });
    });
};

closePopup();
buildTable();
