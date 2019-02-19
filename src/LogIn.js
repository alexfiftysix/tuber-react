import React from 'react'


export class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:5000/log_in';

        console.log('email: ' + this.state.email);
        console.log('password: ' + this.state.password);

        xhr.open('POST', url, true);
        xhr.onreadystatechange = function () {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            //     alert(xhr.responseText);
            // }
            alert(xhr.responseText);
        };


        let data = new FormData();
        if (this.state.email) {
            data.append('email', this.state.email);
        }
        if (this.state.password) {
            data.append('password', this.state.password);
        }

        xhr.send(data);
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