import React, {Component} from 'react';
import './App.css';
import {Nav} from './Nav'
import {Profile} from "./Profile";
import {Route} from "react-router-dom";
import {NewPotatoForm} from "./NewPotatoForm";
import {PotatoSelector} from "./PotatoSelector";
import {Home} from './Home'

class App extends Component {
    render() {
        return (
            <main className="App">
                <Nav/>
                {/*<Deck rest_route="potatoes/user=1"/>*/}
                {/*<NewPotatoForm/>*/}
                {/*<PotatoSelector/>*/}
                <div className={'content'}>
                    <Route path={'/home'} component={Home}/>
                    <Route path="/add_potato" component={NewPotatoForm}/>
                    <Route path="/repos" component={PotatoSelector}/>
                    <Route
                        path="/profile/:id"
                        render={(props) => <Profile {...props} profile_route={"user/1"}/>}
                    />
                </div>
            </main>
        );
    }
}

export default App;
