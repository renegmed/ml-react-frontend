import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import Home from './Home';
import BankChurn from './BankChurn'; 
import HomePrice from './HomePrice'; 
import FashionItemClassifier from './FashionItemClassifier';
import TextClassifier from './TextClassifier';

import 'bootstrap/dist/css/bootstrap.min.css';

const defaultPath = process.env.REACT_APP_BASE_PATH;

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path={defaultPath} component={Home} />
                <Route path={`${defaultPath}bankchurn`} component={BankChurn} /> 
                <Route path={`${defaultPath}homeprice`} component={HomePrice} /> 
                <Route path={`${defaultPath}fashionitem`} component={FashionItemClassifier} /> 
                <Route path={`${defaultPath}textclassifier`} component={TextClassifier} /> 
                <Redirect exact from="*" to={defaultPath} />
            </Switch>   
        </App>
    </Router>,
    document.getElementById('root')
);    
 
