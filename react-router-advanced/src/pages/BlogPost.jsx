import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams(); // id will be the value in the URL
  return <h1>Blog Post ID: {id}</h1>;
};

export default BlogPost;