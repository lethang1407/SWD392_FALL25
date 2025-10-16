import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/user-api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const response = await login(credentials);

      if (response && response.email && response.role && response.id) {
        localStorage.setItem("email", response.email);
        localStorage.setItem("role", response.role);
        localStorage.setItem("userId", response.id);
        localStorage.setItem("name", response.name);

        toast.success("Login successful!");

        // Redirect based on role
        if (response.role === "admin") {
          navigate("/admin");
        } else if (response.role === "manager") {
          navigate("/dashboard");
        } else if (response.role === "guest") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Login failed:", error.response || error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <Header />
      <div className="position-relative">
        <img
          src="https://cdn.prod.website-files.com/6009ec8cda7f305645c9d91b/640776f5bf589aa0c82c42e4_movie%20poster%20design.jpg"
          className="img-fluid position-absolute w-100 h-100"
          alt="Background"
          style={{ objectFit: "cover", zIndex: -1 }}
        />
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <div className="card p-4 shadow" style={{ maxWidth: "400px", zIndex: 1 }}>
            <h1 className="text-center mb-4">Login</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={handleLogin}>
              Login
            </button>
            <p className="mt-3 text-center">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
