import React from 'react'

// TODO: Make generic form class for other forms to inherit/extend
// TODO: Should probably split this in two - update personal details / update address
export class UpdateProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            unit_number: '',
            street_number: '',
            street_name: '',
            suburb: '',
            country: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let url = 'http://localhost:5000/user_and_address/' + this.props.match.params.id;
        fetch(url, {credentials: 'same-origin'})
            .then(response => response.json())
            .then(data => this.setState(data));
    }


    send_name_and_email() {
        let xhr = new XMLHttpRequest();
        let url = 'http://localhost:5000/user/' + this.props.match.params.id;

        xhr.open('PATCH', url, true);
        xhr.onreadystatechange = function () {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            //     alert(xhr.responseText);
            // }
            alert(xhr.responseText);
        };

        let data = new FormData();

        if (this.state.name) {
            data.append('name', this.state.name);
        }
        if (this.state.email) {
            data.append('email', this.state.email);
        }
        // TODO: Change database to allow address input

        xhr.send(data);
    }

    send_address() {
        let xhr = new XMLHttpRequest();
        let url = 'http://localhost:5000/address/' + this.props.match.params.id;

        xhr.open('PATCH', url, true);
        xhr.onreadystatechange = function () {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            //     alert(xhr.responseText);
            // }
            alert(xhr.responseText);
        };

        let data = new FormData();

        if (this.state.unit_number) {
            data.append('unit_number', this.state.unit_number);
        }
        if (this.state.street_number) {
            data.append('street_number', this.state.street_number);
        }
        if (this.state.street_name) {
            data.append('street_name', this.state.street_name);
        }
        if (this.state.suburb) {
            data.append('suburb', this.state.suburb);
        }
        if (this.state.country) {
            data.append('country', this.state.country);
        }

        xhr.send(data);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.send_name_and_email();
        this.send_address();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value})
    }

    render() {
        return (
            <form className={'form'}>
                <label>
                    <p>Name: </p>
                    <input type={'text'} value={this.state.name} onChange={this.handleChange} name={'name'}/>
                </label>
                <label>
                    <p>Email: </p>
                    <input type={'text'} value={this.state.email} onChange={this.handleChange} name={'email'}/>
                </label>
                <p>Address</p>

                <label>
                    <p>Unit Number: </p>
                    <input type={'text'} value={this.state.unit_number} onChange={this.handleChange}
                           name={'unit_number'}/>
                </label>
                <label>
                    <p>Street Number: </p>
                    <input type={'text'} value={this.state.street_number} onChange={this.handleChange}
                           name={'street_number'}/>
                </label>
                <label>
                    <p>Street Name: </p>
                    <input type={'text'} value={this.state.street_name} onChange={this.handleChange}
                           name={'street_name'}/>
                </label>
                <label>
                    <p>Suburb: </p>
                    <input type={'text'} value={this.state.suburb} onChange={this.handleChange}
                           name={'suburb'}/>
                </label>
                <label>
                    <p>Country: </p>
                    <input type={'text'} value={this.state.country} onChange={this.handleChange}
                           name={'country'}/>
                </label>

                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}