import React, { createContext, useEffect, useState } from 'react';

export const StoreCurrenciesContext = createContext(null);

const StoreCurrenciesProvider = ({children}) => {

    const [currencies, setCurrencies] = useState({
        storeIsLoading: true,
        success: false,
        data: null,
    });

    let isMounted = true;

    const fetchCurrenciesData = () => {
        fetch('/api/get-currencies')
        .then(response => response.json())
        .then(json => {
            if(isMounted)
            {
                setCurrencies({
                    storeIsLoading: false,
                    success: true,
                    data: json.data
                });
            }
        })
        .catch(error => {
            if(isMounted)
            {
                setCurrencies({
                    storeIsLoading: false,
                    success: false,
                });
            }
        });
    }

    useEffect(() => {
        fetchCurrenciesData();

        return () => {
            isMounted = false;
        }
    }, []);

    return(
        <StoreCurrenciesContext.Provider value={{currencies, fetchCurrenciesData}}>
            {children}
        </StoreCurrenciesContext.Provider>
    );
}

export default StoreCurrenciesProvider;