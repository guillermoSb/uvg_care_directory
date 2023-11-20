
export const getQuery = async (query) => {
    const url = `http://10.124.0.7:3000/employees/search?query=${query}`;
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}