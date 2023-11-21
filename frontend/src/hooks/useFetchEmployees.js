import { useState, useEffect } from 'react';
import { getEmployees } from 'your-api-utils'; // Replace with your actual API utility function

export const useFetchEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getEmployeesData = async () => {
        try {
            const employeeData = await getEmployees();
            setEmployees(employeeData);
            setLoading(false);
        } catch (error) {
            // Handle errors appropriately, e.g., set an error state
            console.error('Error fetching employees:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployeesData();
    }, []);  // Empty dependency array to run the effect only once on mount

    return {
        employees,
        isLoading,
    };
};
