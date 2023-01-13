// in Node, require() is a built-in function
// to include external modules that exist in separate files
// the file extension '.js' is assumed

const express = require('express');
const dogRouter = require("./api/router");

// either module can be used to resolve CORS errors:
const cors = require("cors");            // external module
const corsResolver = require("./cors");  // custom module 

// initialize an express application 
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

// start our server
app.listen(port, hostname, () => {
    console.log(`Express server started at http://${hostname}:${port}`);
});

// Either of the following 3 methods can be used to prevent CORS errors:
// app.use(corsResolver());       // apply our custom CORS middleware module to prevent CORS error, on all routes
// app.use("/api", corsResolver); // apply our custom CORS middleware module to prevent CORS error, on /api 
app.use(cors({
    origin: "http://127.0.0.1:5500",
    //methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //allowedHeaders: 'Content-Type,Authorization',
    //preflightContinue: false,
    //optionsSuccessStatus: 204
}))

app.use(express.json());       // allows reading an incoming JSON object in the body of an HTTP request
                               // the data will then be accessible as req.body property

app.use(express.urlencoded()); // allows reading an incoming url-encoded object (in the form of 
                               // x-www-form-urlencoded)
                               // the data will then be accessible as req.body property
app.use("/api", dogRouter);    // routes via middleware router


// serve a default page
app.get("/", (req, res) => {
    res.send(`<h1>Our Node.js server is running</h1>`);  // Content-Type: text/html
    //res.send({message: "Hello world"});                  // Content-Type: application/json
        // send() will check the structure of our output
        //        and will set the header information on its response accordingly:
        //           - ETag (an identifier for a specific version of a resource
        //                   for more efficient caching)
        //           - Content-Type
    //res.end("Hello"); // sending raw text works
    //res.end({message: "Hello world"}); // sending json fails with error (in both Node log 
                                       // and sent as response body to the browser):
                                       // TypeError [ERR_INVALID_ARG_TYPE]: 
                                       // The "chunk" argument must be of type string or an instance 
                                       // of Buffer or Uint8Array. Received an instance of Object
    //res.end(`<h1>Our Node.js server is running</h1>`);  // works but rendered in <pre> tags on Safari 
});

// have a look at the module object automatically provided by Node.js
// console.log(module);