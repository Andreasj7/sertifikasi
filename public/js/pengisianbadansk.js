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

const getPengisianBASK = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/ba-sk?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const listBaSk = responsJson.data.listBaSk;

    return listBaSk;
};

const buildTable = () => {
    getPengisianBASK().then((listBaSk) => {
        const values = listBaSk.map((listBadanSk) => {
            const {
                tukName,
                certPurpose: { purpose },
            } =
                listBadanSk.assesmentSchedule.assesion.assesmentImpl.sptAssesor
                    .certApplication;
            const { schema } = listBadanSk.assesmentSchedule.assesion.schema;
            const { isProcessed } = listBadanSk.assesmentSchedule;
            const { schedule } = listBadanSk.assesmentSchedule;
            const { isProcessed: paymentisProcessed } =
                listBadanSk.assesmentSchedule.assesion.assesmentImpl.sptAssesor
                    .certApplication.paymentConfirmation;
            const { isProcessed: listBaSkisProcessed } = listBadanSk;

            // Perbaikan: assesiDT tidak didefinisikan sebelum digunakan
            const assesiDT = formattedDate(
                new Date(listBadanSk.assesmentSchedule.assesion.date)
            );

            const tanggalAssesiElement = document.createElement('div');
            tanggalAssesiElement.innerHTML = assesiDT;

            return {
                id: listBadanSk.assesmentSchedule.assesion.id,
                tukName,
                purpose,
                schema,
                processed:
                    isProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                schedule,
                paymentisProcessed:
                    paymentisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                assesprocessed:
                    listBaSkisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                <a
                    href="#inputpengisianbadansk?id=${listBadanSk.id}"
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
                listBaSk[rowData].assesmentSchedule.assesion.assesmentImpl
                    .sptAssesor.certApplication.id;

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
                    role === UserRole.SEKRETARIS || role === UserRole.ADMIN
                );
        });
    });
};

closePopup();
buildTable();
