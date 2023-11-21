
export const getQuery = async (query) => {
    const url = `http://35.209.115.212/api/employees/search?query=${query}`;
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}