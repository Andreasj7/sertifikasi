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

const getSptAssesor = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/spt-assesors?isProcessed=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const sptAssesors = responsJson.data.sptAssesors;

    return sptAssesors;
};

const buildTable = () => {
    getSptAssesor().then((sptAssesors) => {
        const values = sptAssesors.map((sptAssesor) => {
            const {
                id,
                certApplication: { tukName },
                certApplication: {
                    certPurpose: { purpose },
                },
                certApplication: {
                    approval: { date },
                },
                certApplication: {
                    approval: { isApproved },
                },
                certApplication: {
                    paymentConfirmation: { isProcessed },
                },
            } = sptAssesor;
            const notglProcessed = sptAssesor?.isProcessed || false;

            const approvalDt = formattedDate(new Date(date));

            return {
                id,
                tukName,
                purpose,
                approvalDt,
                approval:
                    isApproved === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                payment:
                    isProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                processed:
                    notglProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                <a
                    href="#editdataujikompetensi?id=${sptAssesor.id}"
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
            const id = sptAssesors[rowData].certApplication.id;
            console.log(id);

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
