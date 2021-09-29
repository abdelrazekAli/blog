import axios from "axios";
import { useState, useEffect } from "react";
import Posts from "../components/blog/Posts";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
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
