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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:5000/full_potato/' + this.props.match.params.id;

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    handleChange(event) {
        let to_take = event.target.value;

        if (this.state.amount - to_take < 0) {
            to_take = this.state.amount;
        }

        this.setState({
            amount_to_take: to_take
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const remaining_potato = this.state.amount - this.state.amount_to_take;
        const url = 'http://localhost:5000/potatoes/' + this.state.id;
        alert(url);

        let data = new FormData();

        data.append('amount', remaining_potato);

        fetch(url, {
            method: 'PATCH',
            body: data
        })
            .then(response => alert(response))
            .then(x => window.location.reload());
    }

    render() {
        const image = this.state.photo_path ? 'http://localhost:5000/image/' + this.state.photo_path : 'http://localhost:5000/image/No_image.jpeg';
        const amount = Math.round(this.state.amount * 100) / 100; // accurately round to 2 decimal places to avoid floating point shennanigans
        return (
            <div>
                <h1>BUY THIS POTATO!</h1>
                <h3>{this.state.type}</h3>
                <img src={image}/>
                <p>{this.state.description}</p>
                <p>Available: {amount}kg</p>

                <h2>Owned by</h2>
                <p>{this.state.owner_name}</p>
                <p>{this.state.owner_suburb}</p>
                <form className={'form'}>
                    <label>
                        <p>Amount to buy</p>
                        <input type={'number'} step={'0.01'} value={this.state.amount_to_take} onChange={this.handleChange} name={'amount_to_take'}/>
                    </label>
                    <button onClick={this.handleSubmit}>Buy potato!</button>
                </form>
            </div>
        );
    }
}