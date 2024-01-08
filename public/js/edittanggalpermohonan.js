/* eslint-disable no-undef */
const getPermohonanBlanko = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/blank-applications/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    console.log(id);
    return responseJson.data.blankApplication;
};

const buildPermohonanBlanko = async (id) => {
    const blankApplication = await getPermohonanBlanko(id);

    const tukName = document.getElementById('nama_tuk');
    const tujuanSertifikasi = document.getElementById('tujuan_sertifikasi');   
    const noTglBlanko = document.getElementById('no_blanko');
    const TglBlanko = document.getElementById('tgl_blanko');
    const nobaSerahblanko = document.getElementById('no_ba_serah_blanko');
    const tglbaSerahblanko = document.getElementById('tgl_ba_serah_blanko');
    const dataSertifikasi = document.getElementById('tgl_terima_blanko');
    const pengerjaan = document.getElementById('pengerjaan');

    console.log(blankApplication)
    const { certApplication } = blankApplication;
    const { certPurpose } = certApplication;


    tukName.value = certApplication.tukName;
    tujuanSertifikasi.value = certPurpose.purpose;
    noTglBlanko.value = blankApplication.noBlank;
    TglBlanko.value = blankApplication.dateBlank;
    nobaSerahblanko.value = blankApplication.noHandover;
    tglbaSerahblanko.value = blankApplication.dateHandover;
    dataSertifikasi.value = blankApplication.blankReceiptDate;
    pengerjaan.checked = blankApplication.isProcessed;
};

const editPermohonan = async (id) => {
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
            noBlank: document.getElementById('no_blanko').value,
            dateBlank: document.getElementById('tgl_blanko').value,
            noHandover: document.getElementById('no_ba_serah_blanko').value,
            dateHandover: document.getElementById('tgl_ba_serah_blanko').value,
            blankReceiptDate: document.getElementById('tgl_terima_blanko').value,
            isProcessed: document.getElementById('pengerjaan').checked,
        };

        const response = await fetch(`/api/blank-applications/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#tanggalpermohonan';
        } else {
            // Menampilkan alert jika terjadi kegagalan
            alert('Update failed. Please try again.');
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildPermohonanBlanko(id);
await editPermohonan(id);
