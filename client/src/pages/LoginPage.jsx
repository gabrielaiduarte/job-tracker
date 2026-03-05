import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { saveToken } from "../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      const data = await loginUser(email, password);
      saveToken(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="jt-page jt-auth-page">
      <div className="jt-auth-card">
        <div className="jt-auth-header">
          <div className="jt-auth-icon" aria-hidden="true">🔒</div>
          <h1 className="jt-auth-title">Login</h1>
          <p className="jt-auth-subtitle">Welcome back. Sign in to continue.</p>
        </div>

        <form className="jt-auth-form" onSubmit={handleSubmit}>
          <div className="jt-form-group">
            <label className="jt-label">Email</label>
            <input
              className="jt-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@email.com"
            />
          </div>

          <div className="jt-form-group">
            <label className="jt-label">Password</label>
            <input
              className="jt-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="jt-alert">{error}</p>}

          <button className="jt-primary-btn jt-full" type="submit">
            Login
          </button>
        </form>

        <p className="jt-auth-footer">
          Don&apos;t have an account?{" "}
          <Link className="jt-link" to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}