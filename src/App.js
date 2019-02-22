import React, {Component} from 'react';
import './App.css';
import {Nav} from './Nav'
import {Profile} from "./Profile";
import {Route} from "react-router-dom";
import {NewPotatoForm} from "./NewPotatoForm";
import {Home} from './Home'
import {UpdateProfileForm} from "./UpdateProfileForm";
import {UserSignUp} from "./UserSignUp";
import {LogIn} from "./LogIn";
import {SearchPotatoes} from "./SearchPotatoes";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            message: ''
        }
    }

    getToken(event) {
        event.preventDefault();
        console.log(localStorage.getItem('token'));
    }


    render() {
        return (
            <main className="App">
                <Nav/>
                <div className={'content'}>
                    <Route path={'/home'} component={Home}/>
                    <Route path="/add_potato/:user_id" component={NewPotatoForm}/>
                    <Route path="/profile/:id" component={Profile}/>
                    <Route path="/profile+update/:id" component={UpdateProfileForm}/>
                    <Route path="/signup" component={UserSignUp}/>
                    <Route path="/login" render={props => <LogIn set_token={this.set_token} />} />
                    <Route path="/search" component={SearchPotatoes}/>
                </div>
                <button onClick={this.getToken}>Get Token</button>
            </main>
        );
    }
}

export default App;
