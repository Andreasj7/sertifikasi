/* eslint-disable no-undef */
const getInvoiceById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/invoice-dists/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    console.log(id)
    return responseJson.data.invoiceDist;
};

const buildInvoiceField = async (id) => {
    const invoiceDist = await getInvoiceById(id);

    const tukName = document.getElementById('nama_tuk');
    const tujuanSertifikasi = document.getElementById('tujua_sertif');
    const nomorSuratPermohonan = document.getElementById('nomor_surat_permohonan');
    const pendistribusianInvoice = document.getElementById('pendistribusian_invoice');
    const invoiceisProcessed = document.getElementById('berhasil');

    console.log(invoiceDist)
    const { certApplication } = invoiceDist;
    const { certPurpose } = certApplication;

    tukName.value = certApplication.tukName;
    tujuanSertifikasi.value = certPurpose.purpose;
    nomorSuratPermohonan.value = certApplication.referenceNumber;
    pendistribusianInvoice.value = invoiceDist.invoiceDate;
    invoiceisProcessed.value = invoiceDist.isProcessed;
};

const editInvoice = async (id) => {
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
            invoiceDate: document.getElementById('pendistribusian_invoice').value,
            isProcessed: document.getElementById('berhasil')
                .checked,
        };

        const response = await fetch(`/api/invoice-dists/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#pendistribusianinvoice';
        } else {
            // Menampilkan alert jika terjadi kegagalan
            alert('Update failed. Please try again.');
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildInvoiceField(id);
await editInvoice(id);
