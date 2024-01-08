const getSkemaByID = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/schemas/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    console.log(id)
    return responseJson.data.schema;

};

const buildSkemaField = async (id) => {
    const skemaid = await getSkemaByID(id);

    const skema = document.getElementById('skemaName');

    skema.value = skemaid.schema;
};

const editSkema = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const form = document.getElementById('form'); // Assuming 'form' is the ID of your form

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const schema = document.getElementById('skemaName').value;

        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const response = await fetch(`/api/schemas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ schema }),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#adminskema';
        } else {
            // Menampilkan alert jika proses gagal
            alert('Skema Sudah Ada.');
        }
    });
};


const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

await buildSkemaField(id);
await editSkema(id);