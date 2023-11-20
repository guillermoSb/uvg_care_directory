
export const editEmployee = async (id, employee) => {

    const url = `http://147.182.250.202:3000/employees/${id}`;
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });

    return response;
}