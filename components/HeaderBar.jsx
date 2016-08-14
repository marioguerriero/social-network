var React = require("react");
var ReactDOM = require("react-dom");
var bootstrap = require("react-bootstrap");

var request = require("superagent");

var Nav = bootstrap.Nav;
var Navbar = bootstrap.Navbar;
var NavItem = bootstrap.NavItem;
var NavDropdown = bootstrap.NavDropdown;
var MenuItem = bootstrap.MenuItem;
var Input = bootstrap.Input;
var Button = bootstrap.Button;
var Image = bootstrap.Image;

var HeaderBarUserButton = React.createClass({
  render: function() {
    if(this.props.user) {
      return (
        <Nav pullRight>
          <NavItem href={"/u/" + this.props.user.username}>
            { /*<Image src="/assets/user-thumb.png" responsive circle /> */}
            {this.props.user.username}
          </NavItem>
        </Nav>
      );
    }
    else {
      return(
        <Nav pullRight>
          <NavItem href="register">Register</NavItem>
          <NavItem href="login">Login</NavItem>
        </Nav>
      );
    }
  }
});

var HeaderBar = React.createClass({
  getInitialState: function() {
    return {
      user: null
    }
  },

  render: function() {
    return(
      <Navbar inverse staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Social</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {(() => {
            if(this.props.users) {
              return(<Nav>
                <Navbar.Form pullLeft>
                  <Input type="text" placeholder="Search"/>
                  <Button type="submit">Submit</Button>
                </Navbar.Form>
              </Nav>);
            }
          })()}

          <HeaderBarUserButton user={this.props.user} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports.HeaderBar = HeaderBar;

module.exports.renderToString = function(user) {
  return ReactDOM.renderToString(<HeaderBar user={user} />);
};