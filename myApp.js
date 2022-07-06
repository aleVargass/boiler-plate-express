// Node is a JS environment like client side JS you can use the console to display useful debug information

// 1
// Express app object below has several methods Ex. app.listen(port) tells your server to listen on a given port. putting it in running state, added in the server.js file
const { response } = require("express")
let express = require("express")
let app =  express()

console.log("hello world")

// 2
// Routes structure in Express: app.METHOD(PATH, HANDLER)
// METHOD: An http method in lowercase
// PATH: Relative path on the server, it can be string or regex
// HANDLER: A function that Express calls when the route is matched, structure: function(req, res) {}
// req: Is the request object
// res: Is the response object
app.get("/", function (req, res) {
    res.send("Hello Express")
})

// 3
// Can respond requests using files, it'll set the appropiate headers to instruct your browser on how to handle the file you want to send, according to its type. Then it'll read and send the file. Needs an absolute file path. Recommend use the Node global variable __dirname Ex. absoulutePath = __dirname + relativePath/file.ext
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html")
})

// 4
// Use of middleware express.static(path) 
// path: Absolute path of the folder containing the assets
// middleware: Functions that intercept route handlers adding info
// Needs to be mounted in app.use(path, middleware) where path arg is optional, if you dont pass it, the middleware wil be executed for all requests
app.use("public", express.static(__dirname + "/public"))

// 5
// An API serves data. A REST (Representational State Transfer) API allows data exchange, without need for clients to know any detail about the server, only needs to know where the resource is (URL) and the action (verb).
// The GET verb is used when you are fetching some information, without modifying anything
// This method closes the request-response loop, returning the data
// BehindtScenes, it convert a valid JS object into a string, the set the appropiates headers to tell your browser that you're serving JSON, and sends the data back {key: data} data: any
// If data is a variable it'll be evaluated before being converted intro a string
app.get("/json", (req, res) => {
    res.json({
        message: "Hello json"
    })
})

// 6
// .env is a hidden/shell file used to environment variables to your app, store data, API keys, config options of which you can change the behaviour of your app, without rewrite some code.
// process.env object is a global Node object and variables are passed as string
// By convention, the variable names are all uppercse, separated by an underscore
// You dont need to wrap names or values in quotes
// There cannot be space around the equals sign VAR_NAME=value
// Usually, you'll put each var definition on a separate line
app.get("/json", (req, res) => {
    let message = "Hello json"
    if (process.env["MESSAGE_STYLE"] === "uppercase") {
      res.json({ message: message.toUpperCase() })
    } else {
      res.json({ message: message })
    }    
  })
  
// 7
// middleware stuctures: function(req, res,, next) {}
// req: request object, res: response object, next: next function in the app's request-response cycle
// This middleware execute code that can have side effects on the app and usually add info to the request or response object
// Also can end the cycle by sending a response when some condition is met
// If they dont send res, they start the execution of the function in the stack, the 3rd arg
// In this case, it'll be executed for all the requests, but u can also set more specific conditions. For ex. if u want a function to be executed only for POST request, u could use app.post(<mware-function>)
// Analogous methods exist fort all the HTTP verbs (GET, DELETE, PUT, ...)
app.use("/json", (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
  })

// 8
// Leades to a better app structurem and the possibility to reuse code, can also be used to perform some validation on the data
// At each point of the middleware stack u can block the execution of the current chain and apss control to functions specifically designed to handle errors
app.get("/now", (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({ time: req.time})
})

// 9 
// We've to allow uses to communicate to us what they want to get from our service
// If the client is requesting info about a user stored in the database, they need a way to let us know which user they're interested in
// route params are named segments of the URL, delimited by (/). Each segment captures the value of the part of the uRL which matches its position
// The captured values can be found in the req.params object
// route_path: '/user/:userId/book/:bookId'
//actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word})
})

// 10
// Encoding the data after the route path, using a query string
// Is delimited by a (?), and includes field=value couples. Each couple is separated by (&)
// Express can parse the data from the query string, and populate the object req.query
// Some characters (%) cannot be in URLs and have to be encoded in a different format before you can send them. If you use the API from JS, you can use specific methods to encode/decode these characters
app.get("/name", (req, res) => {
  let {first: firstname, last: lastname} = req.query
  res.json({
    name: `${firstname} ${lastname}`
  })
})

// 11 Use body-parser to parse POST request
// https://www.freecodecamp.org/learn/back-end-development-and-apis/basic-node-and-express/use-body-parser-to-parse-post-requests
// Default method to send client data with HTML forms
// In REST is used to send data to create new items
// The data doesnt appear in the URL, its hidden in the req body, is a part of the HTTP req, also called payload
// Even though the data is not visible, its not private
let bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 12 Get data from POST requests
// https://www.freecodecamp.org/learn/back-end-development-and-apis/basic-node-and-express/get-data-from-post-requests
app.post("/name", (req, res)=> {
  let {first: firstname, last: lastname} =  req.body
  res.json({ name: `${firstname} ${lastname}`})
})