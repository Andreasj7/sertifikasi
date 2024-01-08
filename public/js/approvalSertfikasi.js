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

const getApprovalSertifikasi = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(
        '/api/cert-applications?isApproved=false&isThreeMonth=true',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const responsJson = await response.json();
    const approvalSertifikasi = responsJson.data.certApplications;

    return approvalSertifikasi;
};

const buildTable = () => {
    getApprovalSertifikasi().then((approvalSertifikasi) => {
        const values = approvalSertifikasi.map((permohonan) => {
            const {
                id,
                tukName,
                assesmentDate,
                referenceNumber,
                receiptDate,
                certPurpose: { purpose },
                paymentConfirmation: { isProcessed },
                approval: { isApproved },
            } = permohonan;

            return {
                id,
                tukName,
                assesmentDate,
                referenceNumber,
                receiptDate,
                purpose,
                isProcessed:
                    isProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                approval:
                    isApproved === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                    <a
                        href='#inputapproval?id=${permohonan.id}'
                        class='btn btn-warning btn-sm btn-edit'
                    >
                        Edit
                    </a>`,
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
                .visible(role === UserRole.IT || role === UserRole.ADMIN);
        });
    });
};

closePopup();
buildTable();
