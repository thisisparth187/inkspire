import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Link } from "react-router-dom";

const FeaturedCarousel = ({ blogs }) => {
    if (!blogs || blogs.length === 0) return null;

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Featured <span className="text-primary">Blogs</span>
            </h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {blogs.map((blog) => (
                    <SwiperSlide key={blog._id}>
                        <div className="bg-black text-white p-8 rounded-2xl shadow-xl mb-12">
                            <h2 className="text-3xl font-extrabold mb-4">
                                Featured Blog: {blog.title}
                            </h2>
                            <p className="text-lg opacity-90 mb-6">{blog.description}</p>

                            <div className="flex items-center justify-between">
                                <p className="text-sm opacity-80">
                                    By {blog.author?.username || "Unknown"} ·{" "}
                                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                                <Link
                                    to={`/blogs/${blog._id}`}
                                    className="bg-green-500 text-black font-semibold px-6 py-2 rounded-full hover:bg-green-400 transition"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedCarousel;
