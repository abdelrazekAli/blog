import Head from "../components/blog/Head";
import { Container, Row } from "react-bootstrap";

const Profile = () => {
  return (
    <>
      <Head title="username" />
      <Container>
        <Row></Row>
      </Container>

      <p>username posts</p>
      <span>
        in home page if user click on his post , he can edit, delete it
      </span>
    </>
  );
};

export default Profile;
