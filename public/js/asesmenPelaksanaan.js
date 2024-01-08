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

const getAssesmenPelaksanaan = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/assesment-impls?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const assesmentImpls = responsJson.data.assesmentImpls;

    return assesmentImpls;
};

const buildTable = () => {
    getAssesmenPelaksanaan().then((assesmentImpls) => {
        const values = assesmentImpls.map((assesmentImpl) => {
            const { sptAssesor } = assesmentImpl;
            const {
                certApplication: { tukName },
                certApplication: {
                    certPurpose: { purpose },
                },
                noSptAssesor,
                assesorDate,
                isProcessed: sptIsProcessed,
            } = sptAssesor;

            const { id, isProcessed } = assesmentImpl;
            const paymentProcessed =
                assesmentImpl?.sptAssesor.certApplication.paymentConfirmation
                    .isProcessed || false;

            const assesorDt = formattedDate(new Date(assesorDate));

            return {
                id,
                tukName,
                purpose,
                sptProcessed:
                    sptIsProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                noDateSptAssesor:
                    noSptAssesor !== null || assesorDate !== null
                        ? `No. ${noSptAssesor} Tgl ${assesorDt}`
                        : '-',
                paymentProcessed:
                    paymentProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                processed:
                    isProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                <a
                    href="#inputasesor?id=${assesmentImpl.id}"
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
            const id = assesmentImpls[rowData].sptAssesor.certApplication.id;
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
                    role === UserRole.ADMIN_UJI || role === UserRole.ADMIN
                );
        });
    });
};

closePopup();
buildTable();
