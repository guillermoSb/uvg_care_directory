import { useState, useEffect } from "react";
import { getEmployees } from "../helpers/getEmployees";

export const useFetchEmployees = ( search ) => {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getEmployeesData = async () => {
        const employeeData = await getEmployees(search);
        setEmployees(employeeData);
        setLoading(false);
    }

    useEffect(() => {
        getEmployeesData(search);
    }, [search]);  
    
    return {
        employees,
        isLoading
    }
}
