import React from 'react';
import {Card} from './Card'

// Displays a bunch of cards.
// Cards are currently used to show potatoes for sale, but could be used for profiles overviews also
export class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: null
        };

        this.update_state = this.update_state.bind(this);
    }


    update_state() {
        const url = 'http://localhost:5000/' + this.props.rest_route;

        // Fetches data from rest API, updates cards
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({cards: data}));
    }

    renderCards() {
        this.update_state();
        if (this.state.cards === null) {
            return <h1>Yes, we have no potatoes</h1>;
        }
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
        const cards = this.renderCards(this.props.cards);

        return (
            <div className="deck">
                {cards}
            </div>
        );
    }
}

Deck.defaultProps = {
    cards: [
        {
            title: 'Washed',
            image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fsc01.alicdn.com%2Fkf%2FHTB1_WVlXlxRMKJjy0Fdq6yifFXas%2F226848386%2FHTB1_WVlXlxRMKJjy0Fdq6yifFXas.jpg&f=1",
            price: '3',
            amount: '2',
            description: 'Nice washed potates.',
            location: 'Jeffersville'
        },
        {
            title: 'Brushed',
            image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.FrdhFOmEFfaujRCmtTcbIAHaE7%26pid%3D15.1&f=1",
            price: 'price',
            amount: '___',
            description: 'Description goes here.',
            location: 'location'
        }
    ]
};