import { useState, useEffect } from "react";
import { getEmployees } from "../helpers/getEmployees";

export const useFetchEmployees = () => {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getEmployeesData = async () => {
        const employeeData = await getEmployees();
        setEmployees(employeeData);
        setLoading(false);
    }

    useEffect(() => {
        getEmployeesData();
    }, [employees]);  
    
    return {
        employees,
        isLoading
    }
}
