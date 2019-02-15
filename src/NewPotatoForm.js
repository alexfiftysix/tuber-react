import React from 'react'

export class NewPotatoForm extends React.Component {

    send() {
        console.log("Submitting form!");
    }

    render() {
        return (
            <form method="POST" action="http://localhost:5000/add_potato" className="bg-light p-3">
                <input type="hidden" name="_method" value="put"/>
                <div className="form-group">
                    <label htmlFor="ownerInput">Owner</label>
                    <input type="number" id="ownerInput" placeholder="owner" name="owner" autoFocus/>
                </div>
                <div className="form-group">
                    <label htmlFor="typeInput">Type</label>
                    <input type="text" id="typeInput" placeholder="type" name="type"/>
                </div>
                <div className="form-group">
                    <label htmlFor="amountInput">Amount (kg)</label>
                    <input type="number" step="0.01" id="amountInput" placeholder="2.55" name="amount"/>
                </div>
                <div className="form-group">
                    <label htmlFor="priceInput">Price per kg</label>
                    <input type="number" step="0.01" id="priceInput" placeholder="3.99" name="price"/>
                </div>
                <div className="form-group">
                    <label htmlFor="descriptionInput">Description</label>
                    <input type="text" id="descriptionInput" placeholder="Lovely smooth potatoes" name="description"/>
                </div>
                <input type="button" value="Create potato"/>
            </form>
        )
    }
}