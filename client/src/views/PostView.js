import React from "react";
import PostDetails from "../components/blog/PostDetails";

const PostView = (props) => {
  return (
    <div>
      <PostDetails {...props} />
    </div>
  );
};

export default PostView;
