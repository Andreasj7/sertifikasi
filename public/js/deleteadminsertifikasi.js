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

const deleteSertif = async (id) => {
    const accessToken = localStorage.getItem('accessToken');

    const isConfirmed = confirm('Are you sure you want to delete?');

    if (!isConfirmed) {
        return;
    }

    try {
        const response = await fetch(`/api/cert-purposes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const responseJson = await response.json();

        if (responseJson.status === 'success') {
            window.location.href = '#adminsertifikasi';
        } else {
            // Display an alert if the delete process fails
            alert('Delete operation failed. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting certificate purpose:', error);
        // Handle the error (e.g., show an error message to the user)
        alert('Error deleting certificate purpose. Please try again.');
    }
    console.log(`Deleting item with ID: ${id}`);
};

deleteSertif ();