import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css"; // Make sure to create this file

function Dashboard() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Campus Ride Sharing</h1>
        
        {user ? (
          <div className="user-welcome">
            Welcome back, <span className="user-name">{user.name}</span>!
          </div>
        ) : (
          <div className="auth-alert">
            Please login to continue
          </div>
        )}
      </header>

      <div className="dashboard-grid">
        <Link to="/profile" className="card card-primary">
          <div className="card-content">
            <h2>Go to Profile</h2>
            <p>Manage your account and ride details</p>
          </div>
        </Link>

        <div className="secondary-actions">
          <Link to="/search" className="card card-secondary">
            <div className="card-icon">🔍</div>
            <div className="card-text">
              <h3>Search Skills</h3>
              <p>Find what you need</p>
            </div>
          </Link>

          <Link to="/change-password" title="Security" className="card card-secondary">
            <div className="card-icon">🔑</div>
            <div className="card-text">
              <h3>Security</h3>
              <p>Update password</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;