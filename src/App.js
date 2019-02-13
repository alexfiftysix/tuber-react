import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {Deck} from './Deck'
import {LogIn} from "./LogIn";

class App extends Component {
    render() {
        return (
            <div className="App">
                <LogIn/>
            </div>
        );
    }
}

export default App;
