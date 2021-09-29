import { useContext } from "react";
import Head from "../components/blog/Head";
import Posts from "../components/blog/Posts";
import { Context } from "../context/Context";

const Blog = () => {
  const { user } = useContext(Context);

  return (
    <div>
      <Head title={user && `Welcome ${user.username}, to our blog`} />
      <Posts />
    </div>
  );
};

export default Blog;
