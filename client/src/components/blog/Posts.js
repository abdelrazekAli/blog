import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import PostModal from "./PostModal";

export class Posts extends Component {
  state = { posts: [], showModal: false, modalData: {} };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      this.setState({ posts: res.data });
    });
  }

  showModalFun = (post) => {
    this.setState({ modalData: post });
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  renderPosts = () => {
    return this.state.posts.length > 0 ? (
      this.state.posts.map((post) => (
        <Col md={6} lg={4} key={post.id}>
          <Post post={post} onShow={this.showModalFun} />
        </Col>
      ))
    ) : (
      <Spinner animation="border" role="status" />
    );
  };

  render() {
    return (
      <Container>
        <h2 id="posts" className="h3 border-bottom mb-4 pb-4 text-primary">
          Posts
        </h2>
        <Row className="justify-content-center g-4">{this.renderPosts()}</Row>
        <PostModal
          showModal={this.state.showModal}
          hideModal={this.hideModal}
          modalData={this.state.modalData}
        />
      </Container>
    );
  }
}

export default Posts;
