import React, { useEffect, useState } from 'react';

import '../../css/app.css';

import LoadinPage from '../pages/LoadingPage';
import ErrorPage from '../pages/ErrorPage';
import HistoricalRate from './HistoricalRate';

const HistoricalRates = ({ selectedCurrency, setSelectedCurrency }) => {

    const today = new Date().toISOString().split('T')[0];

    const [historicalRatesData, setHistoricalRatesData] = useState({
        dataIsLoading: true,
        success: false,
        data: null
    });

    const [inputDate, setInputDate] = useState(today);

    const fetchHistoricalRatesData = () => {
        fetch('/api/get-historical-rates?code='+ selectedCurrency.code + '&end_date=' + inputDate)
        .then(response => response.json())
        .then(json => {
            setHistoricalRatesData({
                storeIsLoading: false,
                success: true,
                data: json.data
            });
        })
        .catch(error => {
            setHistoricalRatesData({
                storeIsLoading: false,
                success: false,
            });
        });
    }

    useEffect(() => {
        setHistoricalRatesData({
            dataIsLoading: true,
            success: false,
            data: null
        });
        fetchHistoricalRatesData();
    }, [inputDate]);

    const handleButtonClick = (event) => {
        event.preventDefault();
        setSelectedCurrency({});
    }

    const handleChangeInputDate = (event) => {
        if(event.target.value && event.target.value <= today)
        {
            setInputDate(event.target.value);
        }
        else
        {
            setInputDate(today);
        }
    }

    if(historicalRatesData.dataIsLoading){ return(<LoadinPage></LoadinPage>); }
    if(!historicalRatesData.success || !historicalRatesData.data){ return(<ErrorPage></ErrorPage>); }

    const listOfHistoricalRates = historicalRatesData.data.map(rate => <HistoricalRate key={rate.no} {...rate}></HistoricalRate>)

    return(
        <div className='HistoricalRateContainer'>
            <div className='HistoricalRateOption'>
                <div><button onClick={handleButtonClick}>WRÓĆ</button></div>
                <div>Dane historyczne dla waluty {selectedCurrency.code} {selectedCurrency.currency}</div>
                <div><input value={inputDate} onChange={handleChangeInputDate} max={today} type='date'></input></div>
            </div>
            <div className='HistoricalRateHeader'>
                <div>Data</div>
                <div>Kurs kupna</div>
                <div>Kurs spredaży</div>
                <div>Kurs średni NBP</div>
            </div>
            {listOfHistoricalRates}
        </div>
    );
}

export default HistoricalRates;