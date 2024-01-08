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

const getMinerba = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/register-minerbas?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const minerbaDatas = responseJson.data.minerbaDatas;

    return minerbaDatas;
};

const buildTable = () => {
    getMinerba().then((minerbaDatas) => {
        const dataTable = $('#dataTable').DataTable();
        minerbaDatas.forEach((minerbaData) => {
            const tukName = minerbaData?.certApplication?.tukName || '';
            const assesmentDate =
                minerbaData?.certApplication?.assesmentDate || '';
            const referenceNumber =
                minerbaData?.certApplication?.referenceNumber || '';
            const receiptDate = minerbaData?.certApplication?.receiptDate || '';
            const purpose =
                minerbaData?.certApplication?.certPurpose?.purpose || '';
            const approval =
                minerbaData?.certApplication?.approval.isApproved || false;
            const paymentisProcessed =
                minerbaData?.certApplication?.paymentConfirmation.isProcessed ||
                false;
            const closingProcessed =
                minerbaData?.certApplication?.isProcessed || false;

            const data = {
                tukName,
                assesmentDate,
                referenceNumber,
                receiptDate,
                purpose,
                approval:
                    approval === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                paymentisProcessed:
                    paymentisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                closingProcessed:
                    closingProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                    <a
                        href="#inputpendataanminerba?id=${minerbaData.id || ''}"
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
            const id = minerbaDatas[rowData]?.certApplication?.id;

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
