/* eslint-disable no-undef */
const getSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/cert-purposes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.purposes;
};

const buildSertif = async () => {
    const tujuansertif = await getSertif();
    const selectElement = document.getElementById('sertifType');

    tujuansertif.forEach((sertif) => {
        const option = document.createElement('option');
        option.value = sertif.id;
        option.textContent = sertif.purpose;

        selectElement.appendChild(option);
    });
};

const createSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {
            purpose: document.getElementById('sertifname').value,
        };

        const response = await fetch('/api/cert-purposes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#adminsertifikasi';
            location.reload(true); // True parameter memaksa memuat ulang dari server, bukan dari cache.
        }
    });
};

const deleteSertif = async (id) => {
    const isConfirmed = confirm('Are you sure you want to delete?');

    if (!isConfirmed) {
        return;
    }

    const accessToken = localStorage.getItem('accessToken');
    await fetch(`/api/cert-purposes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

const buildTable = () => {
    getSertif().then((purposes) => {
        const dataTable = $('#dataTable').DataTable();
        purposes.forEach((purpose) => {
            const purposeName = purpose?.purpose || '';

            const data = {
                purpose: purposeName,
                action: `
                <div>
                    <a
                        id="edit-btn"
                        class="btn btn-warning btn-sm btn-edit"
                    >
                        Edit
                    </a>
                    <a
                        id="delete-btn"
                        class="btn btn-danger btn-sm btn-edit"
                    >
                        Delete
                    </a>
                </div>`,
            };
            dataTable.row.add(Object.values(data));
        });

        // Draw the table to reflect changes
        dataTable.draw();

        $('#dataTable tbody').on('click', '#edit-btn', function () {
            const index = dataTable.row($(this).closest('tr')).index();
            const id = purposes[index].id;
            window.location.href = `#editadminsertifikasi?id=${id}`;
            location.reload();
        });

        $('#dataTable tbody').on('click', '#delete-btn', async function () {
            const index = dataTable.row($(this).closest('tr')).index();
            const id = purposes[index].id;
            await deleteSertif(id);
            location.reload();
        });
    });
};


buildTable();
buildSertif();
createSertif();
