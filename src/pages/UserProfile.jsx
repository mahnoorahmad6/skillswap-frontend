import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendRequest } from "../features/user/userSlice";
import "./UserProfile.css";

function UserProfile() {
  const { email } = useParams();
  const dispatch = useDispatch();
  
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);
  
  const user = users.find((u) => u.email === email);

  if (!user) return (
    <div className="dashboard-container">
      <p className="auth-alert text-center">User not found</p>
    </div>
  );

  const isConnected = currentUser.connections.some((c) => c.email === user.email);
  const isPending = currentUser.requestsSent.some((r) => r.email === user.email);

  return (
    <div className="dashboard-container">
      <div className="profile-card-detailed">
        
        {/* Profile Header */}
        <header className="public-profile-header">
          <div className="large-avatar">{user.name.charAt(0)}</div>
          <h1 className="user-name-title">{user.name}</h1>
          <p className="user-email-subtitle">{user.email}</p>
        </header>

        {/* Skills Section */}
        <div className="skills-comparison-grid">
          <div className="skill-box teach-box">
            <span className="box-label">Expertise</span>
            <h3>{user.name} can teach you:</h3>
            <div className="skill-pills">
              {user.teachSkills.map((skill, i) => (
                <span key={i} className="skill-pill-item teach-pill">{skill}</span>
              ))}
              {user.teachSkills.length === 0 && <span className="none-text">None listed</span>}
            </div>
          </div>

          <div className="skill-box learn-box">
            <span className="box-label">Interests</span>
            <h3>{user.name} wants to learn:</h3>
            <div className="skill-pills">
              {user.learnSkills.map((skill, i) => (
                <span key={i} className="skill-pill-item learn-pill">{skill}</span>
              ))}
              {user.learnSkills.length === 0 && <span className="none-text">None listed</span>}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <footer className="profile-actions">
          {isConnected ? (
            <button className="status-btn connected" disabled>
              <span className="icon">✓</span> Friends
            </button>
          ) : isPending ? (
            <button className="status-btn pending" disabled>
              <span className="icon">⏳</span> Request Sent
            </button>
          ) : (
            <button 
              className="status-btn send-req" 
              onClick={() => dispatch(sendRequest(user.email))}
            >
              Connect & Swap Skills
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

export default UserProfile;