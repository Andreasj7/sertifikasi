/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
let formCount = 0;
const listSkema = [];

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
    listSkema.push(...responseJson.data.schemas);
};

const createForm = (index) => {
    formCount = index + 1;

    const container = document.getElementById('form-container');
    const newForm = document.createElement('div');
    newForm.id = `data-form-${formCount}`;
    newForm.innerHTML = `
        <div class="form-group row">
            <label
                for="admin_lsp-${formCount}"
                class="col-sm-2 col-form-label"
                >Admin LSP</label
            >
            <div class="col-sm-10">
                <input
                    type="text"
                    class="form-control"
                    id="admin_lsp-${formCount}"
                    name="admin_lsp-${formCount}"
                    required
                />
            </div>
        </div>

        <div class="form-group row">
            <label
                for="lead_asesor-${formCount}"
                class="col-sm-2 col-form-label"
                >Lead Asesor
            </label>
            <div class="col-sm-10">
                <input
                    type="text"
                    class="form-control"
                    id="lead_asesor-${formCount}"
                    name="lead_asesor-${formCount}"
                    required
                />
            </div>
        </div>

        <div class="form-group row">
            <label
                for="nama_asesor-${formCount}"
                class="col-sm-2 col-form-label"
                >Nama Asesor
            </label>
            <div class="col-sm-10">
                <input
                    type="text"
                    class="form-control"
                    id="nama_asesor-${formCount}"
                    name="nama_asesor-${formCount}"
                    required
                />
            </div>
        </div>

        <div class="form-group row">
            <label
                for="jumlah_asesi-${formCount}"
                class="col-sm-2 col-form-label"
                >Jumlah Asesi
            </label>
            <div class="col-sm-10">
                <input
                    type="number"
                    class="form-control"
                    id="jumlah_asesi-${formCount}"
                    name="jumlah_asesi-${formCount}"
                    required
                />
            </div>
        </div>

        <div class="form-group row">
            <label
                for="jenis_skema-${formCount}"
                class="col-sm-2 col-form-label"
                >Jenis Skema
            </label>
            <div class="col-sm-10">
                <select
                    class="form-control"
                    id="jenis_skema-${formCount}"
                    name="jenis_skema-${formCount}"
                    required
                ></select>
            </div>
        </div>

        <div class="form-group row">
            <label
                for="rekomendasi_asesor-${formCount}"
                class="col-sm-2 col-form-label"
                >Rekomendasi Asesor
            </label>
            <div class="col-sm-10">
                <input
                    type="text"
                    class="form-control"
                    id="rekomendasi_asesor-${formCount}"
                    name="rekomendasi_asesor-${formCount}"
                    required
                />
            </div>
        </div>

        <hr>
    `;

    container.appendChild(newForm);
};

const buildJenisSkema = (index) => {
    const selectElement = document.getElementById(`jenis_skema-${index + 1}`);

    listSkema.forEach((skema) => {
        const option = document.createElement('option');
        option.value = skema.id;
        option.textContent = skema.schema;

        selectElement.appendChild(option);
    });
};

const buildPelaksanaanAssesmentField = async (id) => {
    const assesmentImpl = await getPelaksanaanAssesmenById(id);

    const { sptAssesor } = assesmentImpl;
    const { assesions } = assesmentImpl;
    const { certApplication } = sptAssesor;

    const tukName = document.getElementById('nama_tuk');
    const noSptAssesor = document.getElementById('no_spt_assesor');
    const tglSptAssesor = document.getElementById('tgl_spt_assesor');
    const pengerjaanSptAssesor = document.getElementById(
        'pengerjaan_spt_assesor'
    );
    const pengerjaan = document.getElementById('pengerjaan');

    const isProcessedSptAssesor = sptAssesor.isProcessed;
    const isProcessed = assesmentImpl.isProcessed;

    tukName.value = certApplication.tukName;
    noSptAssesor.value = sptAssesor.noSptAssesor;
    tglSptAssesor.value = sptAssesor.assesorDate;
    pengerjaanSptAssesor.checked = isProcessedSptAssesor;
    pengerjaan.checked = isProcessed;

    assesions.forEach((ass, index) => {
        createForm(index);
        buildJenisSkema(index);

        const lspAdmin = document.getElementById(`admin_lsp-${formCount}`);
        const leadAsesor = document.getElementById(`lead_asesor-${formCount}`);
        const namaAsesor = document.getElementById(`nama_asesor-${formCount}`);
        const jumlahAsesi = document.getElementById(
            `jumlah_asesi-${formCount}`
        );
        const jenisSkema = document.getElementById(`jenis_skema-${formCount}`);
        const rekomendasiAsesor = document.getElementById(
            `rekomendasi_asesor-${formCount}`
        );

        lspAdmin.value = ass.lspAdmin;
        leadAsesor.value = ass.assesorLead;
        namaAsesor.value = ass.assesorName;
        jumlahAsesi.value = ass.assesionNumber;
        jenisSkema.value = ass.idSchema;
        rekomendasiAsesor.value = ass.asesorRecommendation;
    });
};

const editAssesmentPelaksanaan = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const container = document.getElementById('form-container');
        const responses = Array.from(container.children).map(
            async (_, index) => {
                const data = {
                    lspAdmin: document.getElementById(`admin_lsp-${index + 1}`)
                        .value,
                    assesorLead: document.getElementById(
                        `lead_asesor-${index + 1}`
                    ).value,
                    assesorName: document.getElementById(
                        `nama_asesor-${index + 1}`
                    ).value,
                    assesionNumber: document.getElementById(
                        `jumlah_asesi-${index + 1}`
                    ).value,
                    idSchema: document.getElementById(
                        `jenis_skema-${index + 1}`
                    ).value,
                    asesorRecommendation: document.getElementById(
                        `rekomendasi_asesor-${index + 1}`
                    ).value,
                    isProcessed:
                        index === container.children.length - 1
                            ? document.getElementById('pengerjaan').checked
                            : undefined,
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
            window.location.href = '#dataasesmenpelaksanaan';
        }
    });
};

const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await getListSkema();

await buildPelaksanaanAssesmentField(id);
await editAssesmentPelaksanaan(id);
