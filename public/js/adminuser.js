/* eslint-disable no-undef */
const getRoles = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/roles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.roles;
};

const buildRoles = async () => {
    try {
        const roles = await getRoles();
        const selectElement = document.getElementById('roles');

        roles.forEach((role) => {
            const option = document.createElement('option');
            option.value = role.id;
            option.textContent = role.role;

            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching roles:', error);
        // Handle the error (e.g., show an error message to the user)
    }
};

const createAkun = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            fullname: document.getElementById('fullName').value,
            password: document.getElementById('password').value,
            roleId: document.getElementById('roles').value,
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });

            const responseJson = await response.json();

            if (responseJson.status === 'success') {
                window.location.href = '#adminuser';
                location.reload(true); // True parameter forces a reload from the server, not from the cache.
            } else {
                console.error('Failed to create user:', responseJson.message);

                // Check if the failure is due to an existing username
                if (responseJson.message.includes('username_exists')) {
                    alert(
                        'Username already exists. Please choose a different username.'
                    );
                } else if (responseJson.message.includes('password_length')) {
                    alert('Password must be at least 8 characters long.');
                } else {
                    // Handle other types of failures or show a generic error message
                    alert(
                        'Username already exists. Please choose a different username.'
                    );
                }
            }
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle other types of errors if needed
        }
    });
};

const getUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.users;
};

const deleteUser = async (id) => {
    const isConfirmed = confirm('Are you sure you want to delete?');

    if (!isConfirmed) {
        return;
    }

    const accessToken = localStorage.getItem('accessToken');
    await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

const buildTable = () => {
    getUser().then((users) => {
        const dataTable = $('#dataTable').DataTable();
        users.forEach((users) => {
            const usersName = users?.username || '';
            const fullName = users?.fullname || '';
            const role = users?.role.role || '';

            const data = {
                username: usersName,
                fullname: fullName,
                role: role,
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
            const id = users[index].id;
            window.location.href = `#editadminuser?id=${id}`;
            location.reload();
        });

        $('#dataTable tbody').on('click', '#delete-btn', async function () {
            const index = dataTable.row($(this).closest('tr')).index();
            const id = users[index].id;
            await deleteUser(id);
            location.reload();
        });
    });
};

buildTable();
createAkun();
buildRoles();
