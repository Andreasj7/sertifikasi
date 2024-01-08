/* eslint-disable no-undef */
const getLaporanHasil = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/payment-confirmations/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.paymentConfirmation;
};

const buildLaporanHasil = async (id) => {
    const paymentConfirmation = await getLaporanHasil(id);
    console.log(paymentConfirmation);

    const { certApplication } = paymentConfirmation;
    const { certPurpose } = certApplication;
    const sptAssesor = certApplication?.sptAssesor || null;
    const assesmentImpl = sptAssesor?.assesmentImpl || null;
    const assesions = assesmentImpl?.assesions || [];

    if (assesions.length) {
        const skemaContainer = document.getElementById('skema-container');
        assesions.forEach((assesion, index) => {
            if (index !== assesions.length - 2) {
                const inputElement = document.createElement('input');
                inputElement.id = `jenis_skema-${index}`;
                inputElement.type = 'text';
                inputElement.className = 'form-control';
                inputElement.name = 'jenis_skema';
                inputElement.style = 'margin-top: 16px;';
                inputElement.setAttribute('readonly', true);

                skemaContainer.appendChild(inputElement);

                inputElement.value = assesion.schema.schema;
            }
        });
        const jenisSkema = document.getElementById('jenis_skema');
        jenisSkema.value = assesions[0].schema.schema;
    }

    const tukName = document.getElementById('nama_tuk');
    const tujuanSertifikasi = document.getElementById('tujuan_sertifikasi');
    const noSurat = document.getElementById('no_surat');
    const payment = document.getElementById('payment');
    const konfirmpay = document.getElementById('gambarkonfirm');
    const berhasil = document.getElementById('berhasil');

    tukName.value = certApplication.tukName;
    tujuanSertifikasi.value = certPurpose.purpose;
    noSurat.value = certApplication.referenceNumber;
    payment.value = paymentConfirmation.date;
    konfirmpay.src = paymentConfirmation.proofUrl;
    berhasil.checked = paymentConfirmation.isProcessed;
};

const editKonfirmasiPembayaran = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const form = document.getElementById('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const formData = new FormData();
        formData.append('date', document.getElementById('payment').value);
        formData.append(
            'isProcessed',
            document.getElementById('berhasil').checked
        );

        console.log(formData);

        try {
            const updateResponse = await fetch(
                `/api/payment-confirmations/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: formData,
                }
            );

            const responseJson = await updateResponse.json();
            console.log(responseJson);

            if (responseJson.status === 'success') {
                window.location.href = '#konfirmasipembayaran';
            } else {
                alert('Print compensation failed. Please try again.');
            }
        } catch (error) {
            console.log(error);
        }
    });
};

const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildLaporanHasil(id);
await editKonfirmasiPembayaran(id);
