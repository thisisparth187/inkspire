import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BlogDetails from "./pages/BlogDetails";
import AllBlogs from "./pages/AllBlogs";
import CreateBlog from "./pages/CreateBlog";

// This wrapper allows AnimatePresence to use location properly
function AnimatedRoutes({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home isAuthenticated={isAuthenticated} /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login setIsAuthenticated={setIsAuthenticated} /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/blogs/:id" element={<PageWrapper><BlogDetails /></PageWrapper>} />
        <Route path="/blogs" element={<PageWrapper><AllBlogs /></PageWrapper>} />
        <Route path="/create" element={<PageWrapper><CreateBlog /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="flex-grow container mx-auto px-4 py-6">
          <AnimatedRoutes
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
