import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Mern Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="">
            <NavLink className="nav-link" exact to="/">
              home
            </NavLink>
            {/* <NavLink
              className="nav-link"
              to={{
                pathname: "/blog",
                // hash: "#footer",
                // search: "?page=1&id=3",
              }}
            >
              blog
            </NavLink> */}
            <NavLink className="nav-link" to="/posts/add-post">
              write
            </NavLink>
            <NavLink className="nav-link" to="/edit-profile">
              profile
            </NavLink>
            <NavLink className="nav-link" to="/login">
              login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              register
            </NavLink>
            <NavLink className="nav-link" to="/about">
              about
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
