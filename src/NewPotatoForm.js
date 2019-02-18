import React from 'react'

export class NewPotatoForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            type: '',
            amount: '',
            price: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:5000/potatoes', true);
        xhr.onreadystatechange = function () {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            //     alert(xhr.responseText);
            // }
            alert(xhr.responseText);
        };

        let data = new FormData();
        data.append('id', this.state.id);
        data.append('type', this.state.type);
        data.append('amount', this.state.amount);
        data.append('price', this.state.price);
        data.append('description', this.state.description);

        xhr.send(data);

        event.preventDefault();
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
        return (
            <form className={'form'}>
                <label>
                    <p>User ID:</p>
                    <input type="number" value={this.state.id} onChange={this.handleChange} name="id"/>
                </label>

                <label>
                    <p>type:</p>
                    <input type="text" value={this.state.type} onChange={this.handleChange} name="type"/>
                </label>

                <label>
                    <p>amount (kg):</p>
                    <input type="number" step="0.01" value={this.state.amount} onChange={this.handleChange} name="amount"/>
                </label>

                <label>
                    <p>price per kg:</p>
                    <input type="number" step="0.01" value={this.state.price} onChange={this.handleChange} name="price"/>
                </label>

                <label>
                    <p>description:</p>
                    <input type="textarea" value={this.state.description} onChange={this.handleChange} name="description"/>
                </label>

                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        );
    }
}