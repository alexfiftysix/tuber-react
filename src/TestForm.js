import React from 'react'

export class TestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Name submitted: ' + this.state.value);
        event.preventDefault();

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/sign_up', true);

        var data = new FormData();
        data.append()

        xhr.send();
    }

    render() {
        return (
            <form>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit} />
            </form>
        );
    }
}