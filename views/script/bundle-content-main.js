var React = require("react");
var ReactDOM = require("react-dom");

var AuthenticationForm = React.createElement(
  require("./../../components/Authentication.jsx").AuthenticationForm);

ReactDOM.render(AuthenticationForm, document.getElementById("content"));
