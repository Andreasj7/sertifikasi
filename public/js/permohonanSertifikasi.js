/* eslint-disable no-undef */
import { UserRole, closePopup, showPopupOnClick } from './utils.js';

const getAccess = () => {
    const tambahBtn = document.getElementById('tambah-sertifikasi');
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user.role.role;

    if (role === UserRole.ADMIN || role === UserRole.SERTIFIKASI) {
        tambahBtn.style.visibility = 'visible';
    } else {
        tambahBtn.style.visibility = 'hidden';
    }
};

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
    const response = await fetch(
        '/api/cert-applications?isProcessed=false&isThreeMonth=true',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
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
    });
};

closePopup();
buildTable();
getAccess();
