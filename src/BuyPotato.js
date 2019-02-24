import React from 'react'

export class BuyPotato extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>BUY THIS POTATO!</h1>
                <h3>ID: {this.props.match.params.id}</h3>
            </div>
        );
    }
}