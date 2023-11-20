
export const deleteEmployee = async (id) => {
    const url = `http://147.182.250.202:3000/employees/${id}`;

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