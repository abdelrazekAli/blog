import { useContext } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { Context } from "../../context/Context";

export const Header = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link className="white-link" to={"/"}>
            Mern Blog
          </Link>
        </Navbar.Brand>
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
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              logout
            </span>
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
