import React from 'react';

export class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ''
        }
    }




    render() {
        const image = this.props.image ? 'http://localhost:5000/image/' + this.props.image : 'http://localhost:5000/image/No_image.jpeg';

        return (
            <div className="card">
                <img src={image} alt={this.props.title}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">${this.props.price}/kg</p>
                    <p className="card-text">{this.props.amount} kilos available</p>
                    <p className="card-text description">{this.props.description}</p>
                    <p className="card-text">{this.props.location ? 'Location: ' + this.props.location : null}</p>
                    <p className="card-text">{this.props.owner ? 'Owner: ' + this.props.owner : ''}</p>
                    <button className="btn btn-primary">Buy</button>
                </div>
            </div>
        );
    }
}

Card.defaultProps = {
    location: null,
    owner: null,

};