import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Search.css";

function Search() {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // 🔥 Fetch matches from backend
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/user/matches?search=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    if (currentUser) {
      fetchMatches();
    }
  }, [query, currentUser]);

  // 🔒 Not logged in
  if (!currentUser) {
    return (
      <div className="dashboard-container text-center">
        <p className="auth-alert">
          Please log in to search for skill swaps.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="search-header">
        <h1 className="dashboard-title">Find Your Match</h1>
        <p className="user-welcome">
          We've found people who want what you have and have what you want.
        </p>
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
        {users.length === 0 ? (
          <div className="empty-state">
            <p>No matching users found.</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => navigate(`/user/${user._id}`)}
              className="user-result-card"
            >
              <div className="user-info">
                <div className="user-avatar">
                  {user.name.charAt(0)}
                </div>

                <div className="user-details">
                  <h2 className="user-name-text">{user.name}</h2>

                  <div className="skill-badges">
                    <div className="badge teach">
                      <strong>Teaches:</strong>{" "}
                      {user.teachSkills?.map(s => s.name).join(", ")}
                    </div>

                    <div className="badge learn">
                      <strong>Needs:</strong>{" "}
                      {user.learnSkills?.map(s => s.name).join(", ")}
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