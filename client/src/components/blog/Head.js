import { Container } from "react-bootstrap";

const Head = ({ title }) => {
  return (
    <div className="head d-flex justify-content-center align-items-center">
      <Container className="d-flex justify-content-center">
        <h1 className="text-white display-2 mx-3">
          {title ? title : "Welcome to Our Blog"}
        </h1>
      </Container>
    </div>
  );
};

export default Head;
