import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { sendRequest } from "../features/user/userSlice";
import "./UserProfile.css";

function UserProfile() {
  const { id } = useParams();                    // ✅ id not email
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/user/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div className="dashboard-container"><p>Loading...</p></div>;
  if (!user) return <div className="dashboard-container"><p className="auth-alert text-center">User not found</p></div>;

  const connections = currentUser?.connections || [];
  const requestsSent = currentUser?.requestsSent || [];

  const isConnected = connections.some((c) => c._id?.toString() === user._id?.toString() || c.toString() === user._id?.toString());
const isPending = requestsSent.some((r) => r._id?.toString() === user._id?.toString() || r.toString() === user._id?.toString());
  return (
    <div className="dashboard-container">
      <div className="profile-card-detailed">

        <header className="public-profile-header">
          <div className="large-avatar">{user.name.charAt(0)}</div>
          <h1 className="user-name-title">{user.name}</h1>
          <p className="user-email-subtitle">{user.email}</p>
        </header>

        <div className="skills-comparison-grid">
          <div className="skill-box teach-box">
            <span className="box-label">Expertise</span>
            <h3>{user.name} can teach you:</h3>
            <div className="skill-pills">
              {user.teachSkills?.length === 0 && <span className="none-text">None listed</span>}
              {user.teachSkills?.map((skill, i) => (
                <span key={i} className="skill-pill-item teach-pill">
                  {skill.name || skill}   {/* ✅ handles both object and string */}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-box learn-box">
            <span className="box-label">Interests</span>
            <h3>{user.name} wants to learn:</h3>
            <div className="skill-pills">
              {user.learnSkills?.length === 0 && <span className="none-text">None listed</span>}
              {user.learnSkills?.map((skill, i) => (
                <span key={i} className="skill-pill-item learn-pill">
                  {skill.name || skill}   {/* ✅ handles both object and string */}
                </span>
              ))}
            </div>
          </div>
        </div>

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
             onClick={() => {
  console.log("Sending to:", user._id);
  dispatch(sendRequest({ receiverId: user._id }));
}}  // ✅ send _id not email
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