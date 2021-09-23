import Head from "../components/blog/Head";
import Posts from "../components/blog/Posts";

const Blog = (props) => {
  return (
    <div>
      <Head />
      <Posts {...props} />
    </div>
  );
};

export default Blog;
