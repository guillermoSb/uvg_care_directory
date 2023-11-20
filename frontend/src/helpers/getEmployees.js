
export const getEmployees = async () => {
    const url = 'http://10.124.0.4:3000/employees';
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}