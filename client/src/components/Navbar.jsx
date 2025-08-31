import { NavLink, Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
    const linkClasses = ({ isActive }) =>
        isActive
            ? "px-4 text-md font-semibold text-primary transition"
            : "px-4 text-md hover:shadow-lg transition";
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden aria-label">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow-xl">
                        <li><NavLink to="/" className={linkClasses}>Home</NavLink></li>
                        <li><NavLink to="/blogs" className={linkClasses}>Blogs</NavLink></li>
                        <li><NavLink to="/create" className={linkClasses}>Create</NavLink></li>
                    </ul>
                </div>
                <Link to="/" className="p-4 text-xl font-bold">INKSPIRE</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className='px-4 text-md'><NavLink to="/" className={linkClasses}>Home</NavLink></li>
                    <li className='px-4 text-md'><NavLink to="/blogs" className={linkClasses}>Blogs</NavLink></li>
                    <li className='px-4 text-md'><NavLink to="/create" className={linkClasses}>Create</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">

                {isAuthenticated ? (
                    <div className="dropdown dropdown-end mr-4 cursor-pointer">
                        <div tabIndex={0} role="button" className="avatar w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                            <img
                                src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                alt="User Avatar"
                            />
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                        >
                            <li><NavLink to='/profile'>Profile</NavLink></li>
                            <li><button onClick={onLogout}>Logout</button></li>
                        </ul>
                    </div>

                ) : (
                    <Link to="/login" className="btn">Login</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
