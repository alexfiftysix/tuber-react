import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {Card} from './Card';
import {Deck} from './Deck'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Deck/>
            </div>
        );
    }
}

export default App;
