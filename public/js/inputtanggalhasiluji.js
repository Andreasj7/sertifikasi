/* eslint-disable no-undef */
const getHasilUjiById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/test-results/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.testResult;
};

const buildHasilUjiField = async (id) => {
    const hasilUji = await getHasilUjiById(id);

    const tukName = document.getElementById('nama_tuk');
    const jadwalAssesment = document.getElementById('jadwal_assessment_bnsp');
    const dateHasilUji = document.getElementById('tgl_kirim_surat');
    const pengerjaan = document.getElementById('berhasil_kirim_surat');

    const { baSk } = hasilUji;
    const { assesmentSchedule } = baSk;
    const { assesion } = assesmentSchedule;
    const { assesmentImpl } = assesion;
    const { sptAssesor } = assesmentImpl;
    const { certApplication } = sptAssesor;

    tukName.value = certApplication.tukName;
    jadwalAssesment.value = assesmentSchedule.schedule;
    dateHasilUji.value = hasilUji.date;
    pengerjaan.checked = hasilUji.isProcessed;
};

const editHasilUji = async (id) => {
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
            date: document.getElementById('tgl_kirim_surat').value,
            isProcessed: document.getElementById('berhasil_kirim_surat')
                .checked,
        };

        const response = await fetch(`/api/test-results/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#tanggalhasiluji';
        } else {
            // Menampilkan alert jika terjadi kegagalan
            alert('Update failed. Please try again.');
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildHasilUjiField(id);
await editHasilUji(id);
