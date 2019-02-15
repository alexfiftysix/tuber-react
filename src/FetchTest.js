import React from 'react'

export class FetchTest extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
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
        data.append('email', 'juli@juli.com');
        data.append('password', 'password');

        xhr.send(data);
    }

    render() {
        return (
            <button onClick={this.handleSubmit} value="Submit">Submit</button>
        )
    }
}