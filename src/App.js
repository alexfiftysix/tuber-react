import React, {Component} from 'react';
import './App.css';

import {UserSignUp} from "./UserSignUp";

class App extends Component {
    render() {
        return (
            <div className="App">
                <UserSignUp/>
            </div>
        );
    }
}

export default App;
