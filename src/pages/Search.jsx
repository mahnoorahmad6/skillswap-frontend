import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css"; // The new CSS file

function Search() {
  const users = useSelector((state) => state.user.users) || [];
  const currentUser = useSelector((state) => state.user?.currentUser); 
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="dashboard-container text-center">
        <p className="auth-alert">Please log in to search for skill swaps.</p>
      </div>
    );
  }

  const filteredUsers = users.filter((user) => {
    if (user.email === currentUser.email) return false;

    const mutual =
      currentUser.learnSkills?.some((skill) =>
        user.teachSkills?.includes(skill)
      ) &&
      currentUser.teachSkills?.some((skill) =>
        user.learnSkills?.includes(skill)
      );

    const search = query.toLowerCase();
    const matchesQuery =
      user.teachSkills?.concat(user.learnSkills || []).some((skill) =>
        skill.toLowerCase().includes(search)
      );

    return mutual && matchesQuery;
  });

  return (
    <div className="dashboard-container">
      <header className="search-header">
        <h1 className="dashboard-title">Find Your Match</h1>
        <p className="user-welcome">We've found people who want what you have and have what you want.</p>
      </header>

      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search skills (e.g. React, Python...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="results-container">
        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <p>No matching users found for your current skills.</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.email}
              onClick={() => navigate(`/user/${user.email}`)}
              className="user-result-card"
            >
              <div className="user-info">
                <div className="user-avatar">{user.name.charAt(0)}</div>
                <div className="user-details">
                  <h2 className="user-name-text">{user.name}</h2>
                  <div className="skill-badges">
                    <div className="badge teach">
                      <strong>Teaches:</strong> {user.teachSkills.join(", ")}
                    </div>
                    <div className="badge learn">
                      <strong>Needs:</strong> {user.learnSkills.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="arrow-indicator">→</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;