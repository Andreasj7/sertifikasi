/* eslint-disable no-undef */
// const getRoles = async () => {
//     const accessToken = localStorage.getItem('accessToken');
//     const response = await fetch('/api/roles', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
//     const responseJson = await response.json();
//     return responseJson.data.roles;
// };

// const buildRoles = async () => {
//     try {
//         const roles = await getRoles();
//         const selectElement = document.getElementById('roles');

//         roles.forEach((role) => {
//             const option = document.createElement('option');
//             option.value = role.id;
//             option.textContent = role.role;

//             selectElement.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Error fetching roles:', error);
//         // Handle the error (e.g., show an error message to the user)
//     }
// };

const getUserByID = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    return responseJson.data.user;
};

const buildSkemaField = async (id) => {
    const user = await getUserByID(id);

    const username = document.getElementById('username');
    const fullname = document.getElementById('fullName');

    username.value = user.username;
    fullname.value = user.fullname;
};

const editPassword = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const button = document.getElementById('submit'); // Assuming 'form' is the ID of your form

    button.addEventListener('click', async (event) => {
        event.preventDefault();

        const password = document.getElementById('password').value;

        const isConfirmed = confirm('Are you sure you want to submit?');

        if (!isConfirmed) {
            return;
        }
        const data = { id, password };
        const response = await fetch(`/api/auth/user/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#index';
        } else {
            // Menampilkan alert jika proses gagal
            alert('change pass failed. Please try again.');
        }
    });
};

const hash = window.location.hash;
const params = hash.split('?')[1];
const id = params.split('=')[1];

// buildRoles();
buildSkemaField(id);
editPassword(id);
