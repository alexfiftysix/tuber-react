import React from 'react'

// TODO: Make generic form class for other forms to inherit/extend
// TODO: Handle address properly - have a field for each part of address
export class UpdateProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {
                email: '',
                name: '',
                unit_number: '',
                street_number: '',
                street_name: '',
                suburb: '',
                country: ''
            },
            obj: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Get name and email
        let url = 'http://localhost:5000/user/' + this.props.match.params.id;
        let request1 = fetch(url, {
            credentials: 'same-origin'
        }).then(response => response.json());

        // Get address info
        url = 'http://localhost:5000/address/' + this.props.match.params.id;
        let request2 = fetch(url, {
            credentials: 'same-origin'
        }).then(response => response.json());


        let combinedData = {'profile': {}, 'address': {}};
        Promise.all([request1, request2]).then(values => {
            // TODO: Less BadCode here
            combinedData["profile"] = values[0];
            for (var i in values[1]) {
                combinedData["profile"][i] = values[1][i];
            }
            this.setState(combinedData);
        });

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

        if (this.state.profile.name) {
            data.append('name', this.state.profile.name);
        }
        if (this.state.profile.email) {
            data.append('email', this.state.profile.email);
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

        if (this.state.profile.unit_number) {
            data.append('unit_number', this.state.profile.unit_number);
        }
        if (this.state.profile.street_number) {
            data.append('street_number', this.state.profile.street_number);
        }
        if (this.state.profile.street_name) {
            data.append('street_name', this.state.profile.street_name);
        }
        if (this.state.profile.suburb) {
            data.append('suburb', this.state.profile.suburb);
        }
        if (this.state.profile.country) {
            data.append('country', this.state.profile.country);
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

        let new_profile = this.state.profile;
        new_profile[name] = value;


        this.setState({
            profile: new_profile
        });
    }

    render() {
        return (
            <form className={'form'}>
                <label>
                    <p>Name: </p>
                    <input type={'text'} value={this.state.profile.name} onChange={this.handleChange} name={'name'}/>
                </label>
                <label>
                    <p>Email: </p>
                    <input type={'text'} value={this.state.profile.email} onChange={this.handleChange} name={'email'}/>
                </label>
                <p>Address</p>

                <label>
                    <p>Unit Number: </p>
                    <input type={'text'} value={this.state.profile.unit_number} onChange={this.handleChange}
                           name={'unit_number'}/>
                </label>
                <label>
                    <p>Street Number: </p>
                    <input type={'text'} value={this.state.profile.street_number} onChange={this.handleChange}
                           name={'street_number'}/>
                </label>
                <label>
                    <p>Street Name: </p>
                    <input type={'text'} value={this.state.profile.street_name} onChange={this.handleChange}
                           name={'street_name'}/>
                </label>
                <label>
                    <p>Suburb: </p>
                    <input type={'text'} value={this.state.profile.suburb} onChange={this.handleChange}
                           name={'suburb'}/>
                </label>
                <label>
                    <p>Country: </p>
                    <input type={'text'} value={this.state.profile.country} onChange={this.handleChange}
                           name={'country'}/>
                </label>

                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}