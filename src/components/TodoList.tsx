import * as React from "react";

import TodoItem from "./TodoItem";
import { Todo } from "../model/TodoManager";

type Props = {
    todos: Todo[];
    onSave: (id: string, value: string) => void;
    onDestory: (id: string) => void;
    onToggle: (id: string) => void;
}

type States = {
    currentEditingId: string;
}

class TodoList extends React.PureComponent<Props, States>{

    constructor(props: Props) {
        super(props);
        this.state = { currentEditingId: "" };
    }

    handleEdit = (id: string) => {
        this.setState({ currentEditingId: id });
    }

    handleCancel = (id: string, ev: React.SyntheticEvent<any>) => {
        this.setState({ currentEditingId: "" });
    }

    handleSave = (id: string, value: string) => {
        this.setState({ currentEditingId: "" });
        this.props.onSave(id, value);
    }

    render() {
        let todoList = this.props.todos.map((todo, index) => {
            return <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={this.props.onToggle}
                onEdit={this.handleEdit}
                onSave={this.handleSave}
                onCancel={this.handleCancel}
                onDestory={this.props.onDestory}
                editing={this.state.currentEditingId === todo.id} />;
        });
        return (
            <ul className="todo-list" >
                {todoList}
            </ul>
        );
    }
}

export default TodoList;