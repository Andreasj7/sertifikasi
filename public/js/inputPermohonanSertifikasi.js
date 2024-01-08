/* eslint-disable no-undef */
const getTujuanSertifikasi = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/cert-purposes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.purposes;
};

const buildTujuanSertifikasi = async () => {
    const tujuanSertifikasi = await getTujuanSertifikasi();
    const selectElement = document.getElementById('tujuan_sertifikasi');

    tujuanSertifikasi.forEach((tujuan) => {
        const option = document.createElement('option');
        option.value = tujuan.id;
        option.textContent = tujuan.purpose;

        selectElement.appendChild(option);
    });
};

const createPermohonan = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {
            tukName: document.getElementById('nama_tuk').value,
            assesmentDate: document.getElementById('tanggal_uji').value,
            referenceNumber: document.getElementById('no_surat').value,
            receiptDate: document.getElementById('tanggal_terima').value,
            idCertPurpose: document.getElementById('tujuan_sertifikasi').value,
            isProcessed: false,
        };

        const response = await fetch('/api/cert-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#permohonansertfikasi';
        }
    });
};

buildTujuanSertifikasi();
createPermohonan();
