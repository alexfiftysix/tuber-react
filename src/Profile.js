import React from 'react'
import {Deck} from './Deck';

// Displays information about an individual profile (Name, locaion) and information on all potatoes they're selling
export class Profile extends React.Component {
    // props:
    //   profile_id: int: profile number of current user

    // TODO: Sending endless requests

    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            cards: null
        };
    }

    componentDidMount() {
        console.log("hey");
        let url = 'http://localhost:5000/user/' + this.props.match.params.id;

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({profile: data.user}));
        // TODO: Seems dodgy taking data.user
    }


    render() {
        return (
            <div>
                <h1>{this.state.profile.name}</h1>
                <h1>{this.state.profile.email}</h1>
                <h1>{this.state.profile.address}</h1>
                <h1>{this.state.profile.rating}</h1>
                <Deck rest_route={'potatoes+user=' + this.state.profile.id} />
            </div>
        );
    }
}