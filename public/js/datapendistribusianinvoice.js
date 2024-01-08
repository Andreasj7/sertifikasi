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

const getInvoice = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/invoice-dists?isProcessed=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const invoiceDists = responsJson.data.invoiceDists;

    return invoiceDists;
};

const buildTable = () => {
    getInvoice().then((invoiceDists) => {
        const values = invoiceDists.map((invoiceDist) => {
            const tukName = invoiceDist?.certApplication?.tukName || '';
            const purpose =
                invoiceDist?.certApplication?.certPurpose?.purpose || '';
            const schedule =
                invoiceDist?.certApplication?.referenceNumber ||
                '<span style="color: red;">N/A</span>';
            const paymentisProcessed =
                invoiceDist.certApplication.paymentConfirmation.isProcessed ||
                false;
            const invoiceisProcessed = invoiceDist?.isProcessed || false;

            return {
                id: invoiceDist?.id || '',
                tukName,
                purpose,
                schedule,
                paymentisProcessed:
                    paymentisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                assesprocessed:
                    invoiceisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                <a
                    href="#inputpendistribusianinvoice?id=${invoiceDist.id}"
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
            const id = invoiceDists[rowData].certApplication.id;

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
