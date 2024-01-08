/* eslint-disable no-undef */
import { UserRole, showPopupOnClick,closePopup } from './utils.js';

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

const getDataPemegangSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/cert-holders?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const certHolders = responsJson.data.certHolders;

    return certHolders;
};

const buildTable = () => {
    getDataPemegangSertif().then((certHolders) => {
        const values = certHolders.map((certHolder) => {
            const tukName = certHolder.certApplication?.tukName || '';
            const tujuansertif =
                certHolder.certApplication?.referenceNumber || '';
            const purpose =
                certHolder.certApplication?.certPurpose?.purpose || '';
            const date = certHolder.certApplication?.receiptDate || '';
            const paymentisProcessed =
                certHolder.certApplication.paymentConfirmation.isProcessed ||
                false;
            const certHolderisProcessed = certHolder.isProcessed || false;

            return {
                id:
                    certHolder.certApplication?.certPurpose?.approval
                        ?.SptAssesor?.AssesmentImplementation?.schema?.Assesion
                        ?.AssesmentSchedule?.assesion?.id || '',
                tukName,
                tujuansertif,
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
                    href="#inputdatapemegangsertif?id=${certHolder.id || ''}"
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
            const id = certHolders[rowData].certApplication.id;

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
