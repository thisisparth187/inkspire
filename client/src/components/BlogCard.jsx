import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
	return (
		<div className="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl h-full">
			<div className="card-body">
				<h2 className="card-title font-bold">{blog.title}</h2>
				<p className="opacity-80">{blog.description}</p>
				<div className="card-actions justify-between items-center mt-4">
					<p className="text-xs opacity-70">
						By {blog.author?.username || "Unknown"} ·{" "}
						{new Date(blog.createdAt).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						})}
					</p>
					<Link to={`/blogs/${blog._id}`} className="btn btn-secondary">
						Read More
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
