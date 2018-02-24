import * as React from "react";

import { Todo } from "../model/TodoManager";

import ToggleSVG from "../assets/images/toggle.svg";
import ToggleCheckedSVG from "../assets/images/toggle-checked.svg";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

type Props = {
    todo: Todo;
    editing?: boolean;
    onSave: (id: string, value: string) => void;
    onDestory: (id: string) => void;
    onEdit: (id: string) => void;
    onCancel: (id: string, event: React.SyntheticEvent<any>) => void;
    onToggle: (id: string) => void;
};

type States = {
    editingText: string;
    hovering: boolean;
}

type LiClass = "completed" | "hover" | "editing";

class TodoItem extends React.PureComponent<Props, States> {

    private mEditField: HTMLInputElement | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {
            editingText: this.props.todo.title,
            hovering: false
        };
    }

    handleSubmit(event: React.SyntheticEvent<HTMLElement>) {
        let value = this.state.editingText.trim();
        if (value !== "") {
            this.props.onSave(this.props.todo.id, value);
            this.setState({ editingText: value });
        } else {
            this.props.onDestory(this.props.todo.id);
        }
    }

    handleEdit() {
        this.props.onEdit(this.props.todo.id);
        this.setState({ editingText: this.props.todo.title });
    }

    handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (event.keyCode === ESCAPE_KEY) {
            this.setState({ editingText: this.props.todo.title });
            this.props.onCancel(this.props.todo.id, event);
        } else if (event.keyCode === ENTER_KEY) {
            this.handleSubmit(event);
        }
    }

    handleChanged(event: React.SyntheticEvent<HTMLElement>) {
        let input: HTMLInputElement = event.target as HTMLInputElement;
        this.setState({ editingText: input.value });
    }

    componentDidUpdate(preProps: Props) {
        let node = this.mEditField as HTMLInputElement;
        if (!preProps.editing && this.props.editing) {
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }

    render() {
        let liClass: LiClass[] = [];
        if (this.props.todo.completed) {
            liClass.push("completed")
        }
        if (this.state.hovering) {
            liClass.push("hover");
        }
        if (this.props.editing) {
            liClass.push("editing");
        }
        return (
            <li
                style={{ position: "relative" }}
                className={liClass.join(" ")}>
                <div className={`item-wrap`}
                    onMouseOver={() => this.setState({ hovering: true })}
                    onMouseOut={() => this.setState({ hovering: false })}>
                    <div className="toggle"
                        style={{ backgroundImage: `url(${this.props.todo.completed ? ToggleCheckedSVG : ToggleSVG})` }}
                        onClick={() => this.props.onToggle(this.props.todo.id)}>
                    </div>
                    <label onDoubleClick={() => this.handleEdit()}>{this.props.todo.title}</label>
                    <div className="destory" onClick={() => this.props.onDestory(this.props.todo.id)}>×</div>
                </div>
                <input
                    ref={ele => this.mEditField = ele}
                    type="text"
                    className="edit"
                    value={this.state.editingText}
                    onBlur={e => this.handleSubmit(e)}
                    onKeyDown={e => this.handleKeyDown(e)}
                    onChange={e => this.handleChanged(e)} />
            </li>
        );
    }
}

export default TodoItem;