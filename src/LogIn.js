import React from 'react'

export class LogIn extends React.Component {
    render() {
        return (
            <form method="POST" action="http://localhost:5000/log_in">`
                <div className="form-group">
                    <label htmlFor="usernameInput">User Name </label>
                    <input type="text" id="usernameInput" placeholder="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" id="passwordInput" placeholder="password"/>
                </div>
                <input type="submit" value="Log In"/>
            </form>
        )
    }
}