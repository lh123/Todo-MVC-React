import * as React from "react";

type ShowType = "All" | "Active" | "Completed";

type Props = {
    count: number;
    completedCount: number;
    show: ShowType;

    onClearCompleted: () => void;
}

class TodoFooter extends React.Component<Props, object>{
    render() {
        let clearButton: JSX.Element | null = null;
        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    className="clear-complete"
                    onClick={this.props.onClearCompleted}>
                    清除所有完成
                </button>
            );
        }
        return (
            <footer className="footer">
                <span className="todo-count">
                    <span className="todo-count-num">{this.props.count}</span> 未完成
                </span>
                <ul className="todo-filter">
                    <li>
                        <a
                            href="#/"
                            className={this.props.show === "All" ? "selected" : ""}>
                            All
                        </a>
                    </li>
                    <li>
                        <a
                            href="#/active"
                            className={this.props.show === "Active" ? "selected" : ""}>
                            Active
                        </a>
                    </li>
                    <li>
                        <a
                            href="#/completed"
                            className={this.props.show === "Completed" ? "selected" : ""}>
                            Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
}

export { TodoFooter, ShowType };