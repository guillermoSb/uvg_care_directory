
export const editEmployee = async (id, employee) => {

    const url = `http://35.209.115.212/api/employees/${id}`;
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });

    return response;
}