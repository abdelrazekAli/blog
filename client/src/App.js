import React, { Suspense, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Context } from "./context/Context";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// Import views
import About from "./views/About";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Register from "./views/Register";
import EditProfile from "./views/EditProfile";

// Import components
import Blog from "./views/Blog";
import NotFound from "./components/NotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import EditPost from "./components/blog/EditPost";
import PostDetails from "./components/blog/PostDetails";

// Lazy Loading
const AddPost = React.lazy(() => import("./components/blog/AddPost"));

const App = () => {
  const { user } = useContext(Context);

  return (
    <>
      {/* Using basename="/app" to avoid server problems */}
      <BrowserRouter basename="/app">
        <Header />
        <Switch>
          <Route path="/" exact component={Blog} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/posts/:id" component={PostDetails} />
          {user ? (
            <Route
              path="/add-post"
              render={() => {
                return (
                  <Suspense
                    fallback={<Spinner animation="border" role="status" />}
                  >
                    <AddPost />
                  </Suspense>
                );
              }}
            />
          ) : (
            <Redirect from="/add-post" to="/login" />
          )}
          {user && (
            <>
              <Route path="/edit-profile" component={EditProfile} />
              <Route path="/edit-post/:id" component={EditPost} />
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
