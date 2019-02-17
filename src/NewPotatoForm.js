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
            <form>
                <label>
                    User ID:
                    <input type="number" value={this.state.id} onChange={this.handleChange} name="id"/>
                </label>

                <label>
                    type:
                    <input type="text" value={this.state.type} onChange={this.handleChange} name="type"/>
                </label>

                <label>
                    amount (kg):
                    <input type="number" step="0.01" value={this.state.amount} onChange={this.handleChange} name="amount"/>
                </label>

                <label>
                    price per kg:
                    <input type="number" step="0.01" value={this.state.price} onChange={this.handleChange} name="price"/>
                </label>

                <label>
                    description:
                    <input type="text" value={this.state.description} onChange={this.handleChange} name="description"/>
                </label>

                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </form>
        );



        return (
            <form method="POST" action="http://localhost:5000/add_potato" className="bg-light p-3">
                <input type="hidden" name="_method" value="put"/>
                <div className="form-group">
                    <label htmlFor="ownerInput">Owner</label>
                    <input type="number" id="ownerInput" placeholder="owner" name="owner" autoFocus/>
                </div>
                <div className="form-group">
                    <label htmlFor="typeInput">Type</label>
                    <input type="text" id="typeInput" placeholder="type" name="type"/>
                </div>
                <div className="form-group">
                    <label htmlFor="amountInput">Amount (kg)</label>
                    <input type="number" step="0.01" id="amountInput" placeholder="2.55" name="amount"/>
                </div>
                <div className="form-group">
                    <label htmlFor="priceInput">Price per kg</label>
                    <input type="number" step="0.01" id="priceInput" placeholder="3.99" name="price"/>
                </div>
                <div className="form-group">
                    <label htmlFor="descriptionInput">Description</label>
                    <input type="text" id="descriptionInput" placeholder="Lovely smooth potatoes" name="description"/>
                </div>
                <input type="button" value="Create potato"/>
            </form>
        )
    }
}