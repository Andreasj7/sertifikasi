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

const getTanggalHasilUji = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/test-results?isProcessed=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const testResults = responsJson.data.testResults;

    return testResults;
};

const buildTable = () => {
    getTanggalHasilUji().then((testResults) => {
        const values = testResults.map((testResult) => {
            const tukName =
                testResult?.baSk?.assesmentSchedule?.assesion?.assesmentImpl
                    ?.sptAssesor?.certApplication?.tukName || '';
            const purpose =
                testResult?.baSk?.assesmentSchedule?.assesion?.assesmentImpl
                    ?.sptAssesor?.certApplication?.certPurpose?.purpose || '';
            const isProcessed = testResult?.baSk?.isProcessed || false;
            const schedule =
                testResult?.baSk?.assesmentSchedule?.schedule || '';
            const paymentisProcessed =
                testResult?.baSk.assesmentSchedule.assesion.assesmentImpl
                    .sptAssesor.certApplication.paymentConfirmation
                    .isProcessed || false;
            const testResultsisProcessed = testResult?.isProcessed || false;

            return {
                id: testResult?.baSk?.assesmentSchedule?.assesion?.id || '',
                tukName,
                purpose,
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
                    testResultsisProcessed === true
                        ? '<span style="color: green;">Berhasil</span>'
                        : '<span style="color: red;">Pending</span>',
                Action: `
                <a
                    href="#inputtanggalhasiluji?id=${testResult.id}"
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
                testResults[rowData].baSk.assesmentSchedule.assesion
                    .assesmentImpl.sptAssesor.certApplication.id;

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
                    role === UserRole.ADMINISTRASI || role === UserRole.ADMIN
                );
        });
    });
};

closePopup();
buildTable();
