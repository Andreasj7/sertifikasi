/* eslint-disable no-undef */
const getResi = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/receipts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    console.log(id);
    return responseJson.data.receipt;
};

const buildResi = async (id) => {
    const receipt = await getResi(id);

    const tukName = document.getElementById('nama_tuk');
    const tujuanSertifikasi = document.getElementById('tujuan_sertifikasi');
    const noSurat = document.getElementById('no_surat');
    const jenisSkema = document.getElementById('jenis_skema');
    const sertif = document.getElementById('resi');
    const berhasil = document.getElementById('berhasil');

    console.log(receipt);
    const { certDist } = receipt;
    const { cardDist } = certDist;
    const { packing } = cardDist;
    const { sendCommand } = packing;
    const { systemMiners } = sendCommand;
    const { printBlank } = systemMiners;
    const { printAssesion } = printBlank;
    const { assTestResult } = printAssesion;
    const { baSk } = assTestResult;
    const { assesmentSchedule } = baSk;
    const { assesion } = assesmentSchedule;
    const { assesmentImpl, schema } = assesion;
    const { sptAssesor } = assesmentImpl;
    const { certApplication } = sptAssesor;
    const { certPurpose } = certApplication;

    tukName.value = certApplication.tukName;
    tujuanSertifikasi.value = certPurpose.purpose;
    noSurat.value = certApplication.referenceNumber;
    jenisSkema.value = schema.schema;
    sertif.value = receipt.date;
    berhasil.checked = receipt.isProcessed;
};

const editCert = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const data = {
            date: document.getElementById('resi').value,
            isProcessed: document.getElementById('berhasil').checked,
        };

        const response = await fetch(`/api/receipts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();
        console.log(responseJson);

        if (responseJson.status === 'success') {
            window.location.href = '#resipengiriman';
        } else {
            // Menampilkan alert jika gagal
            alert('Print compensation failed. Please try again.');
        }
    });
};

const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildResi(id);
await editCert(id);
