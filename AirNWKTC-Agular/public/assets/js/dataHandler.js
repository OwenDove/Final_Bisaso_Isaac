// Function to add a classroom
export async function addClassroom(name, date, time, instructor, details) {
    console.log(addClassroom)
    console.log(JSON.stringify({ name, date, time, instructor, details }));
    const response = await fetch('http://localhost:3000/api/classrooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, date, time, instructor, details })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to add classroom');
    }
    return data;
}
// Function to update a classroom booking
export async function updateBooking(id, updatedData) {
    const response = await fetch(`http://localhost:3000/api/classrooms/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData) // Pass updated data in the request body
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to update booking');
    }
    return data;
}



// Function to cancel a booking
export async function cancelBooking(id) {
    const response = await fetch(`http://localhost:3000/api/classrooms/cancel/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel booking');
    }
    return data;
}

// Function to delete a classroom
export async function deleteClassroom(id) {
    const response = await fetch(`http://localhost:3000/api/classrooms/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to delete classroom');
    }
    return data;
}

// Function to get all classrooms
export async function getClassrooms() {
    const response = await fetch('http://localhost:3000/api/classrooms');
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch classrooms');
    }
    return data;
}
