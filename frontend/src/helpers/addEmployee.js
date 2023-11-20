
export const addEmployee = async (employee) => {
    const url = 'http://147.182.250.202:3000/employees';

    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee) 
    });

    return response;
}
