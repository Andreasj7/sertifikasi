/* eslint-disable no-undef */
const getDataAsesiById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/assesions/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.assesion;
};

const buildDataAsesiField = async (id) => {
    const dataAsesi = await getDataAsesiById(id);

    const tukName = document.getElementById('nama_tuk');
    const tujuan = document.getElementById('tujuan_sertifikasi');
    const skema = document.getElementById('jenis_skema');
    const approval = document.getElementById('approval');
    const noSptassesor = document.getElementById('no_spt_assesor');
    const tglSptassesor = document.getElementById('tgl_spt_assesor');

    const { assesmentImpl } = dataAsesi;
    const { sptAssesor } = assesmentImpl;
    const { certApplication } = sptAssesor;

    tukName.value = certApplication.tukName;
    tujuan.value = certApplication.certPurpose.purpose;
    skema.value = dataAsesi.schema.schema;
    approval.checked = certApplication.approval.isApproved;
    noSptassesor.value = sptAssesor.noSptAssesor;
    tglSptassesor.value = sptAssesor.assesorDate;
};

const editDataAsesi = async (id) => {
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
            date: document.getElementById('data_asesi').value,
            isProcessed: document.getElementById('pengerjaan').checked,
        };

        const response = await fetch(`/api/assesions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();
        if (responseJson.status === 'success') {
            window.location.href = '#asesmenpelaksanaan';
        } else {
            // Menampilkan alert jika terjadi kegagalan
            alert('Update failed. Please try again.');
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildDataAsesiField(id);
await editDataAsesi(id);
