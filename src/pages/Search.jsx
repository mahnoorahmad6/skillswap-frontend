import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const users = useSelector((state) => state.user.users) || [];
  const currentUser = useSelector((state) => state.user.currentUser); // <-- missing
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  if (!currentUser) return <p>Please log in to search for skill swaps.</p>;

  const filteredUsers = users.filter((user) => {
    // Don't show yourself
    if (user.email === currentUser.email) return false;

    // Mutual skill match
    const mutual =
      currentUser.learnSkills.some((skill) =>
        user.teachSkills.includes(skill)
      ) &&
      currentUser.teachSkills.some((skill) =>
        user.learnSkills.includes(skill)
      );

    // Optional search query filter
    const search = query.toLowerCase();
    const matchesQuery =
      user.teachSkills.concat(user.learnSkills).some((skill) =>
        skill.toLowerCase().includes(search)
      );

    return mutual && matchesQuery;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Skills</h1>

      <input
        type="text"
        placeholder="Search e.g. React"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {filteredUsers.length === 0 && <p>No matching users found.</p>}

      {filteredUsers.map((user) => (
        <div
          key={user.email}
          onClick={() => navigate(`/user/${user.email}`)}
          className="border p-3 mb-3 rounded cursor-pointer hover:bg-gray-100"
        >
          <h2 className="font-bold">{user.name}</h2>
          <p>
            <strong>Teaches:</strong> {(user.teachSkills || []).join(", ") || "None"}
          </p>
          <p>
            <strong>Wants to Learn:</strong> {(user.learnSkills || []).join(", ") || "None"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Search;