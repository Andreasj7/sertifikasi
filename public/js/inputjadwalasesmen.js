/* eslint-disable no-undef */
const getJadwalAssesmentById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/assesment-schedules/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.assesmentSchedule;
};

const buildJadwalAsesiField = async (id) => {
    const jadwalAsesi = await getJadwalAssesmentById(id);

    const tukName = document.getElementById('nama_tuk');
    const pengisianDataAsesi = document.getElementById('pengisian_data_asesi');
    const tglAsesi = document.getElementById('status_tanggal_asesi');
    const pengisianAsesmen = document.getElementById('pengisian_jadwal_asesmen');
    const pengerjaanAsesmen = document.getElementById('pengerjaan');

    const { assesion } = jadwalAsesi;
    const { assesmentImpl } = assesion;
    const { sptAssesor } = assesmentImpl;
    const { certApplication } = sptAssesor;

    tukName.value = certApplication.tukName;
    pengisianDataAsesi.value = assesion.isProcessed;
    tglAsesi.value = assesion.date;
    pengisianAsesmen.value = jadwalAsesi.schedule;
    pengerjaanAsesmen.checked = jadwalAsesi.isProcessed;
};

const editJadwalAsesi = async (id) => {
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
            schedule: document.getElementById('pengisian_jadwal_asesmen').value,
            isProcessed: document.getElementById('pengerjaan').checked,
        };

        const response = await fetch(`/api/assesment-schedules/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#jadwalasesment';
        } else {
            // Menampilkan alert jika terjadi kegagalan
            alert('Update failed. Please try again.');
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildJadwalAsesiField(id);
await editJadwalAsesi(id);
