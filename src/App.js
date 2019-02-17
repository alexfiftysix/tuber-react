import React, {Component} from 'react';
import './App.css';
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
