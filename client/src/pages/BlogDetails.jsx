import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../services/api";
import { FiCalendar, FiUser } from "react-icons/fi";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await getBlog(id);
        setBlog(res.data);
      } catch (err) {
        setError("Failed to fetch blog post. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center text-gray-500 font-semibold">
        Blog post not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <article>
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4 leading-tight">
            {blog.title}
          </h1>
          <p className="text-lg md:text-xl text-base-content opacity-80">
            {blog.description}
          </p>
        </header>

        {/* Author Info */}
        <div className="flex items-center bg-base-200 p-4 rounded-lg mb-8">
          <img
            src={blog.author.avatar}
            alt={blog.author.username}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <span className="font-semibold text-lg flex items-center">
              <FiUser className="mr-2" />
              {blog.author.username}
            </span>
            <span className="text-sm text-base-content opacity-70 flex items-center mt-1 sm:mt-0">
              <FiCalendar className="mr-2" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Blog Content */}

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

      </article>
    </div>
  );
};

export default BlogDetails;
