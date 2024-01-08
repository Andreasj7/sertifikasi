/* eslint-disable no-undef */
const getPemegangSertif = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/cert-holders/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.certHolder;
};

const buildPemegangSertif = async (id) => {
    const certHolder = await getPemegangSertif(id);

    const tukName = document.getElementById('nama_tuk');
    const tujuanSertifikasi = document.getElementById('tujuan_sertifikasi');
    const dataSertifikasi = document.getElementById('data_sertifikasi');
    const pengerjaan = document.getElementById('pengerjaan');

    const { certApplication } = certHolder;
    const { certPurpose } = certApplication;

    tukName.value = certApplication.tukName;
    tujuanSertifikasi.value = certPurpose.purpose;
    dataSertifikasi.value = certHolder.certHolder;
    pengerjaan.checked = certHolder.isProcessed;
};

const editDataSertif = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        // Konfirmasi sebelum mengirim data
        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const data = {
            certHolder: document.getElementById('data_sertifikasi').value,
            isProcessed: document.getElementById('pengerjaan').checked,
        };

        const response = await fetch(`/api/cert-holders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#datapemegangsertif';
        } else {
            // Menampilkan alert jika terjadi kegagalan
            alert('Update failed. Please try again.');
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildPemegangSertif(id);
await editDataSertif(id);
