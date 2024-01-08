/* eslint-disable no-undef */
const getCetakFoto = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/print-assesions/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    console.log(id)
    return responseJson.data.printAssesion;

};

const buildCetakFoto = async (id) => {
    const printAssesion = await getCetakFoto(id);

    const tukName = document.getElementById('nama_tuk');
    const tujuanSertifikasi = document.getElementById('tujuan_sertifikasi');   
    const noSurat = document.getElementById('no_surat');
    const jenisSkema = document.getElementById('jenis_skema');
    const cetakFoto = document.getElementById('cetak_foto');
    const berhasil = document.getElementById('berhasil');

    console.log(printAssesion)
    const { assTestResult } = printAssesion;
    const { baSk } = assTestResult;
    const { assesmentSchedule } = baSk;
    const { assesion } = assesmentSchedule;
    const { assesmentImpl,schema } = assesion;
    const { sptAssesor } = assesmentImpl;
    const { certApplication } = sptAssesor;
    const { certPurpose } = certApplication;

    tukName.value = certApplication.tukName;
    tujuanSertifikasi.value = certPurpose.purpose;
    noSurat.value = certApplication.referenceNumber;
    jenisSkema.value = schema.schema;
    cetakFoto.value = printAssesion.date;
    berhasil.checked = printAssesion.isProcessed;
};

const editCetakFoto = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    // Mengambil data awal dari server
    const fetchDataResponse = await fetch(`/api/print-assesions/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const initialData = await fetchDataResponse.json();

    // Mengisi formulir dengan data awal
    document.getElementById('cetak_foto').value = initialData.date;
    document.getElementById('berhasil').checked = initialData.isProcessed;

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        // Konfirmasi sebelum mengirim data
        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const updatedData = {
            date: document.getElementById('cetak_foto').value,
            isProcessed: document.getElementById('berhasil').checked,
        };

        const response = await fetch(`/api/print-assesions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(updatedData),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#cetakfoto';
        } else {
            // Menampilkan alert jika terjadi kegagalan
            alert('Update failed. Please try again.');
        }
    });
};



const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildCetakFoto(id);
await editCetakFoto(id);
