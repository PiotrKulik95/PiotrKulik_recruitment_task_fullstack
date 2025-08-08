import React from 'react';

import '../../css/app.css';

const Currency = ({ code, currency, mid, bid, ask, setSelectedCurrency }) => {
    return(
        <div className='Currency' onClick={() => {
            setSelectedCurrency({code, currency});
        }}>
            <div>{code?code:'Brak danych'}</div>
            <div>{bid?bid:'Nie prowadzimy kupna'}</div>
            <div>{ask?ask:'Nie prowadzimy sprzedaży'}</div>
            <div>{mid?mid:'Brak danych z NBP'}</div>
        </div>
    );
}

export default Currency;