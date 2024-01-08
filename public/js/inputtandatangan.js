/* eslint-disable no-undef */
const getTandaTangan = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/directur-signs/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    console.log(id)
    return responseJson.data.directurSign;

};

const buildTandaTangan = async (id) => {
    const directurSign = await getTandaTangan(id);

    const tukName = document.getElementById('nama_tuk');
    const tujuanSertifikasi = document.getElementById('tujuan_sertifikasi');   
    const noSurat = document.getElementById('no_surat');
    const jenisSkema = document.getElementById('jenis_skema');
    const tandaTangan = document.getElementById('tanda_tangan');
    const berhasil = document.getElementById('berhasil');

    console.log(directurSign)
    const { printBlank } = directurSign;
    const { printAssesion } = printBlank;
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
    tandaTangan.value = directurSign.date;
    berhasil.checked = directurSign.isProcessed;
};

const editTandaTangan = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        // Menampilkan konfirmasi sebelum melakukan submit
        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return; // Jika pengguna membatalkan, hentikan eksekusi
        }

        const data = {
            date: document.getElementById('tanda_tangan').value,
            isProcessed: document.getElementById('berhasil').checked,
        };

        const response = await fetch(`/api/directur-signs/${id}`, {
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
            window.location.href = '#tandatangan';
        } else {
            // Menampilkan alert jika gagal
            alert('Print compensation failed. Please try again.');
        }
    });
};



const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildTandaTangan(id);
await editTandaTangan(id);
