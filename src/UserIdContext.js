import React from "react";

export const UserIdContext = React.createContext(0); // TODO: Work out context and apply it

// TODO: More useful names
export class UserIdContextProvider extends React.Component {
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

    isLoggedIn() {
        return this.state.loggedIn;
    }

    render() {
        return (
            <UserIdContext.Provider value={{
                userId: this.state.userId
            }}>
                {this.props.children}
            </UserIdContext.Provider>
        )
    }
}
