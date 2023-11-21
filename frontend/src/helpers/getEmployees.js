
export const getEmployees = async () => {
    const url = 'http://164.90.148.141:3000/employees';
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}