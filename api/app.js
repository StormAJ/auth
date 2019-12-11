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
const cors = require("cors");

//swaggerRouter configuration
var routerOptions = {
  controllers: "./controllers",
  useStubs: process.env.NODE_ENV === "development" ? true : false // Conditionally turn on stubs (mock mode)
};

//swaggerRouter configuration
var uiOptions = {
  apiDocs: "/api/api-docs",
  apiDocsPrefix: "/api",
  swaggerUi: "/api/docs",
  swaggerUiPrefix: ""
  // swaggerUiDir: "/api"
  // }
};

const file = fs
  .readFileSync("./swagger/swagger.yaml", "utf8")
  .replace("${apiHost}", config.get("apiHost"));

const swaggerDoc = YAML.parse(file);

function authApiKey(req, def, token, callback) {
  if (req.headers["x-api-key"] != config.get("APIKey")) {
    return callback(req.res.status(403).json({ message: " Access denied" }));
  } else return callback(null);
}

app.use(express.json()); // converts the http request data into a json object, accessed by req.body
app.use(express.urlencoded({ extended: true })); // read data from request added to url
app.use(cors()); // enables CORS access (Cross Origin Resource Sharing)
// app.use(express.static("public")); // return static content from folder "./pulbic" on http request to url "/filename"
// app.use(helmet());
app.use("/api", home);
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
  // app.use(
  //   middleware.swaggerValidator({
  //     // validateResponse: true
  //   })
  // );

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(routerOptions));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi(uiOptions));
});

initDb(config.get("table")); // init table

const port = process.env.auth_apiPort || 3001;
const server = app.listen(port, () => {
  console.log("listening on port .. ", port);
  // document.cookie = "auth_test=auth";
});

module.exports = server;
