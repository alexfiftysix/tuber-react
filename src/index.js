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
            <Route path="/" component={App}/>
            <Route path={'/home'} component={Home}/>
            <Route path="/about" component={NewPotatoForm}/>
            <Route path="/repos" component={PotatoSelector}/>
            <Route
                path="/profile/:id"
                render={(props) => <Profile {...props} profile_route={"user/1"} />}
            />
        </div>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
