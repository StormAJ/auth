"use strict";
var swaggerTools = require("swagger-tools");
const fs = require("fs");
// var YAML = require("yamljs");
var YAML = require("yaml");
const app = require("express")();
var config = require("config"); // var app = require("connect")();
var express = require("express");
const { initDb } = require("./config/pg");
const home = require("./routes/home");

//swaggerRouter configuration
var routerOptions = {
  controllers: "./controllers",
  useStubs: process.env.NODE_ENV === "development" ? true : false, // Conditionally turn on stubs (mock mode)
  // useStubs: false,
  docs: {
    apiDocs: "/api-docs",
    apiDocsPrefix: "",
    swaggerUi: "/docs",
    swaggerUiPrefix: ""
  }
};

// try {
const file = fs.readFileSync("./swagger/swagger.yaml", "utf8");

const swaggerDoc = YAML.parse(file);
// } catch (err) {
//   console.log("error: ", err);
// }

function authApiKey(req, def, token, callback) {
  if (req.headers["x-api-key"] != config.get("APIKey")) {
    return callback(req.res.status(403).json({ message: " Access denied" }));
  } else return callback(null);
}

app.use(express.json()); // converts the http request data into a json object, accessed by req.body
app.use(express.urlencoded({ extended: true })); // read data from request added to url
// app.use(express.static("public")); // return static content from folder "./pulbic" on http request to url "/filename"
// app.use(helmet());
app.use("/", home);
// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Provide the security handlers
  app.use(
    middleware.swaggerSecurity({
      AuthApiKey: authApiKey
    })
  );

  // Validate Swagger requests
  app.use(
    middleware.swaggerValidator({
      // validateResponse: true
    })
  );

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(routerOptions));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
});

initDb(config.get("table")); // init table

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("listening on port .. ", port);
});

module.exports = server;
