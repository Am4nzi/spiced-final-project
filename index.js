const express = require("express");
const app = express();
const compression = require("compression");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("public"));

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

console.log("process.env.PORT: ", process.env.PORT);

app.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});
