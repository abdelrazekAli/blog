import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

const AddPost = (props) => {
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");

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

  const [isLoading, setisLoading] = useState(false);

  const [addSuccess, setaddSuccess] = useState(false);

  const checkTitleValidation = (e) => {
    let val = e.target.value.trim();
    let valids = { ...titleValid };
    valids.touched = true;
    if (val.length <= 0) {
      valids.isValid = false;
      valids.msg = "Title is required.";
    } else if (val.split(" ").length < 3) {
      valids.isValid = false;
      valids.msg = "Title must be more than 2 words.";
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
    } else if (val.split(" ").length < 10) {
      valids.isValid = false;
      valids.msg = "Title must be more than 10 words.";
    } else if (val.split(" ").length > 500) {
      valids.isValid = false;
      valids.msg = "Title must be less than 500 words.";
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

  const addPostHandler = async (e) => {
    e.preventDefault();
    let title = e.target.title.value,
      body = e.target.body.value;
    if (titleValid.isValid && bodyValid.isValid) {
      setisLoading(true);
      let res = await sendPost({ title, body });
      console.log(res);
      e.target.reset();
    }
  };

  const sendPost = (post) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(post);
        setisLoading(false);
        setaddSuccess(true);
        // setTitle("");
        // setBody("");
      }, 2000);
    });
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
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!titleValid.isValid || !bodyValid.isValid}
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
