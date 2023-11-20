
export const getQuery = async (query) => {
    const url = `http://147.182.250.202:3000/employees/search?query=${query}`;
    const response = await fetch(url);
    const { employees } = await response.json();
    
    return employees;
}