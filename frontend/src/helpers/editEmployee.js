
export const editEmployee = async (id, employee) => {

    const url = `http://164.90.148.141:3000/employees/${id}`;
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });

    return response;
}