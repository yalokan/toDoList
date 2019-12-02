import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends  Component {

    render() {
        const { label,
            onDeleted,
            onToggleDone,
            onToggleImportant,
            done,
            important,
        } = this.props;

        let classnames = "todo-list-item";
        classnames = done ? `${classnames} done` : classnames;
        classnames = important ? `${classnames} important` : classnames;

        return (
            <span className={classnames}>
            <span
                className="todo-list-item-label"
                onClick={onToggleDone}>
            {label}
            </span>
            <button onClick={onToggleImportant} type="button" className="btn btn-outline-success btn-sm float-right">
                <i className="fa fa-exclamation"/>
            </button>
            <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}
            >
                <i className="fa fa-trash-o"/>
            </button>
        </span>
        );
    }
}
