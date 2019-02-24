import React from 'react'
import {Card} from './Card'

export class SearchPotatoes extends React.Component {
    // Allows for searching of potatoes
    // Uses filtering in DB to allow support of much larger queries without loading all into local memory

    constructor(props) {
        super(props);

        this.state = {
            potatoes: [],
            priceLow: 0,
            priceHigh: 99
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        const url = 'http://localhost:5000/potatoes';

        // if (this.props.match.params.priceLow) {
        //     url += '/low=' + this.props.priceHigh;
        // }
        // if (this.props.match.params.priceHigh) {
        //     url += '/high=' + this.props.priceHigh;
        // }

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({potatoes: data}));
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();

        const url = 'http://localhost:5000/potatoes/low=' + this.state.priceLow + '+high=' + this.state.priceHigh;

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
                id={potato['id']}
            />);

            cards.push(next);
        }

        return (
            <div className={'search-potatoes'}>
                <a href={'#filter'}>Filter</a>

                <div className={'deck'}>
                    {cards}
                </div>

                <form className={'form'} id={'filter'}>
                    <label>
                        <p>Minimum price: </p>
                        <input type={'number'} step={'0.1'} name={'priceLow'} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <p>Maximum price: </p>
                        <input type={'number'} step={'0.1'} name={'priceHigh'} onChange={this.handleChange}/>
                    </label>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }

}


SearchPotatoes.defaultProps = {
    priceLow: 1,
    priceHigh: 2,
};