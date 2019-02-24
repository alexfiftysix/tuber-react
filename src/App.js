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
            loggedIn: false,
            userId: 0
        };

        this.isLoggedIn = this.isLoggedIn.bind();
    }

    componentDidMount() {
        // Check if player logged in
        const token = localStorage.getItem('token');
        if (!token) {
            alert("No token");
        }

        let loggedIn = false;

        const url = 'http://localhost:5000/token_decode';
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + window.btoa(token + ':unused'));

        fetch(url, {method: 'GET', headers: headers})
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            // .then(data => console.log(data));
            .then(data => this.setState({loggedIn: true, userId: data.id}));
    }

    getToken() {
        console.log(localStorage.getItem('token'));
    }

    isLoggedIn() {
        return this.state.loggedIn;
    }


    render() {
        let routes = [];
        routes.push(<Route key={'home'} path={'/home'} component={Home}/>);
        if (this.state.loggedIn) {
            routes.push(<Route key={'add_potato'} path="/add_potato/:user_id" component={NewPotatoForm}/>);
            routes.push(<Route key={'profile'} path="/profile/:id" component={Profile}/>);
            routes.push(<Route key={'profile_update'} path="/profile+update/:id" component={UpdateProfileForm}/>);
            routes.push(<Route key={'search'} path="/search" component={SearchPotatoes}/>);
        } else {
            routes.push(<Route key={'signup'} path="/signup" component={UserSignUp}/>);
            routes.push(<Route key={'login'} path="/login" render={props => <LogIn set_token={this.set_token}/>}/>);
        }


        return (
            <main className="App">
                <Nav isLoggedIn={this.state.loggedIn} id={this.state.userId}/>
                <div className={'content'}>
                    {routes}
                </div>
            </main>
        );
    }
}

export default App;
