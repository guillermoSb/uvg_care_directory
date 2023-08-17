
export const getEmployees = async () => {
    const url = 'http://10.24.66.19:3000/employees';
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}