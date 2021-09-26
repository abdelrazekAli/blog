import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Spinner } from "react-bootstrap";
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

// Lazy Loading
const AddPost = React.lazy(() => import("./components/blog/AddPost"));

const App = () => {
  const isUser = true; //Admin Guard
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
