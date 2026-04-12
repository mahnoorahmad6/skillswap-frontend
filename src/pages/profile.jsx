import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeachSkill,
  addLearnSkill,
  removeTeachSkill,
  removeLearnSkill,
  rejectRequest,
  acceptRequest
} from "../features/user/userSlice";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");

  if (!currentUser) {
    return (
      <div className="dashboard-container">
        <div className="auth-alert text-center">Please log in to see your profile</div>
      </div>
    );
  }

  const { teachSkills, learnSkills, requestsReceived, connections } = currentUser;

  const handleAddTeach = () => {
    if (teachInput.trim()) {
      dispatch(addTeachSkill(teachInput));
      setTeachInput("");
    }
  };

  const handleAddLearn = () => {
    if (learnInput.trim()) {
      dispatch(addLearnSkill(learnInput));
      setLearnInput("");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="profile-header">
        <h1 className="dashboard-title">Manage Profile</h1>
        <p className="user-welcome">Keep your skills up to date to find better matches.</p>
      </header>

      <div className="dashboard-grid">
        {/* --- Skills Management --- */}
        <div className="skills-management">
          {/* Teach Skills Card */}
          <div className="card card-secondary profile-manage-card">
            <h2 className="section-label">Skills You Can Teach</h2>
            <div className="skill-input-group">
              <input
                type="text"
                value={teachInput}
                onChange={(e) => setTeachInput(e.target.value)}
                placeholder="e.g. React, Photoshop"
              />
              <button onClick={handleAddTeach} className="add-btn teach-add">Add</button>
            </div>
            <div className="skill-tags-cloud">
              {teachSkills.map((skill, index) => (
                <div key={index} className="tag teach-tag-removable">
                  {skill}
                  <button onClick={() => dispatch(removeTeachSkill(skill))}>✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Learn Skills Card */}
          <div className="card card-secondary profile-manage-card">
            <h2 className="section-label">Skills You Want to Learn</h2>
            <div className="skill-input-group">
              <input
                type="text"
                value={learnInput}
                onChange={(e) => setLearnInput(e.target.value)}
                placeholder="e.g. Python, UI Design"
              />
              <button onClick={handleAddLearn} className="add-btn learn-add">Add</button>
            </div>
            <div className="skill-tags-cloud">
              {learnSkills.map((skill, index) => (
                <div key={index} className="tag learn-tag-removable">
                  {skill}
                  <button onClick={() => dispatch(removeLearnSkill(skill))}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Requests & Connections Sidebar --- */}
        <div className="social-sidebar">
          {/* Incoming Requests */}
          <div className="card card-secondary sidebar-card">
            <h3 className="section-label">Pending Requests</h3>
            {requestsReceived.length === 0 ? (
              <p className="empty-text">No new requests</p>
            ) : (
              requestsReceived.map((req) => (
                <div key={req.email} className="request-item">
                  <span className="req-name">{req.name}</span>
                  <div className="req-actions">
                    <button className="accept-btn" onClick={() => dispatch(acceptRequest(req.email))}>Accept</button>
                    <button className="reject-btn" onClick={() => dispatch(rejectRequest(req.email))}>Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Active Connections */}
          <div className="card card-secondary sidebar-card">
            <h3 className="section-label">Your Connections</h3>
            <ul className="connections-list">
              {connections.length === 0 ? (
                <p className="empty-text">No connections yet</p>
              ) : (
                connections.map((conn) => (
                  <li key={conn.name} className="conn-item">
                    <div className="conn-avatar">{conn.name.charAt(0)}</div>
                    {conn.name}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;