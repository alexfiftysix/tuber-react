import React from 'react'


export class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            token: ''
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.email || !this.state.password) {
            alert('Please include email and password!');
            return;
        }

        let xhr = new XMLHttpRequest();
        const url = 'http://localhost:5000/get_token';

        xhr.open('GET', url, true);

        xhr.setRequestHeader("Authorization", "Basic " + btoa(this.state.email + ":" + this.state.password));
        // xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            //     alert(xhr.responseText);
            // }
            alert(xhr.responseText);
        };

        xhr.send();
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
            <form className={'form'} method="POST" action="http://localhost:5000/log_in">
                <label>
                    <p>Email: </p>
                    <input type={'text'} value={this.state.email} onChange={this.handleChange} name={'email'}/>
                </label>
                <label>
                    <p>Password: </p>
                    <input type={'password'} value={this.state.password} onChange={this.handleChange}
                           name={'password'}/>
                </label>
                <input className={'form-submit'} type="submit" value="Submit" onClick={this.handleSubmit}/>
            </form>
        )
    }
}