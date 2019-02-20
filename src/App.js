import React, {Component} from 'react';
import './App.css';
import {Nav} from './Nav'
import {Profile} from "./Profile";
import {Route} from "react-router-dom";
import {NewPotatoForm} from "./NewPotatoForm";
import {PotatoSelector} from "./PotatoSelector";
import {Home} from './Home'
import {UpdateProfileForm} from "./UpdateProfileForm";
import {UserSignUp} from "./UserSignUp";
import {LogIn} from "./LogIn";
import {SearchPotatoes} from "./SearchPotatoes";

class App extends Component {
    render() {
        return (
            <main className="App">
                <Nav/>
                <div className={'content'}>
                    <Route path={'/home'} component={Home}/>
                    {/*<Route path="/add_potato" component={NewPotatoForm}/>*/}
                    <Route path="/add_potato/:user_id" component={NewPotatoForm}/>
                    <Route path="/repos" component={PotatoSelector}/>
                    <Route path="/profile/:id" component={Profile}/>
                    <Route path="/profile+update/:id" component={UpdateProfileForm}/>
                    <Route path="/signup" component={UserSignUp}/>
                    <Route path="/login" component={LogIn}/>
                    <Route path="/search" component={SearchPotatoes}/>
                </div>
            </main>
        );
    }
}

export default App;
