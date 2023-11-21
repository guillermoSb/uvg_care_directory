
export const editEmployee = async (id, employee) => {

    const url = `http://143.198.129.148:3000/employees/${id}`;
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });

    return response;
}