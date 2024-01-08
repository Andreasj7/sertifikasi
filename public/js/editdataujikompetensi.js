/* eslint-disable no-undef */
import { formattedDate } from './utils.js';

const getSptAssesorById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/spt-assesors/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.sptAssesor;
};

const buildSptAssesorField = async (id) => {
    const sptAssesor = await getSptAssesorById(id);

    const { certApplication } = sptAssesor;
    const { certPurpose } = certApplication;

    const tukName = document.getElementById('nama_tuk');
    const tujuanSertifikasi = document.getElementById('tujuan_sertifikasi');
    const tglApproval = document.getElementById('tanggal_approval');
    const approval = document.getElementById('approval');
    const nosptassesor = document.getElementById('no_spt_assesor');
    const tglsptassesor = document.getElementById('tgl_spt_assesor');
    const pengerjaan = document.getElementById('pengerjaan');
    

    const isApproved = certApplication.approval.isApproved;
    const approvalDate = formattedDate(new Date(certApplication.approval.date));

    tukName.value = certApplication.tukName;
    tujuanSertifikasi.value = certPurpose.purpose;
    tglApproval.value = approvalDate;
    approval.checked = isApproved;
    nosptassesor.value = sptAssesor.noSptAssesor;
    tglsptassesor.value = sptAssesor.assesorDate;
    pengerjaan.checked = sptAssesor.isProcessed;
};

const inputNoTglAssesor = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const data = {
            noSptAssesor: document.getElementById('no_spt_assesor').value,
            assesorDate: document.getElementById('tgl_spt_assesor').value,
            isProcessed: document.getElementById('pengerjaan').checked === true,
        };

        const response = await fetch(`/api/spt-assesors/${id}`, {
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
            // Pindahkan jendela ke halaman setelah berhasil
            window.location.href = '#dataujikompetensi';
        } else {
            // Pindahkan jendela ke halaman jika proses gagal
            window.location.href = '#dataujikompetensi';
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildSptAssesorField(id);
await inputNoTglAssesor(id);
