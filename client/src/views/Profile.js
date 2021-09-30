import axios from "axios";
import Head from "../components/blog/Head";
import Post from "../components/blog/Post";
import PostModal from "../components/blog/PostModal";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Row, Spinner, Col } from "react-bootstrap";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const { id } = useParams();
  const { username } = location.state;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/v1/posts?userId=${id}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [id]);

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
    <>
      <Head title={`${username}`} />
      <Container>
        <h2 id="posts" className="h3 border-bottom mb-4 pb-4 text-primary">
          {username} posts
        </h2>
        <PostModal
          showModal={showModal}
          hideModal={hideModal}
          modalData={modalData}
        />
        <Row className="justify-content-center g-4">{renderPosts()}</Row>
      </Container>
    </>
  );
};

export default Profile;
