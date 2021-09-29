import { useContext } from "react";
import axios from "axios";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { Context } from "../../context/Context";

export const Header = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = async () => {
    try {
      let res = await axios.post("/users/logout", { token: user.refreshToken });
      if (res) {
        dispatch({ type: "LOGOUT" });
        window.location.replace("/app");
      }
    } catch (err) {
      window.location.replace("/app");
      console.log(err);
    }
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
            {!user ? (
              <>
                <NavLink className="nav-link" to="/login">
                  login
                </NavLink>

                <NavLink className="nav-link" to="/register">
                  register
                </NavLink>
              </>
            ) : null}
            {user ? (
              <>
                <NavLink className="nav-link" to="/posts/add-post">
                  write
                </NavLink>
                <NavLink className="nav-link" to="/edit-profile">
                  profile
                </NavLink>
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  logout
                </span>
              </>
            ) : null}
            <NavLink className="nav-link" to="/about">
              contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
