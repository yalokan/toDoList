import React, { Component } from 'react';
import "./addItem.css"

export default class AddItem extends Component {
    state = {
        label: "",
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label);
        this.setState({label: ""})

    };

    render () {
    return (
        <form className="addItemForm"
              onSubmit={this.onSubmit}
        >
            <input
                type="text"
                className="form-control d-flex"
                placeholder= "inputText"
                onChange={this.onLabelChange}
                value={this.state.label}
            />
            <button className="btn btn-outline-secondary">add</button>
        </form>
) } };

