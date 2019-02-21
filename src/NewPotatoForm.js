import React from 'react'

// TODO: link to this from specific profile
// Form for adding a new potato to a user
export class NewPotatoForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            type: '',
            amount: '',
            price: '',
            description: '',
            file: null
        };

        this.fileInput = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/potatoes', true);
        xhr.onreadystatechange = function () {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            //     alert(xhr.responseText);
            // }
            alert(xhr.responseText);
        };

        let data = new FormData();
        data.append('id', this.props.match.params.user_id);
        data.append('type', this.state.type);
        data.append('amount', this.state.amount);
        data.append('price', this.state.price);
        data.append('description', this.state.description);
        data.append('file', this.fileInput.current.files[0]);

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
            <form className={'form'} encType={'multipart/form-data'}>
                <h5>Add your new potatoes</h5>

                <label>
                    <p>Type:</p>
                    <input type="text" value={this.state.type} onChange={this.handleChange} name="type"/>
                </label>

                <label>
                    <p>Amount (kg):</p>
                    <input type="number" step="0.01" value={this.state.amount} onChange={this.handleChange} name="amount"/>
                </label>

                <label>
                    <p>Price per kg:</p>
                    <input type="number" step="0.01" value={this.state.price} onChange={this.handleChange} name="price"/>
                </label>

                <label>
                    <p>Description:</p>
                    <input type="text" value={this.state.description} onChange={this.handleChange} name="description"/>
                </label>

                <label>
                    <p>Image:</p>
                    <input type="file" name="file" accept={'image/*'} ref={this.fileInput}/>
                </label>

                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        );
    }
}