/* eslint-disable no-undef */
const getApprovalSertifikasiById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/minerba-dists/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.minerbaDist;
};

const buildApprovalSertifikasiField = async (id) => {
    const minerbaDist = await getApprovalSertifikasiById(id);

    const tukName = document.getElementById('nama_tuk');
    const tglUji = document.getElementById('tanggal_uji');
    const noSurat = document.getElementById('no_surat');
    const tanggalTerima = document.getElementById('tanggal_terima');
    const tujuanSertifikasi = document.getElementById('tujuan_sertifikasi');
    const noMinerba = document.getElementById('noMinerba');
    const tglMinerba = document.getElementById('tglMinerba');
    const minerba = document.getElementById('minerba');

    const isProcessed = minerbaDist.isProcessed;

    tukName.value = minerbaDist.minerbaData.certApplication.tukName;
    tglUji.value = minerbaDist.minerbaData.certApplication.assesmentDate;
    noSurat.value = minerbaDist.minerbaData.certApplication.referenceNumber;
    tanggalTerima.value = minerbaDist.minerbaData.certApplication.receiptDate;
    tujuanSertifikasi.value = minerbaDist.minerbaData.certApplication.certPurpose.purpose;
    noMinerba.value = minerbaDist.no;
    tglMinerba.value = minerbaDist.date;
    minerba.checked = isProcessed;
};

const approveSertifikasi = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();


        const no = document.getElementById('noMinerba').value;
        const date = document.getElementById('tglMinerba').value;
        const isProcessed = document.getElementById('minerba').checked;

        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const response = await fetch(`/api/minerba-dists/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ no,date,isProcessed }),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#nodantanggalminerba';
        } else {
            // Menampilkan alert jika proses gagal
            alert('Approval failed. Please try again.');
        }
    });
};

const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildApprovalSertifikasiField(id);
await approveSertifikasi(id);
