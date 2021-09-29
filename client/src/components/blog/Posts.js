import axios from "axios";
import Post from "./Post";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/v1/posts");
        res && setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  const showModalFun = (post) => {
    setShowModal(true);
    setModalData(post);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <h2 id="posts" className="h3 border-bottom mb-4 pb-4 text-primary">
        Posts
      </h2>
      <PostModal
        showModal={showModal}
        hideModal={hideModal}
        modalData={modalData}
      />
      <Row className="justify-content-center g-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col md={6} lg={4} key={post._id}>
              <Post post={post} onShow={() => showModalFun(post)} />
            </Col>
          ))
        ) : (
          <Spinner className="my-4" animation="border" role="status" />
        )}
      </Row>
    </Container>
  );
};

export default Posts;
