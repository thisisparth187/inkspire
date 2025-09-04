import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlog } from "../services/api";
import CreateBlog from "./CreateBlog";

const CreateBlogWrapper = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await getBlog(id);
        setBlog(data);
      } catch (err) {
        console.error("❌ Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return <CreateBlog existingBlog={blog} />;
};

export default CreateBlogWrapper;
