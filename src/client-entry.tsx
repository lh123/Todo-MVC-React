import * as React from "react";
import * as ReactDOM from "react-dom";

import { TodoApp } from "./app";

ReactDOM.hydrate(<TodoApp storeName="todo" />, document.getElementById("app"));