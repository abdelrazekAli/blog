import { useState } from "react";
import Post from "./Post";
import PostModal from "./PostModal";
import { Row, Col, Container, Spinner } from "react-bootstrap";

const Posts = ({ posts }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModalFun = (post) => {
    setShowModal(true);
    setModalData(post);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const renderPosts = () => {
    return posts.length > 0 ? (
      posts.map((post) => (
        <Col md={6} lg={4} key={post._id}>
          <Post post={post} onShow={() => showModalFun(post)} />
        </Col>
      ))
    ) : (
      <Spinner animation="border" role="status" />
    );
  };

  return (
    <Container>
      <h2 id="posts" className="h3 border-bottom mb-4 pb-4 text-primary">
        Posts
      </h2>
      <Row className="justify-content-center g-4">{renderPosts()}</Row>
      <PostModal
        showModal={showModal}
        hideModal={hideModal}
        modalData={modalData}
      />
    </Container>
  );
};

export default Posts;
