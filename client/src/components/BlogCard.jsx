import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between transition hover:shadow-xl">
      <div>
        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
        <p className="text-sm opacity-90 mb-4">{blog.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <p className="text-xs opacity-80">
          By {blog.author?.username || "Unknown"} ·{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <Link
          to={`/blogs/${blog._id}`}
          className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
