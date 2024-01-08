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

const getPermohonanSertifikasi = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/cert-applications?isProcessed=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const permohonanSertifikasi = responsJson.data.certApplications;

    return permohonanSertifikasi;
};

const buildTable = () => {
    getPermohonanSertifikasi().then((permohonanSertifikasi) => {
        const values = permohonanSertifikasi.map((permohonan) => {
            const {
                id,
                tukName,
                assesmentDate,
                referenceNumber,
                receiptDate,
                certPurpose: { purpose },
                approval: { isApproved },
                paymentConfirmation: { isProcessed: paymentIsProcessed },
                isProcessed,
            } = permohonan;

            return {
                id,
                tukName,
                assesmentDate,
                referenceNumber,
                receiptDate,
                purpose,
                approval:
                    isApproved === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                pembayaran:
                    paymentIsProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                processed:
                    isProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                <a
                    href="#inputclosing?id=${permohonan.id}" // <-- Use assesion.id instead of assesmentImpl.id
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
            const id = values[rowData].id;

            const data = await getPermohonanSertifikasiById(id);
            await showPopupOnClick(data);
        });
        const user = JSON.parse(localStorage.getItem('user'));
        const role = user.role.role;

        $('#dataTable tbody').ready(function () {
            const lastColumnIndex = dataTable.columns().indexes().length - 1;
            dataTable
                .columns(lastColumnIndex)
                .visible(role === UserRole.DIREKTUR || role === UserRole.ADMIN);
        });
    });
};

closePopup();
buildTable();
