/* eslint-disable no-undef */
const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await fetch('/api/auth', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refreshToken,
        }),
    });

    const responseJson = await response.json();

    if (responseJson.status === 'success') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login.html';
    }
};

document.getElementById('logout-btn').addEventListener('click', logout);
