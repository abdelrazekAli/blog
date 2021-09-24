import React, { Component } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Head from "../blog/Head";

export class PostDetails extends Component {
  state = { post: null };
  componentDidMount() {
    const postId = this.props.match.params.id
      ? this.props.match.params.id
      : null;
    if (postId) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((post) => this.setState({ post: post.data }));
    }
  }
  render() {
    return this.state.post ? (
      <>
        <Head title={this.state.post.title} />
        <Container>
          <Row className="m-4">
            <Col className="col first-letter">{this.state.post.body}</Col>
          </Row>
        </Container>
      </>
    ) : (
      <div className="d-flex justify-content-center m-4">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
}

export default PostDetails;
