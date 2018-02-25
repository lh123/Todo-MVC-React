const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactSSR = require("react-dom/server");

const TodoApp = require("../dist/ssr/assets/bundle").default;

let port = 8080;
let app = express();

app.use("/assets", express.static(path.resolve(__dirname, "../dist/client/assets")));
app.use("/css", express.static(path.resolve(__dirname, "../dist/client/css")));

app.get("/", function (req, res) {
    fs.readFile(path.resolve(__dirname, "../dist/template.html"), { encoding: "utf-8" }, function (err, data) {
        let app = ReactSSR.renderToString(TodoApp);
        let html = data.replace("<!-- APP -->", app);
        res.send(html);
    });
});

app.listen(port, function () {
    console.log("server run at http://localhost:" + port);
});
