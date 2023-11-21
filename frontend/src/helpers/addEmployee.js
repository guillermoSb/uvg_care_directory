
export const addEmployee = async (employee) => {
    const url = 'http://35.209.115.212/api/employees';

    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee) 
    });

    return response;
}
