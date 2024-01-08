function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    var showPasswordCheckbox = document.getElementById('showPassword');

    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text'; 
    } else {
        passwordInput.type = 'password'; 
    }
}


function rememberUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMeCheckbox = document.getElementById('customCheck');

    if (rememberMeCheckbox.checked) {
        localStorage.setItem('rememberedUsername', username);
        localStorage.setItem('rememberedPassword', password);
    } else {
        localStorage.removeItem('rememberedUsername');
        localStorage.removeItem('rememberedPassword');
    }
}


function populateRememberedUser() {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('customCheck');

    if (rememberedUsername) {
        usernameInput.value = rememberedUsername;
        rememberMeCheckbox.checked = true; 
    }

    if (rememberedPassword) {
        passwordInput.value = rememberedPassword;
    }
}


document.getElementById('showPassword').addEventListener('change', togglePasswordVisibility);
document.getElementById('customCheck').addEventListener('change', rememberUser);


populateRememberedUser();


/* eslint-disable no-undef */
const login = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    const responseJson = await response.json();

    if (responseJson.status === 'success') {
        const accessToken = responseJson.data.accessToken;
        const refreshToken = responseJson.data.refreshToken;

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            window.location.href = '/';
        } else {
            alert('Access token is missing in the response.');
        }
    } else {
        // Menggunakan alert untuk menampilkan pesan kesalahan
        alert('login failed. Please check your username and password.');
    }
};

document.getElementById('login-btn').addEventListener('click', login);





