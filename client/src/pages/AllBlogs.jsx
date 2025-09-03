import { useEffect, useState } from "react";
import { getBlogs } from "../services/api";
import BlogCard from "../components/BlogCard";
import FeaturedBlog from "../components/FeaturedCarousel";

const AllBlogs = () => {
  const [featured, setFeatured] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await getBlogs();
        setFeatured(data.find((b) => b.isFeatured));
        setBlogs(data.filter((b) => !b.isFeatured));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="space-y-12">
      {/* Featured */}
      {featured && <FeaturedBlog blog={featured} />}

      {/* Blogs Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Blogs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllBlogs;
