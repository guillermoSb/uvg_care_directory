import { useState, useEffect } from "react";
import { getQuery } from '../helpers/search';

export const useSearch = (query) => {
	
    const [searchRes, setSearchRes] = useState([]);
    const [isLoadingSearch, setLoadingSearch] = useState(true);


	

	useEffect(() => {
			
	const geSearchData = async () => {
			console.log('searching')
        const queryResult = await getQuery(query);
        setSearchRes(queryResult);
        setLoadingSearch(false);
	}
        geSearchData();
    },[query]);  
    
    return {
        searchRes,
        isLoadingSearch
    }
}
