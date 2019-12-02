import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import AddItem from "../addItem";
import ItemStatusFilter from "../item-status-filter";

export default class App extends Component {

    state = {
        todoData: [
            this.createTodoItem("first task"),
            this.createTodoItem("Second task"),
        ],
        term: "",
        filter: "all",
    };

    createTodoItem(label) {
        return {
                label,
                important: false,
                done: false,
                id: Math.floor(Date.now() * Math.random()),
            }
        }

    deleteItem = (id) => {
        this.setState( ({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            return {
                todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
            }
        })
    };

    onAdd = (text) => {
        this.setState(({ todoData }) => {
            return {
                todoData: [...todoData, this.createTodoItem(text)]
            }
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem,
            [propName]: !oldItem[propName] }
        return  [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important"),
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done"),
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({term})
    };

    onFilterChange = (filter) => {
        this.setState({filter})
    };

    search(items, term) {
        return term.length === 0
            ? items
            : items.filter((elem) =>
                elem.label.toLowerCase().includes(term.toLowerCase())
            )
    };

    filter(items, filter) {
        switch (filter) {
            case "all":
                return items;
            case "active":
                return items.filter((item) => !item.done);
            case "done":
                return items.filter((item) => item.done);
            default:
                return items;

        }

    }

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        const loginBox = <span> Login please </span>;
        return (
            <div>
                {loginBox}
                <AppHeader done={doneCount} toDo={todoCount}/>
                    <SearchPanel onSearchChange = {this.onSearchChange} />
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <AddItem onAdd={this.onAdd}/>
            </div>
        );
    };
}
