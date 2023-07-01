
export const addEmployee = async (employee) => {
    const url = 'http://localhost:3000/employees';

    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee) 
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}
