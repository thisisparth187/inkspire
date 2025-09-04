import { useEffect, useState } from "react";
import { getBlogs } from "../services/api";
import BlogCard from "../components/BlogCard";
import FeaturedCarousel from "../components/FeaturedCarousel";

const AllBlogs = () => {
    const [featured, setFeatured] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await getBlogs();
                const featuredBlogs = data.filter((b) => b.featured === true);
                const regularBlogs = data.filter((b) => !b.featured);

                console.log("Featured ->", featuredBlogs);
                console.log("Regular ->", regularBlogs);
                setFeatured(featuredBlogs);
                setBlogs(regularBlogs);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto px-4 lg:px-32 py-8">
            {/* Featured Blogs Carousel */}
            {featured.length > 0 && <FeaturedCarousel blogs={featured} />}

            {/* All Other Blogs */}
            <section className="mt-12">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    All <span className="text-primary">Blogs</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AllBlogs;
