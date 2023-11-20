
export const getEmployees = async () => {
    const url = 'http://147.182.250.202:3000/employees';
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}