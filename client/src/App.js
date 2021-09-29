import React, { Suspense, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Context } from "./context/Context";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// Import views
import Land from "./views/Land";
import About from "./views/About";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Register from "./views/Register";
import PostView from "./views/PostView";
import EditProfile from "./views/EditProfile";

// Import components
import EditPost from "./components/blog/EditPost";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NotFound from "./components/NotFound";

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
          <Route path="/" exact component={Land} />
          <Route path="/about" component={About} />
          <Route path="/edit-post/:id" component={EditPost} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {user ? (
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
            <Redirect from="/posts/add-post" to="/login" />
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
