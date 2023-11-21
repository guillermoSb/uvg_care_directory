
export const deleteEmployee = async (id) => {
    const url = `http://164.90.148.141:3000/employees/${id}`;

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