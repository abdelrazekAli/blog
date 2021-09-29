import React, { Suspense, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Context } from "./context/Context";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// Import views
import Login from "./views/Login";
import Profile from "./views/Profile";
import Register from "./views/Register";
import EditProfile from "./views/EditProfile";

// Import components
import Blog from "./views/Blog";
import NotFound from "./components/NotFound";
import AddPost from "./components/blog/AddPost";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import EditPost from "./components/blog/EditPost";
import PostDetails from "./components/blog/PostDetails";

// Lazy Loading
const About = React.lazy(() => import("./views/About"));

const App = () => {
  const { user } = useContext(Context);

  return (
    <>
      {/* Using basename="/app" to avoid server problems */}
      <BrowserRouter basename="/app">
        <Header />
        <Switch>
          <Route path="/" exact component={Blog} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route
            path="/about"
            render={() => {
              return (
                <Suspense
                  fallback={
                    <div className="d-flex justify-content-center">
                      <Spinner
                        className="my-4"
                        animation="border"
                        role="status"
                      />
                    </div>
                  }
                >
                  <About />
                </Suspense>
              );
            }}
          />
          {user ? (
            <>
              <Route path="/edit-profile" component={EditProfile} />
              <Route path="/add-post" component={AddPost} />
              <Route path="/edit-post/:id" component={EditPost} />
            </>
          ) : (
            <>
              <Redirect from="/edit-profile" to="/login" />
              <Redirect from="/add-post" to="/login" />
              <Redirect from="/edit-post/:id" to="/login" />
            </>
          )}

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
