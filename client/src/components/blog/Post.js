import { Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/images/defaultImg.jpg";

const Post = ({ post, onShow }) => {
  // Cut post body
  const cutString = () => {
    if (post.body.length < 150) return post.body;
    let trimmedString = post.body.substr(0, 150);
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );
    return `${trimmedString} . . .`;
  };

  return (
    <Card className="mb-4">
      <Link to={`/posts/${post._id}`}>
        <Card.Img
          variant="top"
          src={
            post.postImg
              ? `https://azstorageabdelrazek.blob.core.windows.net/postimgs/${post.postImg}`
              : defaultImg
          }
        />
      </Link>
      <Card.Body>
        <div className="px-1 text-center">
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{cutString()}</Card.Text>
        </div>
        <ListGroup variant="flush">
          <ListGroup.Item>
            {new Date(post.createdAt).toDateString()}
          </ListGroup.Item>
          <ListGroup.Item>
            <Link className="username-link" to={"/profile"}>
              {post.createdBy.username}
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link
              className="btn btn-primary"
              style={{ marginRight: "5px" }}
              to={`/posts/${post._id}`}
            >
              Open Post
            </Link>
            <Button variant="primary" onClick={() => onShow(post)}>
              Open Modal
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Post;
