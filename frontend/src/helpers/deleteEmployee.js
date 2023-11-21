
export const deleteEmployee = async (id) => {
    const url = `http://35.209.115.212/api/employees/${id}`;

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