import React from 'react'
import {Deck} from './Deck'

export class PotatoSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            path: 'potatoes+user=' + event.target.value
        })
    }

    render() {
        return (
            <div>
                <input type={'number'} name={'whose_potatoes'} onChange={this.handleChange} placeholder={"Who's potatoes?"} />
                <Deck rest_route={this.state.path} />
            </div>
        )
    }
}