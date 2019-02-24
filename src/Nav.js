import React from "react";
import {Link} from "react-router-dom";

export class Nav extends React.Component {

    logOut() {
        localStorage.setItem('token', 'FakeToken');
        window.location.replace('http://localhost:3000');
    }

    render() {
        let links = [];
        links.push(<li key={'nav_home'}><Link to={"/home"}>Home</Link></li>);


        if (this.props.isLoggedIn) {
            links.push(<li key={'nav_profile'}><Link to={"/profile/" + this.props.id}>My profile</Link></li>);
            links.push(<li key={'nav_search'}><Link to="/search">Search</Link></li>);
        } else {
            links.push(<li key={'nav_login'}><Link to="/login">Log In</Link></li>);
            links.push(<li key={'nav_signup'}><Link to="/signup">Sign Up!</Link></li>);
        }

        return (
            <ul className="nav">
                <h2>Tuber</h2>
                {links}
                <button onClick={this.logOut}>Log Out</button>
            </ul>
        )
    }
}