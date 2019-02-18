import {Link} from "react-router-dom";
import React from "react";

export class Nav extends React.Component {
    render() {
        return (
            <ul className="nav">
                <h2>Tuber</h2>
                <li><Link to={"/home"}>Home</Link></li>
                <li><Link to="/add_potato">Add Potatoes</Link></li>
                <li><Link to="/repos">Repos</Link></li>
                <li><Link to="/profile/1">Profile</Link></li>
            </ul>
        )
    }
}