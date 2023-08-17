
export const deleteEmployee = async (id) => {
    const url = `http://10.24.66.19:3000/employees/${id}`;

    const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}