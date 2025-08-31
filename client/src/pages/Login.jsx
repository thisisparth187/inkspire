import React, { useState } from 'react';
import { login } from '../services/authServices';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-5 w-5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token); // save JWT
      // redirect to dashboard
      window.location.href = "/profile";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl p-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-2 rounded-md bg-base-200">
            <UserIcon />
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm opacity-70">Enter your credentials to sign in</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="label py-2">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input w-full focus:outline-0"
            />
          </div>

          <div>
            <label htmlFor="password" className="label py-2">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input w-full focus:outline-0 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 space-y-2">
          <p className="text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="link link-primary">
              Sign up
            </a>
          </p>
          <a href="#" className="link link-hover text-sm">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
