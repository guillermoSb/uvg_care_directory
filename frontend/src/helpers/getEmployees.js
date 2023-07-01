
export const getEmployees = async () => {
    const url = 'http://localhost:3000/employees';
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}