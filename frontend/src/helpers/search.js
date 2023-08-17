
export const getQuery = async (query) => {
    const url = `http://10.24.66.19:3000/employees/search?query=${query}`;
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}