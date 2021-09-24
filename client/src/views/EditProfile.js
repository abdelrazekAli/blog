import { Button, Container, Form, Row, Col } from "react-bootstrap";

const EditProfile = () => {
  return (
    <Container>
      <Row>
        <Col md={6} lg={4} className=" mx-auto bg-light p-4 my-4 shadow-sm">
          <h2 className=" text-center h4 m-3 text-secondary">Update Profile</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
      <p>posts</p>
      <span>
        in home page if user click on his post , he can edit, delete it
      </span>
    </Container>
  );
};

export default EditProfile;
