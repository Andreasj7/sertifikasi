/* eslint-disable no-undef */
const getBaSkById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/ba-sk/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.baSk;
};

const buildBaSkField = async (id) => {
    const baSk = await getBaSkById(id);

    const tukName = document.getElementById('nama_tuk');
    const jadwalAssesment = document.getElementById('jadwal_assessment_bnsp');
    const notglBa = document.getElementById('no_tgl_ba');
    const notglSk = document.getElementById('no_tgl_sk');
    const datePleno = document.getElementById('tgl_pleno_sk');
    const dateBa = document.getElementById('tgl_pembuatan_ba');
    const dateSk = document.getElementById('tgl_pembuatan_sk');
    const pengerjaan = document.getElementById('pengisian_ba_sk');

    const { assesmentSchedule } = baSk;
    const { assesion } = assesmentSchedule;
    const { assesmentImpl } = assesion;
    const { sptAssesor } = assesmentImpl;
    const { certApplication } = sptAssesor;

    tukName.value = certApplication.tukName;
    jadwalAssesment.value = assesmentSchedule.schedule;
    notglBa.value = baSk.noBaDate;
    notglSk.value = baSk.noSkDate;
    datePleno.value = baSk.plenoDate;
    dateBa.value = baSk.baDate;
    dateSk.value = baSk.skDate;
    pengerjaan.checked = baSk.isProcessed;
};

const editBaSk = async (id) => {
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
            noSkDate: document.getElementById('no_tgl_ba').value,
            noBaDate: document.getElementById('no_tgl_sk').value,
            plenoDate: document.getElementById('tgl_pleno_sk').value,
            baDate: document.getElementById('tgl_pembuatan_ba').value,
            skDate: document.getElementById('tgl_pembuatan_sk').value,
            isProcessed: document.getElementById('pengisian_ba_sk').checked,
        };

        const response = await fetch(`/api/ba-sk/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#pengisianbadansk';
        } else {
            window.location.href = '#pengisianbadansk';
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildBaSkField(id);
await editBaSk(id);
