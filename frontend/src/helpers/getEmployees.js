
export const getEmployees = async () => {
    const url = 'http://35.209.115.212/api/employees';
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}