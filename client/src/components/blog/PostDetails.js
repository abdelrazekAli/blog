import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Spinner, Container, Row, Col, Image } from "react-bootstrap";
import defaultImg from "../../assets/images/defaultImg.jpg";

const PostDetails = (props) => {
  const path = useLocation().pathname.split("/")[2];
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/posts/${path}`);
      setPost(res.data);
    };
    fetchPost();
  }, [path]);

  return post ? (
    <Container className="text-center">
      <h3>{post.title}</h3>
      <Row className="justify-content-center">
        <Col xs={6} md={6}>
          <Image
            src={
              post.postImg
                ? `https://azstorageabdelrazek.blob.core.windows.net/postimgs/${post.postImg}`
                : defaultImg
            }
            fluid
          />
        </Col>
      </Row>
      <p className="m-4 col first-letter">{post.body}</p>
      <h6>Author: {post.createdBy.username}</h6>
      <h6>Created at: {new Date(post.createdAt).toDateString()}</h6>
    </Container>
  ) : (
    <div className="d-flex justify-content-center m-4">
      <Spinner animation="border" role="status" />
    </div>
  );
};

export default PostDetails;
