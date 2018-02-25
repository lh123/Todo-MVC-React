import { uuid, LocalStorage } from "../utils";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface ITodoObserver {
    setState(state: { todos: Todo[] }): void;
}

type TodoObserver = ((todos: Todo[]) => void) | ITodoObserver;

class TodoManager {
    private mKey: string;
    private mTodos: Todo[] = [];
    private mObservers: TodoObserver[] = [];

    constructor(key: string) {
        this.mKey = key;
        if (typeof window !== "undefined") {
            let readTodo = LocalStorage.read<Todo[]>(this.mKey);
            if (readTodo !== null) {
                this.mTodos = [...this.mTodos, ...readTodo];
            }
        }
    }

    save() {
        LocalStorage.save(this.mKey, this.mTodos);
        for (const observer of this.mObservers) {
            if (observer instanceof Function) {
                observer(this.mTodos);
            } else {
                observer.setState({ todos: this.mTodos });
            }
        }
    }

    getAllTodo() {
        return this.mTodos;
    }

    getTodo(id: string) {
        let index = this.findTodoIndexById(id);
        if (index >= 0) {
            return this.mTodos[index];
        }
        return null;
    }

    modifyTodo(id: string, value: string) {
        this.mTodos = this.mTodos.map(todo => {
            if (todo.id === id) {
                return { id: todo.id, title: value, completed: todo.completed };
            } else {
                return todo;
            }
        });
        this.save();
    }

    addTodo(todo: Todo) {
        this.mTodos = [...this.mTodos, todo];
        this.save();
    }

    deleteTodo(id: string) {
        this.mTodos = this.mTodos.filter(todo => {
            return todo.id !== id;
        });
        this.save();
    }

    toggleAll(checked: boolean) {
        this.mTodos = this.mTodos.map(todo => {
            return { id: todo.id, title: todo.title, completed: checked };
        });
        this.save();
    }

    toggle(id: string, checked?: boolean) {
        this.mTodos = this.mTodos.map(todo => {
            if (todo.id === id) {
                return { id: todo.id, title: todo.title, completed: !todo.completed };
            } else {
                return todo;
            }
        });
        this.save();
    }

    removeAllCompletedTodo() {
        this.mTodos = this.mTodos.filter(todo => {
            return !todo.completed;
        });
        this.save();
    }

    subscribe(observer: TodoObserver) {
        let index = this.mObservers.indexOf(observer);
        if (index < 0) {
            this.mObservers.push(observer);
        }
    }

    unSubscribe(observer: TodoObserver) {
        let index = this.mObservers.indexOf(observer);
        if (index >= 0) {
            this.mObservers.splice(index, 1);
        }
    }

    private findTodoIndexById(id: string) {
        let index = -1;
        for (let i = 0; i < this.mTodos.length; i++) {
            if (this.mTodos[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}

export { Todo, TodoObserver, ITodoObserver, TodoManager };