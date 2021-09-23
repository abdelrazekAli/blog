import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React Bolg</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="">
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              to={{
                pathname: "/blog",
                // hash: "#footer",
                // search: "?page=1&id=3",
              }}
            >
              Blog
            </NavLink>
            <NavLink className="nav-link" to="/posts/add-post">
              Add Post
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
