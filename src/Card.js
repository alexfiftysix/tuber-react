import React from 'react';

export class Card extends React.Component {
    render() {

        return (
            <div className="card m-2">
                <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.twochums.com%2Fwp-content%2Fuploads%2F2013%2F03%2Fpotatoes.jpg&f=1" className="card-img-top" alt={this.props.image}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">${this.props.price}/kg</p>
                    <p className="card-text">{this.props.amount} kilos available</p>
                    <p className="card-text">{this.props.description}</p>
                    <p className="card-text">{this.props.location}</p>
                    <button className="btn btn-primary">Buy</button>
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
