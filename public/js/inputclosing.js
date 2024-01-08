/* eslint-disable no-undef */
const getApprovalSertifikasiById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/cert-applications/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.certApplication;
};

const buildApprovalSertifikasiField = async (id) => {
    const approvalSertifikasi = await getApprovalSertifikasiById(id);

    const tukName = document.getElementById('nama_tuk');
    const tglUji = document.getElementById('tanggal_uji');
    const noSurat = document.getElementById('no_surat');
    const tanggalTerima = document.getElementById('tanggal_terima');
    const tujuanSertifikasi = document.getElementById('tujuan_sertifikasi');
    const closing = document.getElementById('closing');

    const isProcessed = approvalSertifikasi.approval.isProcessed;

    tukName.value = approvalSertifikasi.tukName;
    tglUji.value = approvalSertifikasi.assesmentDate;
    noSurat.value = approvalSertifikasi.referenceNumber;
    tanggalTerima.value = approvalSertifikasi.receiptDate;
    tujuanSertifikasi.value = approvalSertifikasi.certPurpose.purpose;
    closing.checked = isProcessed;
};

const approveSertifikasi = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const isProcessed = document.getElementById('closing').checked;

        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const response = await fetch(`/api/cert-applications/${id}/finish`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ isProcessed }),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#closing';
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
