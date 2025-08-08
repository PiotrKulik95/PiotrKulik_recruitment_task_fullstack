import React from 'react';

import '../../css/app.css';

const HistoricalRate = ({ effectiveDate, mid, bid, ask }) => {
    return(
        <div className='HistoricalRate'>
            <div>{effectiveDate?effectiveDate:'Brak danych'}</div>
            <div>{bid?bid:'Nie prowadzimy kupna'}</div>
            <div>{ask?ask:'Nie prowadzimy sprzedaży'}</div>
            <div>{mid?mid:'Brak danych z NBP'}</div>
        </div>
    );
}

export default HistoricalRate;