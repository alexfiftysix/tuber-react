import React from 'react'
import {Link} from "react-router-dom";
import {Card} from "./Card";

// Displays information about an individual profile (Name, locaion) and information on all potatoes they're selling
// TODO: Rewrite a la SearchPotatoes
export class Profile extends React.Component {
    // props:
    //   profile_id: int: profile number of current user
    constructor(props) {
        super(props);

        this.state = {
            address: {},
            potatoes: []
        };
    }

    componentDidMount() {
        let url = 'http://localhost:5000/full_user/' + this.props.match.params.id;

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    render() {
        let cards = [];
        for (let i in this.state.potatoes) {
            const potato = this.state['potatoes'][i];

            // TODO: update Deck component to do basically this
            console.log(potato['image']);
            const next = (
                <Card
                    key={'potato_' + potato['id']}
                    title={potato['title']}
                    image={potato['photo_path']}
                    price={potato['price_per_kilo']} // WHy is this different to in SearchPotatoes?
                    amount={potato['amount']}
                    description={potato['description']}
                    id={potato['id']}
                />);
            cards.push(next);
        }


        return (
            <div>
                <h1>{this.state.name}</h1>
                <h1>{this.state.email}</h1>
                <h1>{this.state.address.suburb}</h1>
                <li><Link to={"/profile+update/" + this.state.id}>Edit Profile</Link></li>
                <div className={'deck'}>
                    {cards}
                </div>
                <li><Link to={"/add_potato/" + this.state.id}>Add potatoes</Link></li>
            </div>
        );
    }
}