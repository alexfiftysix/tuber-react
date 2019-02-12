import React from 'react';

export class Card extends React.Component {
    render() {
        return (
            <div className='card'>
                <h3>{this.props.title}</h3>
                <img src={this.props.image} alt={this.props.image}/>
                <div>
                    <p>${this.props.price}/kg</p>
                    <p>{this.props.amount} kilos available</p>
                    <p>{this.props.description}</p>
                    <p>{this.props.location}</p>
                </div>
            </div>
        );
    }
}

Card.defaultProps = {
    title: 'Title',
    image: "../static/many-potatoes.jpeg",
    price: 'price',
    amount: '___',
    description: 'Description goes here.',
    location: 'location'
};
