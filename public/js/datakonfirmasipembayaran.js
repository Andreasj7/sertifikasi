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

const getKonfirmasiPay = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(
        '/api/payment-confirmations?isProcessed=true',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const responseJson = await response.json();
    const paymentConfirmations = responseJson.data.paymentConfirmations;

    return paymentConfirmations;
};

const buildTable = () => {
    getKonfirmasiPay().then((paymentConfirmations) => {
        const dataTable = $('#dataTable').DataTable();
        paymentConfirmations.forEach((paymentConfirmation) => {
            const tukName = paymentConfirmation.certApplication?.tukName || '';
            const sertifikasi =
                paymentConfirmation.certApplication?.referenceNumber || '';
            const purpose =
                paymentConfirmation.certApplication?.certPurpose?.purpose || '';
            const schema =
                paymentConfirmation.certApplication?.sptAssesor?.assesmentImpl?.assesions
                    .map((assesion) => assesion.schema.schema)
                    .join('<br>') || '';
            const penyimpananProcessed =
                paymentConfirmation?.isProcessed || false;

            const data = {
                tukName,
                sertifikasi,
                purpose,
                schema,
                penyimpananProcessed:
                    penyimpananProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                <a
                href="#inputkonfirmasipembayaran?id=${
                    paymentConfirmation.id || ''
                }"
                class="btn btn-warning btn-sm btn-edit"
            >Edit</a>
            <a
                href="#lihatkonfirmasipembayaran?id=${
                    paymentConfirmation.id || ''
                }"
                class="btn btn-info btn-sm btn-view"
            >Lihat</a>`,
            };

            dataTable.row.add(Object.values(data));
        });

        dataTable.draw();

        const firstColumnNodes = dataTable.column(0).nodes();
        $(firstColumnNodes).addClass('expandable');
        $(firstColumnNodes).addClass('link-style');
        $('#dataTable tbody').on('click', 'tr', async function () {
            const rowData = dataTable.row(this).index();
            const id = paymentConfirmations[rowData]?.certApplication?.id;

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
