import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(registerUser(form)).unwrap();

      setForm({
        name: "",
        email: "",
        password: ""
      });

      navigate("/login");

    } catch (err) {
      setError(err || "Registration failed");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">Get Started</h1>
          <p className="auth-subtitle">
            Join the SkillSwap community today.
          </p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="name@university.edu"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit" className="auth-submit-btn">
            Create Account
          </button>
        </form>

        <footer className="auth-footer">
          <p>
            Already have an account? 
            <Link to="/login"> Sign In</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Register;