import Blog from "../views/Blog";
import { useContext } from "react";
import Head from "../components/blog/Head";
import { Context } from "../context/Context";

const Land = () => {
  const { user } = useContext(Context);

  return (
    <div>
      <Head title={user && `Welcome ${user.username}, to our blog`} />
      <Blog />
    </div>
  );
};

export default Land;
