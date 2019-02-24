import React from 'react'

export class BuyPotato extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            owner: '',
            type: '',
            amount: '',
            price_per_kilo: '',
            description: '',
            photo_path: '',
            owner_name: '',
            owner_email: '',
            owner_suburb: '',
            amount_to_take: 0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:5000/full_potato/' + this.props.match.params.id;

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const image = this.state.photo_path ? 'http://localhost:5000/image/' + this.state.photo_path : 'http://localhost:5000/image/No_image.jpeg';

        return (
            <div>
                <h1>BUY THIS POTATO!</h1>
                <img src={image}/>
                <p>{this.state.description}</p>

                <h2>Owned by</h2>
                <p>{this.state.owner_name}</p>
                <p>{this.state.owner_suburb}</p>
                <form className={'form'}>
                    <input type={'number'} step={'0.01'} value={this.state.amount_to_take} onChange={this.handleChange} name={'amount_to_take'}/>
                    <input type={'submit'} onClick={this.handleClick} value={'buy this much potato'} />
                </form>
            </div>
        );
    }
}