var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var db = require("./db");
db.init();

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("fs"));

app.use(morgan("dev"));

app.use(require("./router/api"));
app.use(require("./router/upload"));
app.use(require("./router/view"));

// Put the server on listening status
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8081);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.listen(app.get('port'), app.get('ip'), function() {
  console.log("Server listening on port " + this.address().port);
});
