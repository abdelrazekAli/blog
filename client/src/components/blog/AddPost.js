import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useContext } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../context/Context";

const AddPost = (props) => {
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");

  const { user, dispatch } = useContext(Context);

  const [titleValid, setTitleValid] = useState({
    touched: false,
    isValid: false,
    msg: "",
  });

  const [bodyValid, setBodyValid] = useState({
    touched: false,
    isValid: false,
    msg: "",
  });

  const [image, setImage] = useState(null);

  const [isLoading, setisLoading] = useState(false);

  const [addSuccess, setaddSuccess] = useState(false);

  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  const checkTitleValidation = (e) => {
    let val = e.target.value.trim();
    let valids = { ...titleValid };
    valids.touched = true;
    if (val.length <= 0) {
      valids.isValid = false;
      valids.msg = "Title is required.";
    } else if (val.length < 3) {
      valids.isValid = false;
      valids.msg = "Title must be more than 2 characters.";
    } else if (val.split(" ").length > 10) {
      valids.isValid = false;
      valids.msg = "Title must be less than 10 words.";
    } else {
      valids.isValid = true;
      valids.msg = "";
    }
    setTitleValid({ ...valids });
  };

  const checkBodyValidation = (e) => {
    let val = e.target.value.trim();
    let valids = { ...bodyValid };
    valids.touched = true;
    if (val.length <= 0) {
      valids.isValid = false;
      valids.msg = "Body is required.";
    } else if (val.length < 5) {
      valids.isValid = false;
      valids.msg = "Body must be more than 4 characters.";
    } else if (val.split(" ").length > 500) {
      valids.isValid = false;
      valids.msg = "Body must be less than 500 words.";
    } else {
      valids.isValid = true;
      valids.msg = "";
    }
    setBodyValid({ ...valids });
  };

  const titleStyle = () => {
    if (titleValid.touched) {
      if (titleValid.isValid) {
        return "border border-success";
      } else return "border border-danger";
    }
  };

  const bodyStyle = () => {
    if (bodyValid.touched) {
      if (bodyValid.isValid) {
        return "border border-success";
      } else return "border border-danger";
    }
  };

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

  const addPostHandler = async (e) => {
    e.preventDefault();
    try {
      if (titleValid.isValid && bodyValid.isValid && image) {
        let formData = new FormData();
        formData.append("title", e.target.title.value);
        formData.append("body", e.target.body.value);
        formData.append("image", image);

        setisLoading(true);

        let res = await axiosJWT({
          method: "post",
          url: "/posts",
          data: formData,
          headers: {
            "auth-token": user.accessToken,
            "Content-Type": "multipart/form-data",
          },
        });

        e.target.reset();
        if (res.data) {
          window.location.replace(`/app/posts/${res.data._id}`);
          setisLoading(false);
          setaddSuccess(true);
        }
      }
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setaddSuccess(false);
      if (err.response.status === 400) {
        setError({ isError: true, msg: "Invalid inputs" });
      } else {
        setError({ isError: true, msg: "Somthing went wrong!" });
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} lg={4} className=" mx-auto bg-light p-4 my-4 shadow-sm">
          <h2 className=" text-center h4 m-3 text-secondary">Add Post</h2>
          <Form onSubmit={addPostHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Post title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                className={titleStyle()}
                onBlur={checkTitleValidation}
                autoFocus
              />
              {titleValid.msg && (
                <small className="text-danger p-1">{titleValid.msg}</small>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Post body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="body"
                className={bodyStyle()}
                onChange={checkBodyValidation}
              />
              {bodyValid.msg && (
                <small className="text-danger p-1">{bodyValid.msg}</small>
              )}
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Post image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/png, image/jpeg, image/jpg, image/JPG, image/svg, image/webp"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!titleValid.isValid || !bodyValid.isValid || !image}
            >
              {isLoading ? "Loading ..." : "Add New Post"}
            </Button>
          </Form>
          {addSuccess && (
            <div className="alert alert-success text-center my-2">
              Post Added Successfully
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddPost;
