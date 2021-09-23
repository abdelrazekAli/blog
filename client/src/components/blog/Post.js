import { Card, Button } from "react-bootstrap";
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
      <Card.Img variant="top" src={defaultImg} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{cutString()}</Card.Text>
        <Link
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
          to={`/posts/${post.id}`}
        >
          Open Post
        </Link>
        <Button variant="primary" onClick={() => onShow(post)}>
          Open Modal
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Post;
