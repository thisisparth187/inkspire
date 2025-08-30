import React from "react";
import avatar1 from "../assets/avatars/avatar1.png";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import avatar4 from "../assets/avatars/avatar4.png";

const avatars = [avatar1, avatar2, avatar3, avatar4];

// Utility to pick a random avatar
const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

const AllBlogs = () => {
    // Dummy blogs (replace with API later)
    const blogs = [
        {
            id: 1,
            title: "Featured Blog: The Future of Web Development",
            description:
                "Exploring the latest trends in modern web apps, frameworks, and AI-driven design.",
            author: "Parth",
            date: "Aug 30, 2025",
            featured: true,
        },
        {
            id: 2,
            title: "Why Minimalism Works in UI Design",
            description: "Simplicity improves usability and makes interfaces timeless.",
            author: "John Doe",
            date: "Aug 29, 2025",
        },
        {
            id: 3,
            title: "How to Stay Consistent with Blogging",
            description: "Consistency builds trust, audience, and SEO rankings.",
            author: "Jane Doe",
            date: "Aug 27, 2025",
        },
        {
            id: 4,
            title: "Top 5 JavaScript Tricks You Didn’t Know",
            description: "Level up your JavaScript skills with these powerful tricks.",
            author: "Alex",
            date: "Aug 25, 2025",
        },
    ];

    // Inject avatars dynamically
    const blogsWithAvatars = blogs.map(blog => ({
        ...blog,
        img: getRandomAvatar(),
    }));

    const featuredBlog = blogsWithAvatars.find((blog) => blog.featured);
    const otherBlogs = blogsWithAvatars.filter((blog) => !blog.featured);

    return (
        <div className="container mx-auto px-4 lg:px-50 py-12">
            {/* Featured Blog */}
            {featuredBlog && (
                
                <div className="mb-12 bg-primary-content/30 rounded-2xl p-8 shadow-md">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-900">
                        {featuredBlog.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-gray-700 dark:text-gray-300">
                        {featuredBlog.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                        <div className="avatar">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img src={featuredBlog.img} alt={featuredBlog.author} />
                            </div>
                        <span className="ml-4">
                            By {featuredBlog.author} · {featuredBlog.date}
                        </span>
                        </div>
                    {/* Button */}
                    <button className="btn btn-primary">Read More</button>
                    </div>
                </div>
            )}

            {/* Blog Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {otherBlogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-primary/80 rounded-xl shadow-sm hover:shadow-md p-6 transition"
                    >
                        {/* Blog Title */}
                        <h3 className="text-xl font-semibold mb-3 text-secondary-content">
                            {blog.title}
                        </h3>

                        {/* Blog Description */}
                        <p className="text-base-100 mb-4">{blog.description}</p>

                        {/* Footer: Avatar + Author + Button */}
                        <div className="flex items-center justify-between mt-4">
                            {/* Avatar + Author */}
                            <div className="flex items-center text-sm text-neutral">
                                <div className="avatar">
                                    <div className="w-8 h-8 rounded-full overflow-hidden">
                                        <img src={blog.img} alt={blog.author} />
                                    </div>
                                </div>
                                <span className="ml-2">
                                    By {blog.author} · {blog.date}
                                </span>
                            </div>

                            {/* Button */}
                            <button className="btn btn-active">Read More</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default AllBlogs;
