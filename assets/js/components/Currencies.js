import React, { useContext } from 'react';

import { StoreCurrenciesContext } from '../store/StoreCurrenciesProvider';

import '../../css/app.css';

import LoadinPage from '../pages/LoadingPage';
import ErrorPage from '../pages/ErrorPage';
import Currency from './Currency';

const Currencies = ({setSelectedCurrency}) => {

    const { currencies } = useContext(StoreCurrenciesContext);

    if(currencies.storeIsLoading){ return(<LoadinPage></LoadinPage>); }
    if(!currencies.success || !currencies.data){ return(<ErrorPage></ErrorPage>); }

    const listOfCurrencies = currencies.data.rates.map(rate => <Currency key={rate.code} {...rate} setSelectedCurrency={setSelectedCurrency}></Currency>)

    return(
        <div className='CurrenciesContainer'>
            <div>Dane z dania: {currencies.data.effectiveDate}</div>
            <div className='CurrencyHeader'>
                <div>Waluta</div>
                <div>Kurs kupna</div>
                <div>Kurs spredaży</div>
                <div>Kurs średni NBP</div>
            </div>
            {listOfCurrencies }
        </div>
    );
}

export default Currencies;