
export const getQuery = async (query) => {
    const url = `http://164.90.148.141:3000/employees/search?query=${query}`;
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}