import { useState, useEffect } from "react";
import axios from "axios";
import Posts from "../components/blog/Posts";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default Blog;
