import React from 'react';
import {Card} from './Card'

// Displays a bunch of cards.
// Cards are currently used to show potatoes for sale, but could be used for profiles overviews also
// TODO: Sending endless requests again...
export class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };

        this.get_data = this.get_data.bind(this);
    }

    get_data() {
        const url = 'http://localhost:5000/' + this.props.rest_route;

        // Fetches data from rest API, updates cards
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({cards: data}));
    }


    componentDidMount() {
        this.get_data();
    }

    componentDidUpdate() {
        this.get_data();
    }

    render_cards() {
        return this.state.cards.map((card) => {
            return (
                <Card
                    key={'potato_' + card.id}
                    title={card.title}
                    image={card.image}
                    price={card.price}
                    amount={card.amount}
                    description={card.description}
                    location={card.location}
                />
            )
        });
    }

    render() {
        const cards = this.render_cards();

        return (
            <div className="deck">
                {cards}
            </div>
        );
    }
}
