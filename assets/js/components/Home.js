// ./assets/js/components/Home.js

import React, {Component} from 'react';
import {Route, Redirect, Switch, Link} from 'react-router-dom';
import SetupCheck from "./SetupCheck";

import '../../css/app.css';

import Main from './Main';
import StoreCurrenciesProvider from '../store/StoreCurrenciesProvider';
import Clock from './Clock';

const Home = () => {

    return (
        <StoreCurrenciesProvider>
            <div className='AppContainer'>
                <Clock></Clock>
                <Main></Main>
            </div>
        </StoreCurrenciesProvider>
    )
}

export default Home;
