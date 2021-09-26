import React, { Suspense, useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Land from "./views/Land";
import About from "./views/About";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Register from "./views/Register";
import PostView from "./views/PostView";
import EditProfile from "./views/EditProfile";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NotFound from "./components/NotFound";
import { Context } from "./context/Context";

// Lazy Loading
const AddPost = React.lazy(() => import("./components/blog/AddPost"));

const App = () => {
  const isUser = true;
  const { user, dispatch } = useContext(Context);

  const refreshToken = async () => {
    try {
      const res = await axios.post("users/refresh-token", {
        token: user.refreshToken,
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { ...user, accessToken: res.data.accessToken },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();
  //This will run before every axios request to refresh token
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["auth-token"] = data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return (
    <>
      {/* Using basename="/app" to avoid server problems */}
      <BrowserRouter basename="/app">
        <Header />
        <Switch>
          <Route path="/" exact component={Land} />
          {/* <Route path="/blog" component={Blog} /> */}
          <Route path="/about" component={About} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {isUser ? (
            <Route
              path="/posts/add-post"
              render={(props) => {
                return (
                  <Suspense
                    fallback={<Spinner animation="border" role="status" />}
                  >
                    <AddPost {...props} />
                  </Suspense>
                );
              }}
            />
          ) : (
            <Redirect from="/posts/add-post" to="/" />
          )}
          <Route path="/posts/:id" component={PostView} />
          <Redirect from="/home" to="/" />
          <Route component={NotFound} />
          {/* Redirect "from" attribute is used only on switch */}
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
