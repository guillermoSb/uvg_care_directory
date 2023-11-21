
export const getEmployees = async () => {
    const url = 'http://143.198.129.148:3000/employees';
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}