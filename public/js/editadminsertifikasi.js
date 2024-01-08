const getSertifByID = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/cert-purposes/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    console.log(id)
    return responseJson.data.purpose;

};

const buildSertifField = async (id) => {
    const sertifid = await getSertifByID(id);

    const sertif = document.getElementById('tujuansertif');

    sertif.value = sertifid.purpose;
};

const editSertif = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const form = document.getElementById('form'); // Assuming 'form' is the ID of your form

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const purpose = document.getElementById('tujuansertif').value;

        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const response = await fetch(`/api/cert-purposes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ purpose }),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#adminsertifikasi';
        } else {
            // Menampilkan alert jika proses gagal
            alert('Skema failed. Please try again.');
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildSertifField(id);
await editSertif(id);