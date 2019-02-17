import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {UserSignUp} from "./UserSignUp";
import {NewPotatoForm} from "./NewPotatoForm";
import {Deck} from "./Deck";
import {PotatoSelector} from "./PotatoSelector";
import {Nav} from './Nav'

class App extends Component {
    render() {
        return (
            <main className="App">
                <Nav/>
                {/*<Deck rest_route="potatoes/user=1"/>*/}
                {/*<NewPotatoForm/>*/}
                {/*<PotatoSelector/>*/}

            </main>
        );
    }
}

export default App;
