import React, { useState, useEffect, useContext } from 'react';

import { StoreCurrenciesContext } from '../store/StoreCurrenciesProvider';

function Clock() {
  const refreshTime = '12:00:30';

  const [time, setTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { fetchCurrenciesData } = useContext(StoreCurrenciesContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if(timeAsString === refreshTime && isRefreshing === false)
    {
      setIsRefreshing(true);
      fetchCurrenciesData();
    }
    else
    {
      setIsRefreshing(false);
    }
  }, [time]);

  const month = time.getMonth() + 1;
  const day = time.getDate();
  const timeAsString = time.toLocaleTimeString();
 
  return (
    <div className='Clock'>
        { time.getFullYear() }-{ month < 9 ? '0' + month : month }-{ day < 9 ? '0' + day : day } { timeAsString }
    </div>
  );
}

export default Clock;