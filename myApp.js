// Node is a JS environment like client side JS you can use the console to display useful debug information

// Express app object below has several methods Ex. app.listen(port) tells your server to listen on a given port. putting it in running state, added in the server.js file
let express = require("express")
let app =  express()

console.log("hello world")

// Routes structure in Express: app.METHOD(PATH, HANDLER)
// METHOD: An http method in lowercase
// PATH: Relative path on the server, it can be string or regex
// HANDLER: A function that Express calls when the route is matched, structure: function(req, res) {}
// req: Is the request object
// res: Is the response object
app.get("/", function (req, res) {
    res.send("Hello Express")
})

// Can respond requests using files, it'll set the appropiate headers to instruct your browser on how to handle the file you want to send, according to its type. Then it'll read and send the file. Needs an absolute file path. Recommend use the Node global variable __dirname Ex. absoulutePath = __dirname + relativePath/file.ext
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html")
})

// Use of middleware express.static(path) 
// path: Absolute path of the folder containing the assets
// middleware: Functions that intercept route handlers adding info
// Needs to be mounted in app.use(path, middleware) where path arg is optional, if you dont pass it, the middleware wil be executed for all requests

app.use("public", express.static(__dirname + "/public"))


// An API serves data. A REST (Representational State Transfer) API allows data exchange, without need for clients to know any detail about the server, only needs to know where the resource is (URL) and the action (verb).
// The GET ver is used when you are fetching some information, without modifying anything