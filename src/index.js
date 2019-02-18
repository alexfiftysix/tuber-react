import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from "react-router-dom";
import {NewPotatoForm} from './NewPotatoForm';
import {PotatoSelector} from './PotatoSelector';
import {Home} from './Home'
import {Profile} from './Profile';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <App></App>
        </div>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
