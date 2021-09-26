import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

const Register = () => {
  const [usernameValid, setUsernameValid] = useState({
    touched: false,
    isValid: false,
    msg: "",
  });

  const [emailValid, setEmailValid] = useState({
    touched: false,
    isValid: false,
    msg: "",
  });

  const [passwordValid, setPasswordValid] = useState({
    touched: false,
    isValid: false,
    msg: "",
  });

  const checkUsernameValidation = (e) => {
    let val = e.target.value.trim();
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
    let val = e.target.value.trim();
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

  const checkPasswordValidation = (e) => {
    let val = e.target.value.trim();
    let valids = { ...passwordValid };
    valids.touched = true;
    if (val.length <= 0) {
      valids.isValid = false;
      valids.msg = "Password is required.";
    } else if (val.length < 4) {
      valids.isValid = false;
      valids.msg = "Password must be more than 3 characters.";
    } else if (val.length > 255) {
      valids.isValid = false;
      valids.msg = "Password must be less than 255 characters.";
    } else {
      valids.isValid = true;
      valids.msg = "";
    }
    setPasswordValid({ ...valids });
  };

  const addPostHandler = async (e) => {
    e.preventDefault();
    let username = e.target.username.value,
      email = e.target.email.value,
      password = e.target.password.value;
    if (emailValid.isValid && passwordValid.isValid) {
      console.log({ username, email, password });
      // setisLoading(true);
      // let res = await sendPost({ username, email, password });
      // console.log(res);
      // e.target.reset();
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

  const passwordStyle = () => {
    if (passwordValid.touched) {
      if (passwordValid.isValid) {
        return "border border-success";
      } else return "border border-danger";
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} lg={4} className=" mx-auto bg-light p-4 my-4 shadow-sm">
          <h2 className=" text-center h4 m-3 text-secondary">Register</h2>
          <Form onSubmit={addPostHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                onBlur={checkUsernameValidation}
                className={usernameStyle()}
              />
              {usernameValid.msg && (
                <small className="text-danger p-1">{usernameValid.msg}</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onBlur={checkEmailValidation}
                className={emailStyle()}
              />
              {emailValid.msg && (
                <small className="text-danger p-1">{emailValid.msg}</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaintextPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onBlur={checkPasswordValidation}
                className={passwordStyle()}
              />
              {passwordValid.msg && (
                <small className="text-danger p-1">{passwordValid.msg}</small>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!emailValid.isValid || !passwordValid.isValid}
            >
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
