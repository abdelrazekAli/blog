import { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Post from "../components/blog/Post";
import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { user, dispatch } = useContext(Context);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const [usernameValid, setUsernameValid] = useState({
    touched: false,
    isValid: true,
    msg: "",
  });

  const [emailValid, setEmailValid] = useState({
    touched: false,
    isValid: true,
    msg: "",
  });

  const [posts, setPosts] = useState([]);

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [updateForm, setUpdateForm] = useState(false);
  const [updateSuccess, setupdateSuccess] = useState(false);

  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts?userId=${user._id}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [deleteSuccess, user._id]);

  const refreshToken = async () => {
    try {
      const res = await axios.post("/users/refresh-token", {
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
  const decodedToken = jwt_decode(user.accessToken);
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
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

  const onDelete = async (post) => {
    try {
      let res = await axiosJWT.delete(`/posts/${post._id}`, {
        headers: {
          "auth-token": user.accessToken,
        },
      });
      setDeleteSuccess(!deleteSuccess);
      setShowAlert(true);
    } catch (err) {
      console.log(err);
    }
  };
  const checkUsernameValidation = (e) => {
    let val = e.target.value;
    setUsername(val);
    let valids = { ...usernameValid };
    valids.touched = true;
    if (val.length <= 0) {
      valids.isValid = false;
      valids.msg = "Username is required.";
    } else if (val.length < 4) {
      valids.isValid = false;
      valids.msg = "Username must be more than 3 characters.";
    } else if (val.length > 100) {
      valids.isValid = false;
      valids.msg = "Username must be less than 100 characters.";
    } else {
      valids.isValid = true;
      valids.msg = "";
    }
    setUsernameValid({ ...valids });
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const checkEmailValidation = (e) => {
    let val = e.target.value;
    setEmail(val);
    let valids = { ...emailValid };
    valids.touched = true;
    if (val.length <= 0) {
      valids.isValid = false;
      valids.msg = "Email is required.";
    } else if (!validateEmail(val)) {
      valids.isValid = false;
      valids.msg = "Email is not valid";
    } else if (val.length > 100) {
      valids.isValid = false;
      valids.msg = "Email must be less than 100 characters.";
    } else {
      valids.isValid = true;
      valids.msg = "";
    }
    setEmailValid({ ...valids });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      setError({ isError: false, msg: "" });
      if (usernameValid.isValid && emailValid.isValid) {
        let res = await axiosJWT.put(
          `/users/${user._id}`,
          { username, email },
          { headers: { "auth-token": user.accessToken } }
        );
        if (res) {
          setisLoading(false);
          setupdateSuccess(true);
        }
      }
    } catch (err) {
      setupdateSuccess(false);
      setisLoading(false);
      if (err.response.status === 409) {
        setError({ isError: true, msg: "Email is already used" });
      } else {
        setError({ isError: true, msg: "Somthing went wrong!" });
      }
    }
  };

  const usernameStyle = () => {
    if (usernameValid.touched) {
      if (usernameValid.isValid) {
        return "border border-success";
      } else return "border border-danger";
    }
  };

  const emailStyle = () => {
    if (emailValid.touched) {
      if (emailValid.isValid) {
        return "border border-success";
      } else return "border border-danger";
    }
  };

  const renderPosts = () => {
    return posts.length > 0 ? (
      posts.map((post) => (
        <Col md={6} lg={4} key={post._id}>
          <Post post={post} userProfile={true} onDelete={onDelete} />
        </Col>
      ))
    ) : (
      // <Spinner animation="border" role="status" />
      <h5 className="my-4">
        You do not have any posts, <Link to="/posts/add-post">Write now</Link>
      </h5>
    );
  };

  return (
    <Container>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          className="success-alert"
          dismissible
        >
          <Alert.Heading className="f-1">
            Suceessfully deleted post
          </Alert.Heading>
        </Alert>
      )}
      <Row>
        <Col md={6} lg={4} className=" mx-auto bg-light p-4 my-4 shadow-sm">
          {!updateForm && (
            <div style={{ textAlign: "center" }}>
              <Button
                variant="primary"
                className="w-50"
                onClick={() => setUpdateForm(true)}
              >
                Update Profile
              </Button>
            </div>
          )}
          {/* <h2 className="text-center h4 m-3 text-secondary">Update Profile</h2> */}
          {updateForm && (
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={checkUsernameValidation}
                  className={usernameStyle()}
                />
                {usernameValid.msg && (
                  <small className="text-danger p-1">{usernameValid.msg}</small>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={checkEmailValidation}
                  className={emailStyle()}
                />
                {emailValid.msg && (
                  <small className="text-danger p-1">{emailValid.msg}</small>
                )}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={!usernameValid.isValid || !emailValid.isValid}
              >
                {isLoading ? "Loading ..." : "Update"}
              </Button>
              {updateSuccess && (
                <div className="alert alert-success text-center my-2">
                  Update Successfully
                </div>
              )}
              {error.isError && (
                <div className="alert alert-danger text-center my-2">
                  {error.msg}
                </div>
              )}
            </Form>
          )}
        </Col>
      </Row>
      <h2 id="posts" className="h3 border-bottom mb-4 pb-4 text-primary">
        Your Posts
      </h2>
      <Row className="justify-content-center g-4">{renderPosts()}</Row>
    </Container>
  );
};

export default EditProfile;
