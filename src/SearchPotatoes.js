import React from 'react'
import {Card} from './Card'

export class SearchPotatoes extends React.Component {
    // Allows for searching of potatoes
    // first reads in all potatoes from API, then apply front-end filters,
    // OOOOOR. back-end filtering only, but requires refresh
    // I think the second one, we want to be able to handle a lot of potatoes


    constructor(props) {
        super(props);

        this.state = {
            potatoes: []
        }
    }


    componentDidMount() {
        const url = 'http://localhost:5000/potatoes';

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({potatoes: data}));
    }


    render() {
        let cards = [];

        for (let i in this.state['potatoes']) {
            const potato = this.state['potatoes'][i];

            const next = (<Card
                key={'potato_' + potato['id']}
                title={potato['title']}
                image={potato['image']}
                price={potato['price']}
                amount={potato['amount']}
                description={potato['description']}
            />);

            cards.push(next);
        }

        return (
            <div className={'deck'}>
                {cards}
            </div>
        );
    }

}