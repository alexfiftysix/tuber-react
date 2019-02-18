import React from 'react'

export class UpdateProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let url = 'http://localhost:5000/user/' + this.props.match.params.id;

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({profile: data.user}));
    }

    handleSubmit(event) {
        let xhr = new XMLHttpRequest();
        let url = 'http://localhost:5000/user/' + this.props.match.params.id;

        console.log('sending to: ' + url);

        xhr.open('PATCH', url, true);
        xhr.onreadystatechange = function () {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            //     alert(xhr.responseText);
            // }
            alert(xhr.responseText);
        };

        let data = new FormData();

        data.append('name', this.state.profile.name);
        data.append('email', this.state.profile.email);
        data.append('address', this.state.profile.address);
        // TODO: Change database to allow address input

        xhr.send(data);

        event.preventDefault();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            profile: {
                [name]: value
            }
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
                <label>
                    <p>Address: </p>
                    <input type={'text'} value={this.state.profile.address} onChange={this.handleChange} name={'address'}/>
                </label>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}