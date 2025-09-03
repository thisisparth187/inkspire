import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

const FeaturedCarousel = ({ blogs }) => {
	if (!blogs || blogs.length === 0) return null;

	return (
		<div className="w-full mb-12">
			<h2 className="text-3xl font-bold mb-8 text-center">
				Featured <span className="text-primary">Blogs</span>
			</h2>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={60}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				breakpoints={{
					768: { slidesPerView: 1 },
					1024: { slidesPerView: 1 },
				}}
				className="pb-10"
			>
				{blogs.map((blog) => (
					<SwiperSlide key={blog._id}>
						<div className="card bg-neutral text-neutral-content shadow-xl h-full lg:mx-20 lg:my-10">
							<div className="card-body m-10">
								<h2 className="card-title text-2xl font-bold">{blog.title}</h2>
								<p className="opacity-80">{blog.description}</p>
								<div className="card-actions justify-between items-center mt-4">
									<p className="text-sm opacity-70">
										By {blog.author?.username || "Unknown"} ·{" "}
										{new Date(blog.createdAt).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</p>
									<Link to={`/blogs/${blog._id}`} className="btn btn-primary">
										Read More
									</Link>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default FeaturedCarousel;
