import React from 'react'

export class UserSignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/sign_up', true);
        xhr.onreadystatechange = function () {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            //     alert(xhr.responseText);
            // }
            alert(xhr.responseText);
        };

        let data = new FormData();
        data.append('email', this.state.email);
        data.append('password', this.state.password);

        xhr.send(data);

        event.preventDefault();
    }

    render() {
        return (
            <form>
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email"/>
                </label>
                <label>
                    password:
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password"/>
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </form>
        );


        // return (
        //     <form method="POST" action="http://localhost:5000/sign_up" className="bg-light p-3">
        //         <input type="hidden" name="_method" value="put"/>
        //         <div className="form-group">
        //             <label htmlFor="usernameInput">Email</label>
        //             <input type="email" id="emailInput" placeholder="email" name="email" autoFocus/>
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="passwordInput">Password</label>
        //             <input type="password" id="passwordInput" placeholder="password" name="password"/>
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="passwordInput">Your name</label>
        //             <input type="text" id="nameInput" placeholder="Your name" name="name"/>
        //         </div>
        //         <input type="submit" value="Log In"/>
        //     </form>
        // )
    }
}