/* eslint-disable no-undef */
const getSkema = async () => {
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

const buildSkemaSertif = async () => {
    const skemasertif = await getSkema();
    const selectElement = document.getElementById('skemaType');

    skemasertif.forEach((skema) => {
        const option = document.createElement('option');
        option.value = skema.id;
        option.textContent = skema.schema;

        selectElement.appendChild(option);
    });
};

const createPermohonan = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {
            schema: document.getElementById('skemaName').value,
        };

        const response = await fetch('/api/schemas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#adminskema';
            location.reload(); // True parameter memaksa memuat ulang dari server, bukan dari cache.
        }
    });
};

const deleteSkema = async (id) => {
    const isConfirmed = confirm('Are you sure you want to delete?');

    if (!isConfirmed) {
        return;
    }

    const accessToken = localStorage.getItem('accessToken');
    await fetch(`/api/schemas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

const buildTable = () => {
    getSkema().then((schemas) => {
        const dataTable = $('#dataTable').DataTable();
        schemas.forEach((schema) => {
            const schemaName = schema?.schema || '';

            const data = {
                schema: schemaName,
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
            const id = schemas[index].id;
            window.location.href = `#editadminskema?id=${id}`;
            location.reload();
        });

        $('#dataTable tbody').on('click', '#delete-btn', async function () {
            const index = dataTable.row($(this).closest('tr')).index();
            const id = schemas[index].id;
            await deleteSkema(id);
            location.reload();
        });
    });
};

buildTable();
buildSkemaSertif();
createPermohonan();
