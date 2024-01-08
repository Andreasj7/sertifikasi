/* eslint-disable no-undef */

let skemaCount = 0;

const getListSkema = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/schemas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.schemas;
};

const getPelaksanaanAssesmenById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/assesment-impls/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.assesmentImpl;
};

const buildJenisSkema = async () => {
    const listSkema = await getListSkema();
    if (skemaCount) {
        const selectElement = document.getElementById(
            `jenis_skema${skemaCount}`
        );

        listSkema.forEach((skema) => {
            const option = document.createElement('option');
            option.value = skema.id;
            option.textContent = skema.schema;

            selectElement.appendChild(option);
        });
    }
};

const buildPelaksanaanAssesmenField = async (id) => {
    const pelaksanaanAssesment = await getPelaksanaanAssesmenById(id);

    const tukName = document.getElementById('nama_tuk');
    const noSptAssesor = document.getElementById('no_spt_assesor');
    const tglSptAssesor = document.getElementById('tgl_spt_assesor');
    const pengerjaan = document.getElementById('pengerjaan');

    const { sptAssesor } = pelaksanaanAssesment;
    const { certApplication } = sptAssesor;

    const isProcessed = pelaksanaanAssesment.isProcessed;

    tukName.value = certApplication.tukName;
    noSptAssesor.value = sptAssesor.noSptAssesor;
    tglSptAssesor.value = sptAssesor.assesorDate;
    pengerjaan.checked = isProcessed;
};

const editPelaksanaanAssesmen = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        // Konfirmasi sebelum mengirim data
        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const skemaContainer = document.getElementById('skemaContainer');
        const responses = Array.from(skemaContainer.children).map(
            async (_, index) => {
                const data = {
                    lspAdmin: document.getElementById('admin_lsp').value,
                    assesorLead: document.getElementById(
                        `lead_asesor${index + 1}`
                    ).value,
                    assesorName: document.getElementById(
                        `nama_asesor${index + 1}`
                    ).value,
                    assesionNumber: Number(
                        document.getElementById(`jumlah_asesi${index + 1}`)
                            .value
                    ),
                    idSchema: document.getElementById(`jenis_skema${index + 1}`)
                        .value,
                    asesorRecommendation: document.getElementById(
                        `rekomendasi_asesor${index + 1}`
                    ).value,
                    isProcessed:
                        document.getElementById('pengerjaan_asesor').checked,
                };

                const response = await fetch(`/api/assesment-impls/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(data),
                });

                const responseJson = await response.json();
                return responseJson;
            }
        );

        const responseArray = await Promise.all(responses);
        const lastResponse = responseArray[responseArray.length - 1];

        if (lastResponse.status === 'success') {
            window.location.href = '#asesmenpelaksanaan';
        } else {
            // Menampilkan alert jika terjadi kegagalan
            alert('Update failed. Please try again.');
        }
    });
};


const addForm = () => {
    skemaCount++;
    console.log('Fungsi addForm dipanggil');

    const skemaContainer = document.getElementById('skemaContainer');

    // Tambahkan formulir skema
    const skemaForm = document.createElement('div');
    skemaForm.id = 'skema-form';
    skemaForm.className = 'skema-container';
    skemaForm.innerHTML = `
            <div class="form-group row">
                <label for="lead_asesor${skemaCount}" class="col-sm-2 col-form-label">Lead Asesor </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="lead_asesor${skemaCount}" name="lead_asesor${skemaCount}" required>
                </div>
            </div>

            <div class="form-group row">
                <label for="nama_asesor${skemaCount}" class="col-sm-2 col-form-label">Nama Asesor </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="nama_asesor${skemaCount}" name="nama_asesor${skemaCount}" required>
                </div>
            </div>

            <div class="form-group row">
                <label for="jumlah_asesi${skemaCount}" class="col-sm-2 col-form-label">Jumlah Asesi </label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="jumlah_asesi${skemaCount}" name="jumlah_asesi${skemaCount}" required>
                </div>
            </div>

            <div class="form-group row">
                <label for="jenis_skema${skemaCount}" class="col-sm-2 col-form-label">Jenis Skema </label>
                <div class="col-sm-10">
                    <select class="form-control" id="jenis_skema${skemaCount}" name="jenis_skema${skemaCount}" required>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="rekomendasi_asesor${skemaCount}" class="col-sm-2 col-form-label">Rekomendasi Asesor </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="rekomendasi_asesor${skemaCount}" name="rekomendasi_asesor${skemaCount}" required>
                </div>
            </div>
        `;
    skemaContainer.appendChild(skemaForm);
    buildJenisSkema();
};

const deleteForm = () => {
    const skemaContainer = document.getElementById('skemaContainer');

    const removedChild = skemaContainer.lastElementChild;

    if (removedChild) {
        skemaContainer.removeChild(removedChild);
    }
};

const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildPelaksanaanAssesmenField(id);
await editPelaksanaanAssesmen(id);

const tambahSkemaBtn = document.getElementById('tambah-skema-btn');
tambahSkemaBtn.addEventListener('click', addForm);

const hapusSkemaBtn = document.getElementById('hapus-skema-btn');
hapusSkemaBtn.addEventListener('click', deleteForm);
