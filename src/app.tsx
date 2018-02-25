import * as React from "react";
import * as ReactDOM from "react-dom";

import { TodoHeader } from "./components/TodoHeader";
import { TodoFooter, ShowType } from "./components/TodoFooter";
import { TodoList } from "./components/TodoList";

import { TodoManager, TodoObserver, Todo } from "./model/TodoManager";

import * as Util from "./utils";

type Props = {
    storeName: string;
}

type States = {
    show: ShowType;
    todos: Todo[];
}

class TodoApp extends React.PureComponent<Props, States> {

    private mTodoManager: TodoManager;

    constructor(props: Props) {
        super(props);
        this.mTodoManager = new TodoManager(this.props.storeName);
        this.state = { show: "All", todos: this.mTodoManager.getAllTodo() };
    }

    componentWillMount() {
        if (typeof window !== "undefined") {
            this.handleUrlMatch(location.href);
        }
        this.mTodoManager.subscribe(this);
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.handleHashChanged);
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.handleHashChanged);
        this.mTodoManager.unSubscribe(this);
    }

    handleUrlMatch(url: string) {
        let pathMatch = /#((?:\/|[^#])+)/;
        let pathArray = pathMatch.exec(url);
        let showType: ShowType = "All";
        if (pathArray === null || pathArray.length === 1) {
            showType = "All";
        } else {
            let type = pathArray[1].toLowerCase();
            switch (type) {
                case "/":
                    showType = "All";
                    break;
                case "/active":
                    showType = "Active";
                    break;
                case "/completed":
                    showType = "Completed";
                    break;
            }
        }
        this.setState({ show: showType });
    }

    handleHashChanged = (ev: HashChangeEvent) => {
        if (ev.newURL !== null) {
            this.handleUrlMatch(ev.newURL);
        }
    }

    handleNewTodoSubmit = (value: string) => {
        this.mTodoManager.addTodo({
            id: Util.uuid(),
            title: value,
            completed: false
        });
    }

    handleClearCompleted = () => {
        this.mTodoManager.removeAllCompletedTodo();
    }

    handleSave = (id: string, value: string) => {
        this.mTodoManager.modifyTodo(id, value);
    }

    handleDestory = (id: string) => {
        this.mTodoManager.deleteTodo(id);
    }

    handleToggle = (id: string) => {
        this.mTodoManager.toggle(id);
    }

    handleToggleAll = (checked: boolean) => {
        this.mTodoManager.toggleAll(checked);
    }

    render() {
        const todos = this.state.todos;

        let activeTodos = todos.filter((value) => {
            if (value.completed) {
                return false;
            } else {
                return true;
            }
        });

        let showTodos = todos.filter((value) => {
            switch (this.state.show) {
                case "All":
                    return true;
                case "Active":
                    return !value.completed;
                case "Completed":
                    return value.completed;
            }
        });

        let showTodoList: JSX.Element | null = null;
        if (showTodos.length > 0) {
            showTodoList = (
                <TodoList
                    todos={showTodos}
                    onSave={this.handleSave}
                    onDestory={this.handleDestory}
                    onToggle={this.handleToggle} />
            );
        }

        let todoFooter: JSX.Element | null = null;
        if (todos.length > 0) {
            todoFooter = (
                <TodoFooter
                    count={activeTodos.length}
                    completedCount={todos.length - activeTodos.length}
                    show={this.state.show}
                    onClearCompleted={this.handleClearCompleted} />
            );
        }

        return (
            <div className="todo-app">
                <TodoHeader
                    showToggleAll={todos.length > 0}
                    toggleAll={activeTodos.length === 0}
                    onToggleAllClick={this.handleToggleAll}
                    onSubmit={this.handleNewTodoSubmit} />
                {showTodoList}
                {todoFooter}
            </div>
        )
    }
}

export { TodoApp };