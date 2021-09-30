import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { Card, Button, ListGroup } from "react-bootstrap";
import defaultImg from "../../assets/images/defaultImg.jpg";

const Post = ({ post, onShow, userProfile, onDelete, modalBtn }) => {
  const { user } = useContext(Context);

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
    <Card className="mb-4 mx-4 mx-lg-0">
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
            {user && user._id === post.createdBy._id ? (
              <Link className="username-link" to="/edit-profile">
                {post.createdBy ? post.createdBy.username : "user"}
              </Link>
            ) : (
              <Link
                className="username-link"
                to={{
                  pathname: `/profile/${post.createdBy._id}`,
                  state: {
                    username: post.createdBy.username,
                  },
                }}
              >
                {post.createdBy ? post.createdBy.username : "user"}
              </Link>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            {new Date(post.createdAt).toDateString()}
          </ListGroup.Item>
          <ListGroup.Item>
            <Link
              className="btn btn-primary"
              style={{ marginRight: "5px" }}
              to={`/posts/${post._id}`}
            >
              Open Post
            </Link>
            {!userProfile && (
              <Button variant="primary" onClick={() => onShow(post)}>
                Open Modal
              </Button>
            )}
            {userProfile && (
              <>
                <Link
                  className="btn btn-primary"
                  to={{
                    pathname: `/edit-post/${post._id}`,
                    state: {
                      postTitle: post.title,
                      postBody: post.body,
                      postImg: post.postImg,
                    },
                  }}
                  style={{ marginRight: "5px" }}
                >
                  Edit Post
                </Link>
                <Button variant="danger" onClick={() => onDelete(post)}>
                  Delete Post
                </Button>
              </>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Post;
