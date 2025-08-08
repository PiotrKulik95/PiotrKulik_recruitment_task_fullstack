import React, {  useState } from 'react';

import '../../css/app.css';

import Currencies from './Currencies';
import HistoricalRates from './HistoricalRates';

const Main = () => {

    const [selectedCurrency, setSelectedCurrency] = useState({});

    if(selectedCurrency.currency)
    {
        return(<div className='MainContainer'>
            <HistoricalRates 
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
            ></HistoricalRates>
        </div>)
    }

    return(
        <div className='MainContainer'>
            <Currencies  
                setSelectedCurrency={setSelectedCurrency}
            ></Currencies>
        </div>
    )
}

export default Main;