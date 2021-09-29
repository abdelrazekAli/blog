import axios from "axios";
import jwt_decode from "jwt-decode";
import { Context } from "../../context/Context";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import defaultImg from "../../assets/images/defaultImg.jpg";
import {
  Spinner,
  Container,
  Button,
  Card,
  ListGroup,
  Alert,
} from "react-bootstrap";

const PostDetails = (props) => {
  const { user, dispatch } = useContext(Context);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showAlert, setShowAlert] = useState({
    isError: false,
    isSuccess: false,
  });

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/api/v1/posts/${id}`);
      setPost(res.data);
    };
    fetchPost();
  }, [id]);

  const axiosJWT = axios.create();
  if (user) {
    const refreshToken = async () => {
      try {
        const res = await axios.post("/api/v1/users/refresh-token", {
          token: user.refreshToken,
        });
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { ...user, accessToken: res.data.accessToken },
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

    //This will run before every axios request to refresh token
    const decodedToken = jwt_decode(user.accessToken);
    axiosJWT.interceptors.request.use(
      async (config) => {
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await refreshToken();
          config.headers["auth-token"] = data.accessToken;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }
  const onDelete = async (postId) => {
    try {
      let res = await axiosJWT.delete(`/api/v1/posts/${postId}`, {
        headers: {
          "auth-token": user.accessToken,
        },
      });
      if (res) {
        setShowAlert({ isError: false, isSuccess: true });
        setTimeout(window.location.replace("/app"), 3000);
      }
    } catch (err) {
      setShowAlert({ isError: true, isSuccess: false });
    }
  };

  return post ? (
    <Container>
      {showAlert.isError && (
        <Alert
          variant="danger"
          onClose={() =>
            setShowAlert({
              isError: false,
              isSuccess: false,
            })
          }
          className="success-alert"
          dismissible
        >
          <Alert.Heading className="f-1">Somthing went wrong!</Alert.Heading>
        </Alert>
      )}
      {showAlert.isSuccess && (
        <Alert
          variant="success"
          onClose={() =>
            setShowAlert({
              isError: false,
              isSuccess: false,
            })
          }
          className="success-alert"
          dismissible
        >
          <Alert.Heading className="f-1">
            Post has been successfully deleted
          </Alert.Heading>
        </Alert>
      )}
      <Card className="my-4">
        <div style={{ textAlign: "center" }}>
          <Card.Img
            className="w-50 my-2"
            src={
              post.postImg
                ? `https://azstorageabdelrazek.blob.core.windows.net/postimgs/${post.postImg}`
                : defaultImg
            }
          />
        </div>
        <Card.Body>
          <div className="px-1 text-center">
            <Card.Title>{post.title}</Card.Title>
            <Card.Text className="first-letter" style={{ lineHeight: 2 }}>
              {post.body}
            </Card.Text>
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
            {user && user._id === post.createdBy._id ? (
              <ListGroup.Item>
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
                <Button variant="danger" onClick={() => onDelete(id)}>
                  Delete Post
                </Button>
              </ListGroup.Item>
            ) : null}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <div className="d-flex justify-content-center m-4">
      <Spinner animation="border" role="status" />
    </div>
  );
};

export default PostDetails;
