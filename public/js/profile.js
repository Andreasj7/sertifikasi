

// Function to get the logged user information
const getLoggedUser = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        try {
            const response = await fetch('/api/auth/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseJson = await response.json();
            const user = responseJson.data.user;

            // localStorage.setItem('userId', responseJson.data.user.id);

            const username = document.getElementById('username');
            const fullName = document.getElementById('fullName');

            username.value = user.username;
            fullName.value = user.fullname;

            // Add this script to handle the click event and update the href attribute
            document.getElementById('editUserLink').addEventListener('click', function() {
            // Replace 'desired-link.html' with the actual link you want to redirect to
            window.location.href = `#editadminuser?id=${user.id}`;
            });
        } catch (error) {
            window.location.href = 'login.html';
        }
    }
};

// Call the function to get the logged user information
getLoggedUser();

