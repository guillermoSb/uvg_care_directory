
export const addEmployee = async (employee) => {
    const url = 'http://143.198.129.148:3000/employees';

    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee) 
    });

    return response;
}
