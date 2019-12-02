import React, { Component } from 'react';
import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {

    buttons =[
        {name: "all", label: "All"},
        {name: "done", label: "Done"},
        {name: "active", label: "Active"},
    ];


    render() {
        const { filter, onFilterChange } = this.props;
        const buttons = this.buttons.map(({name, label}) => {
            const active = filter === name ? "btn-info" : "btn-outline-secondary"
            return (
                <button type="button"
                        className={`btn ${active}`}
                        key={name}
                        onClick={() => onFilterChange(name)}>
                    {label}
                </button>
            )
        });
        return (
            <span className="btn-group">
               {buttons}
            </span>
        );
    };
};

