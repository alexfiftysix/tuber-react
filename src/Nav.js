import {Link} from "react-router-dom";
import React from "react";

export class Nav extends React.Component {
    render() {
        return (
            <ul className="nav">
                <li><Link to={"/home"}>Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/repos">Repos</Link></li>
            </ul>
        )
    }
}