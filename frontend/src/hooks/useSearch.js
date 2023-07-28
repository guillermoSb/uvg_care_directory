import { useState, useEffect } from "react";
import { getQuery } from '../helpers/search';

export const useSearch = (query) => {

    const [searchRes, setSearchRes] = useState([]);
    const [isLoadingSearch, setLoadingSearch] = useState(true);


    const geSearchData = async () => {
        const queryResult = await getQuery(query);
        setSearchRes(queryResult);
        setLoadingSearch(false);
    }

    useEffect(() => {
        geSearchData();
    }, [query]);  
    
    return {
        searchRes,
        isLoadingSearch
    }
}
