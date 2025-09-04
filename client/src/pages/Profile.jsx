import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getBlogs } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check auth & load user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login"); // redirect if not logged in
    } else {

      setUser(JSON.parse(storedUser)); // store full user object


    }
  }, [navigate]);
  // ✅ Fetch only user's blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await getBlogs();
        if (user?.id) {
          const myBlogs = data.filter(
            (blog) => blog.author?._id === user.id
          );
          console.log(myBlogs);
          setBlogs(myBlogs);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    if (user) fetchBlogs();

    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  if (!user) return null; // avoid crash while loading

  return (
    <div className="bg-base-300 min-h-screen rounded-3xl mx-6 md:mx-16 overflow-hidden shadow-lg">
      {/* Banner */}
      <div className="relative h-40 md:h-56 bg-gradient-to-r from-primary/80 to-secondary/80" />

      {/* Avatar + Info */}
      <div className="relative px-6 md:px-12 lg:mt-10">
        <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-base-300 object-cover shadow-lg"
          />
          <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{user.username}</h1>
            <p className="text-base-content/70 flex justify-center md:justify-start items-center gap-2">
              <FiMail /> {user.email}
            </p>
            <p className="mt-2 text-base-content/80">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center md:justify-start gap-12 px-6 md:px-12 py-6 border-b border-base-200 mt-6">
        <div className="text-center">
          <p className="text-xl font-bold">{blogs.length}</p>
          <p className="text-base-content/70">Blogs</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{user.followers?.length || 0}</p>
          <p className="text-base-content/70">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{user.following?.length || 0}</p>
          <p className="text-base-content/70">Following</p>
        </div>
      </div>

      {/* Blog Carousel */}
      <div className="px-6 md:px-12 py-8">
        <h2 className="text-2xl font-bold">My Blogs</h2>
        <div className="w-full mt-12">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={5}
            slidesPerView={1}
            navigation={isLargeScreen}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="pb-10"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog._id}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

const BlogCard = ({ blog }) => (
  <div className="card bg-neutral text-neutral-content shadow-xl h-full lg:mx-20 lg:my-10">
    <div className="card-body m-5 lg:m-10">
      <h2 className="card-title lg:text-2xl font-bold">{blog.title}</h2>
      <p className="opacity-80 hidden lg:block">{blog.description}</p>
      <div className="card-actions justify-between items-center mt-4">
        <p className="text-sm opacity-70">
          By {blog.author?.username || "Unknown"} ·{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <Link
          to={`/blogs/edit/${blog._id}`}
          className="btn btn-secondary mt-5 lg:mt-0"
        >
          Edit Blog
        </Link>
      </div>
    </div>
  </div>
);

export default Profile;
