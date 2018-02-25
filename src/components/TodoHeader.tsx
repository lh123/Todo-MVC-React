import * as React from "react";

import { Todo } from "../model/TodoManager";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

interface Props {
    showToggleAll: boolean;
    toggleAll: boolean;
    onSubmit: (value: string) => void;
    onToggleAllClick: (checked: boolean) => void;
}

class TodoHeader extends React.PureComponent<Props, object>{
    constructor(props: Props) {
        super(props);
    }

    handleKeyUp(ev: React.KeyboardEvent<HTMLInputElement>): void {
        if (ev.keyCode !== ENTER_KEY) {
            return;
        }
        ev.preventDefault();
        let value = ev.currentTarget.value.trim();
        if (value !== "") {
            this.props.onSubmit(value);
            ev.currentTarget.value = "";
        }
    }

    handleToggleAllClick = (ev: React.MouseEvent<any>) => {
        this.props.onToggleAllClick(!this.props.toggleAll)
    }

    render() {
        let toggleAllButton: JSX.Element | null = null;
        if (this.props.showToggleAll) {
            toggleAllButton = (
                <span
                    onClick={this.handleToggleAllClick}
                    className={[
                        "toggle-all",
                        `${this.props.toggleAll ? "active" : ""}`].join(" ")}>
                    ❯
                </span>
            );
        }
        return (
            <div className="todo-header">
                <h1>todos</h1>
                <input
                    type="text"
                    className="new-todo"
                    autoFocus={true}
                    onKeyUp={(ev) => this.handleKeyUp(ev)}
                    placeholder="请输入代办事项" />
                {toggleAllButton}
            </div>
        )
    }
}

export { TodoHeader };